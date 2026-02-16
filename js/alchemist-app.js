const engine = new ChemistryEngine();

// Enhance engine with molecular features (stereochemistry, isotopes, expanded octets, ring detection)
if (typeof enhanceEngineWithMolecularFeatures === 'function') {
    enhanceEngineWithMolecularFeatures(engine);
}

const canvas = document.getElementById('canvas');
const atomsLayer = document.getElementById('atoms-layer');
const bondsLayer = document.getElementById('bonds-layer');
const vsepLayer = document.getElementById('vsepr-layer');
const ptOverlay = document.getElementById('pt-overlay');
const ptGrid = document.getElementById('pt-grid');
const ptSidebar = document.getElementById('pt-sidebar');

let draggingAtom = null;
let dragOffset = { x: 0, y: 0 };
let selectedAtomId = null;

// VSEPR Animation State
let _vsepAnimId = null;
let _vsepAnimFrames = 0;
let _prevBondCount = 0;
let _vsepDebounceTimer = null;

// Performance optimization: throttle updateScene calls
let _updateThrottleTimer = null;
let _pendingUpdate = false;
let _lastUpdateTime = 0;
const UPDATE_THROTTLE_MS = 16; // ~60fps max

// Cache for expensive calculations
const _massCache = new Map();

// Pan and Zoom State
let viewState = {
    x: 0,
    y: 0,
    zoom: 1,
    isPanning: false,
    lastMouse: { x: 0, y: 0 }
};

async function initApp() {
    const elements = await engine.init();
    if (elements && elements.length > 0) {
        renderPeriodicTable(elements);
    } else {
        // Fallback to local data if API fails
        engine.elements = ELEMENTS_DATA.map(el => ({
            ...el,
            number: el.atomicNumber,
            shells: el.electronConfiguration ? [el.valenceElectrons] : [0] // Rough fallback
        }));
        renderPeriodicTable(engine.elements);
    }

    document.getElementById('btn-infuse').onclick = () => ptOverlay.classList.remove('hidden');
    document.getElementById('btn-close-pt').onclick = () => ptOverlay.classList.add('hidden');
    document.getElementById('btn-reset').onclick = resetVacuum;

    // Pan & Zoom Events
    canvas.addEventListener('wheel', handleWheel, { passive: false });
    canvas.addEventListener('mousedown', (e) => {
        if (e.target === canvas) {
            viewState.isPanning = true;
            viewState.lastMouse = { x: e.clientX, y: e.clientY };
        }
    });
    window.addEventListener('mouseup', () => {
        viewState.isPanning = false;
        draggingAtom = null;
    });

    // Thermodynamic Controls
    const tempSlider = document.getElementById('slider-temp');
    const pressSlider = document.getElementById('slider-press');
    const tempVal = document.getElementById('val-temp');
    const pressVal = document.getElementById('val-press');

    tempSlider.oninput = () => {
        engine.temperature = parseFloat(tempSlider.value);
        tempVal.textContent = `${engine.temperature} K`;
        updateScene();
    };
    pressSlider.oninput = () => {
        engine.pressure = parseFloat(pressSlider.value);
        pressVal.textContent = `${engine.pressure.toFixed(1)} atm`;
        updateScene();
    };

    canvas.addEventListener('pointermove', handleMove);
    canvas.addEventListener('pointerup', () => draggingAtom = null);
    canvas.addEventListener('click', (e) => {
        if (e.target === canvas) {
            selectedAtomId = null;
            updateInspector();
        }
    });
}

function updateScene(fullRender = false) {
    // Throttle updates during dragging for performance
    const now = performance.now();
    if (!fullRender && now - _lastUpdateTime < UPDATE_THROTTLE_MS) {
        if (!_pendingUpdate) {
            _pendingUpdate = true;
            _updateThrottleTimer = setTimeout(() => {
                _pendingUpdate = false;
                updateScene(fullRender);
            }, UPDATE_THROTTLE_MS);
        }
        return;
    }
    _lastUpdateTime = now;
    _pendingUpdate = false;
    
    engine.resolve();

    // VSEPR Physics — move atoms toward correct molecular geometry
    if (window.vsepPhysics) {
        window.vsepPhysics.simulate(engine, draggingAtom ? draggingAtom.id : null);
    }

    // Apply View Transform
    const transform = `translate(${viewState.x}, ${viewState.y}) scale(${viewState.zoom})`;
    atomsLayer.setAttribute('transform', transform);
    bondsLayer.setAttribute('transform', transform);
    if (vsepLayer) vsepLayer.setAttribute('transform', transform);

    // Update Grid Background to match Pan and Zoom (parallax effect)
    const mainCanvas = document.getElementById('simulator-page');
    if (mainCanvas) {
        mainCanvas.style.backgroundSize = `${40 * viewState.zoom}px ${40 * viewState.zoom}px`;
        mainCanvas.style.backgroundPosition = `${viewState.x}px ${viewState.y}px`;
    }

    if (fullRender) {
        renderAtoms();
    } else {
        const atomGroups = atomsLayer.querySelectorAll(':scope > g');
        engine.atoms.forEach((atom, index) => {
            const g = atomGroups[index];
            if (!g) return;
            g.setAttribute('transform', `translate(${atom.x}, ${atom.y})`);

            let glow = g.querySelector('.selection-glow-circle');
            if (selectedAtomId === atom.id) {
                if (!glow) {
                    glow = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                    const radius = getAtomRadius(atom);
                    glow.setAttribute('r', radius + 15);
                    glow.setAttribute('fill', 'url(#selection-glow)');
                    glow.setAttribute('class', 'animate-pulse selection-glow-circle');
                    g.insertBefore(glow, g.firstChild);
                }
            } else if (glow) {
                glow.remove();
            }
            
            // Update partial charge display (δ⁺/δ⁻) — top-right
            const radius = getAtomRadius(atom);
            let pcText = g.querySelector('.partial-charge');

            if (atom.partialCharge && Math.abs(atom.partialCharge) > 0.01) {
                const pcStr = atom.partialCharge > 0 ? '\u03B4+' : '\u03B4\u2212';

                if (!pcText) {
                    pcText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                    pcText.setAttribute('x', radius + 4);
                    pcText.setAttribute('y', -radius - 4);
                    pcText.setAttribute('text-anchor', 'start');
                    pcText.setAttribute('font-size', '11');
                    pcText.setAttribute('font-weight', 'bold');
                    pcText.setAttribute('class', 'select-none pointer-events-none partial-charge');
                    g.appendChild(pcText);
                }

                pcText.setAttribute('fill', atom.partialCharge > 0 ? '#f87171' : '#60a5fa');
                pcText.textContent = pcStr;
            } else if (pcText) {
                pcText.remove();
            }

            // Update oxidation state display — top-left
            let oxText = g.querySelector('.oxidation-state');

            if (atom.oxidationState !== undefined && atom.oxidationState !== 0) {
                const sign = atom.oxidationState > 0 ? '+' : '';
                const oxStr = `${sign}${atom.oxidationState}`;

                if (!oxText) {
                    oxText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                    oxText.setAttribute('x', -(radius + 4));
                    oxText.setAttribute('y', -radius - 4);
                    oxText.setAttribute('text-anchor', 'end');
                    oxText.setAttribute('font-size', '11');
                    oxText.setAttribute('font-weight', 'bold');
                    oxText.setAttribute('class', 'select-none pointer-events-none oxidation-state');
                    g.appendChild(oxText);
                }

                oxText.setAttribute('fill', '#34d399');
                oxText.textContent = oxStr;
            } else if (oxText) {
                oxText.remove();
            }
        });
    }

    renderBonds();
    renderVSEPROverlay();
    updateInspector();

    // Auto-trigger VSEPR convergence when bonds change (debounced)
    if (engine.bonds.length !== _prevBondCount && engine.bonds.length > 0) {
        _prevBondCount = engine.bonds.length;
        // Debounce to prevent rapid re-triggering
        if (_vsepDebounceTimer) clearTimeout(_vsepDebounceTimer);
        _vsepDebounceTimer = setTimeout(() => {
            startVSEPRAnimation();
        }, 100);
    }

    const atomStat = document.getElementById('stat-atoms');
    const bondStat = document.getElementById('stat-bonds');
    const zoomStat = document.getElementById('stat-zoom');
    if (atomStat) atomStat.textContent = engine.atoms.length;
    if (bondStat) bondStat.textContent = engine.bonds.length;
    if (zoomStat) zoomStat.textContent = `${Math.round(viewState.zoom * 100)}%`;

    // Update bottom-left formula display
    const formulaEl = document.getElementById('molecule-formula');
    const nameEl = document.getElementById('molecule-name');
    if (formulaEl && nameEl) {
        if (engine.molecules.length > 0) {
            const mainMol = engine.molecules.reduce((a, b) => a.atomIds.length > b.atomIds.length ? a : b);
            if (mainMol && mainMol.atomIds.length > 1) {
                formulaEl.textContent = mainMol.formula;
                // Check PubChem cache for fresh name
                const molCached = engine.pubChemCache?.[mainMol.formula] || engine.pubChemCache?.[mainMol.hillFormula];
                const freshName = (molCached && molCached !== 'fetching' && typeof molCached === 'object' && molCached.name) ? molCached.name : mainMol.commonName;
                nameEl.textContent = freshName || 'Unknown Species';
            } else {
                formulaEl.textContent = '\u2014';
                nameEl.textContent = 'No molecule selected';
            }
        } else {
            formulaEl.textContent = '\u2014';
            nameEl.textContent = 'No molecule selected';
        }
    }
}

window.resetCamera = () => {
    viewState.x = 0;
    viewState.y = 0;
    viewState.zoom = 1;
    updateScene();
};

/// Snap atoms to exact VSEPR geometry positions
window.optimizeGeometry = () => {
    if (!window.vsepPhysics || engine.bonds.length === 0) return;
    engine.resolve();
    window.vsepPhysics.snapToGeometry(engine);
    updateScene(true);
};

// ================================================================
// VSEPR ANIMATION — auto-converge atoms to correct geometry
// ================================================================
function startVSEPRAnimation() {
    if (_vsepAnimId) cancelAnimationFrame(_vsepAnimId);
    _vsepAnimFrames = 0;
    const TOTAL_FRAMES = 40;

    function animStep() {
        if (_vsepAnimFrames >= TOTAL_FRAMES || !window.vsepPhysics) {
            _vsepAnimId = null;
            return;
        }
        _vsepAnimFrames++;

        // Accelerating lerp: starts gentle, ends strong
        const t = _vsepAnimFrames / TOTAL_FRAMES;
        const lerp = 0.05 + t * 0.25; // 0.05 → 0.30

        engine.molecules.forEach(mol => {
            if (!mol.atomIds || mol.atomIds.length < 3) return;
            const atoms = mol.atomIds.map(id => engine.atoms.find(a => a.id === id)).filter(Boolean);
            if (atoms.length < 3) return;
            const processed = new Set();
            atoms.forEach(atom => {
                if (processed.has(atom.id)) return;
                const bondCount = engine.bonds.filter(b => b.a1.id === atom.id || b.a2.id === atom.id).length;
                if (bondCount >= 2) {
                    processed.add(atom.id);
                    window.vsepPhysics._positionNeighbours(atom, engine, draggingAtom ? draggingAtom.id : null, lerp);
                }
            });
        });

        // Update visual positions without full re-render
        const atomGroups = atomsLayer.querySelectorAll(':scope > g');
        engine.atoms.forEach((atom, index) => {
            const g = atomGroups[index];
            if (g) g.setAttribute('transform', `translate(${atom.x}, ${atom.y})`);
        });
        renderBonds();
        renderVSEPROverlay();

        _vsepAnimId = requestAnimationFrame(animStep);
    }

    _vsepAnimId = requestAnimationFrame(animStep);
}

// ================================================================
// VSEPR CANVAS OVERLAY — lone pairs + angle arcs on the workspace
// ================================================================
function renderVSEPROverlay() {
    if (!vsepLayer) return;
    vsepLayer.innerHTML = '';

    if (!window.vseprcalculator || !engine.molecules || engine.bonds.length === 0) return;

    engine.molecules.forEach(mol => {
        if (!mol.atomIds || mol.atomIds.length < 2) return;

        const vseprData = window.vseprcalculator.calculateGeometry(mol, engine);
        if (!vseprData || !vseprData.bondAngle) return;

        // Find the central atom on the canvas
        const centralAtom = engine.atoms.find(a =>
            a.element.symbol === vseprData.centralAtom &&
            mol.atomIds.includes(a.id)
        );
        if (!centralAtom) return;

        // Collect bonded neighbours
        const neighbours = [];
        engine.bonds.forEach(b => {
            if (b.a1.id === centralAtom.id && mol.atomIds.includes(b.a2.id)) neighbours.push(b.a2);
            else if (b.a2.id === centralAtom.id && mol.atomIds.includes(b.a1.id)) neighbours.push(b.a1);
        });

        const lonePairs = centralAtom.lonePairs || 0;
        if (neighbours.length < 2) return;

        const cx = centralAtom.x;
        const cy = centralAtom.y;

        // --- Render Lone Pair Clouds ---
        if (lonePairs > 0) {
            const key = `${neighbours.length}-${lonePairs}`;
            const directions = window.vsepPhysics?.idealDirections?.[key];
            if (directions) {
                // Get the rotation that the physics engine would use
                const bondDirs = directions.slice(0, neighbours.length);
                const rotation = window.vsepPhysics._findBestRotation(centralAtom, neighbours, bondDirs);
                const cosR = Math.cos(rotation);
                const sinR = Math.sin(rotation);

                // Lone pair directions start after the bonding directions
                for (let i = neighbours.length; i < directions.length; i++) {
                    const d = directions[i];
                    const rx = d.x * cosR - d.y * sinR;
                    const ry = d.x * sinR + d.y * cosR;
                    const dist = 42; // shorter than bond distance for lone pair clouds
                    const lx = cx + rx * dist;
                    const ly = cy + ry * dist;
                    const ang = Math.atan2(ry, rx) * 180 / Math.PI;

                    // Electron cloud lobe
                    const lobe = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
                    lobe.setAttribute('cx', lx);
                    lobe.setAttribute('cy', ly);
                    lobe.setAttribute('rx', '12');
                    lobe.setAttribute('ry', '22');
                    lobe.setAttribute('fill', 'url(#lp-cloud)');
                    lobe.setAttribute('transform', `rotate(${ang + 90},${lx},${ly})`);
                    lobe.setAttribute('filter', 'url(#lp-blur)');
                    lobe.setAttribute('class', 'pointer-events-none');
                    vsepLayer.appendChild(lobe);

                    // Two electron dots
                    const perpX = -Math.sin(ang * Math.PI / 180) * 5;
                    const perpY = Math.cos(ang * Math.PI / 180) * 5;

                    const dot1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                    dot1.setAttribute('cx', lx + perpX);
                    dot1.setAttribute('cy', ly + perpY);
                    dot1.setAttribute('r', '2.5');
                    dot1.setAttribute('fill', '#fbbf24');
                    dot1.setAttribute('opacity', '0.8');
                    dot1.setAttribute('class', 'pointer-events-none');
                    vsepLayer.appendChild(dot1);

                    const dot2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                    dot2.setAttribute('cx', lx - perpX);
                    dot2.setAttribute('cy', ly - perpY);
                    dot2.setAttribute('r', '2.5');
                    dot2.setAttribute('fill', '#fbbf24');
                    dot2.setAttribute('opacity', '0.8');
                    dot2.setAttribute('class', 'pointer-events-none');
                    vsepLayer.appendChild(dot2);

                    // "LP" label
                    const lpLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                    const lblDist = dist + 18;
                    lpLabel.setAttribute('x', cx + rx * lblDist);
                    lpLabel.setAttribute('y', cy + ry * lblDist);
                    lpLabel.setAttribute('text-anchor', 'middle');
                    lpLabel.setAttribute('dominant-baseline', 'central');
                    lpLabel.setAttribute('fill', '#fbbf24');
                    lpLabel.setAttribute('font-size', '9');
                    lpLabel.setAttribute('font-weight', 'bold');
                    lpLabel.setAttribute('opacity', '0.5');
                    lpLabel.setAttribute('class', 'pointer-events-none select-none');
                    lpLabel.textContent = 'LP';
                    vsepLayer.appendChild(lpLabel);
                }
            }
        }

        // --- Render Angle Arcs between adjacent bonds ---
        if (neighbours.length >= 2 && vseprData.bondAngle) {
            // Draw arc between first two neighbours
            const a1 = Math.atan2(neighbours[0].y - cy, neighbours[0].x - cx);
            const a2 = Math.atan2(neighbours[1].y - cy, neighbours[1].x - cx);

            const arcR = 28;
            let start = a1, end = a2;
            let diff = end - start;
            while (diff < -Math.PI) diff += 2 * Math.PI;
            while (diff > Math.PI) diff -= 2 * Math.PI;
            if (diff < 0) { [start, end] = [end, start]; diff = -diff; }

            const sx = cx + Math.cos(start) * arcR;
            const sy = cy + Math.sin(start) * arcR;
            const ex = cx + Math.cos(end) * arcR;
            const ey = cy + Math.sin(end) * arcR;
            const large = diff > Math.PI ? 1 : 0;

            const arc = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            arc.setAttribute('d', `M ${sx.toFixed(1)} ${sy.toFixed(1)} A ${arcR} ${arcR} 0 ${large} 1 ${ex.toFixed(1)} ${ey.toFixed(1)}`);
            arc.setAttribute('fill', 'none');
            arc.setAttribute('stroke', '#22c55e');
            arc.setAttribute('stroke-width', '1.5');
            arc.setAttribute('opacity', '0.5');
            arc.setAttribute('stroke-dasharray', '3,2');
            arc.setAttribute('class', 'pointer-events-none');
            vsepLayer.appendChild(arc);

            // Angle label
            const mid = start + diff / 2;
            const lblR = arcR + 14;
            const lx = cx + Math.cos(mid) * lblR;
            const ly = cy + Math.sin(mid) * lblR;

            const angleLbl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            angleLbl.setAttribute('x', lx.toFixed(1));
            angleLbl.setAttribute('y', ly.toFixed(1));
            angleLbl.setAttribute('text-anchor', 'middle');
            angleLbl.setAttribute('dominant-baseline', 'central');
            angleLbl.setAttribute('fill', '#22c55e');
            angleLbl.setAttribute('font-size', '10');
            angleLbl.setAttribute('font-weight', 'bold');
            angleLbl.setAttribute('opacity', '0.7');
            angleLbl.setAttribute('class', 'pointer-events-none select-none');
            angleLbl.textContent = `${vseprData.bondAngle}\u00B0`;
            vsepLayer.appendChild(angleLbl);
        }

        // --- Geometry Label near the molecule ---
        if (vseprData.molecularGeometry && vseprData.molecularGeometry !== 'Unknown') {
            const geoLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            geoLabel.setAttribute('x', cx);
            geoLabel.setAttribute('y', cy - 55);
            geoLabel.setAttribute('text-anchor', 'middle');
            geoLabel.setAttribute('dominant-baseline', 'central');
            geoLabel.setAttribute('fill', '#818cf8');
            geoLabel.setAttribute('font-size', '11');
            geoLabel.setAttribute('font-weight', 'bold');
            geoLabel.setAttribute('opacity', '0.65');
            geoLabel.setAttribute('class', 'pointer-events-none select-none');
            geoLabel.textContent = vseprData.molecularGeometry;
            vsepLayer.appendChild(geoLabel);
        }
    });
}

// Expose function to deselect atom (used by closeInspector in HTML)
window.deselectAtom = function() {
    selectedAtomId = null;
    updateScene(true);
};

function updateInspector() {
    window.updateInspector = updateInspector;
    const inspector = document.getElementById('inspector');
    const selectedAtom = engine.atoms.find(a => a.id === selectedAtomId);
    const molecule = selectedAtom ? engine.molecules.find(m => m.atomIds.includes(selectedAtom.id)) : null;

    let html = '';

    if (molecule && molecule.atomIds.length > 1) {
        // Check PubChem cache directly for fresh data (async fetches may have completed since molecule was created)
        const cachedData = engine.pubChemCache?.[molecule.formula] || engine.pubChemCache?.[molecule.hillFormula];
        const isFetching = cachedData === 'fetching';
        let displayName = molecule.commonName;
        let displayDescription = molecule.description;
        let displayAliases = molecule.alsoKnownAs || [];
        if (cachedData && cachedData !== 'fetching' && typeof cachedData === 'object') {
            if (cachedData.name) displayName = cachedData.name;
            if (cachedData.description) displayDescription = cachedData.description;
            if (cachedData.aliases && cachedData.aliases.length > 0) displayAliases = cachedData.aliases;
        }
        
        const getSpeciesTypeColor = (type) => {
            switch(type) {
                case 'radical': return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
                case 'radical-ion': return 'text-pink-400 bg-pink-500/10 border-pink-500/30';
                case 'cation': return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
                case 'anion': return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
                default: return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
            }
        };
        
        const getSpeciesLabel = (type) => {
            switch(type) {
                case 'radical': return 'Radical Species';
                case 'radical-ion': return 'Radical Ion';
                case 'cation': return 'Cation';
                case 'anion': return 'Anion';
                default: return 'Molecule';
            }
        };

        const speciesTypeClass = getSpeciesTypeColor(molecule.speciesType);
        const speciesLabel = getSpeciesLabel(molecule.speciesType);
        
        const stabilityColor = molecule.isRadical ? 'text-rose-400' : 
            (molecule.stability >= 70 ? 'text-emerald-400' : 
             molecule.stability >= 40 ? 'text-amber-400' : 'text-rose-400');
        
        const stabilityBarColor = molecule.isRadical ? 'bg-rose-500' : 
            (molecule.stability >= 70 ? 'bg-emerald-500' : 
             molecule.stability >= 40 ? 'bg-amber-500' : 'bg-rose-500');

        // Get state of matter color
        const getStateColor = (state) => {
            switch(state) {
                case 'Solid': return 'text-slate-300';
                case 'Liquid': return 'text-blue-400';
                case 'Gas': return 'text-emerald-400';
                case 'Supercritical': return 'text-fuchsia-400';
                case 'Decomposed': return 'text-rose-400';
                default: return 'text-slate-400';
            }
        };

        // Phase prediction data from engine
        const phaseData = engine._lastPhaseData || {};
        const gasLaw = phaseData.gasLaw;

        // Temperature effect indicator (now uses algorithmic decomp temp)
        const Tdecomp = phaseData.Tb_normal ? engine.estimateDecompositionTemp(
            molecule.atomIds.map(id => engine.atoms.find(a => a.id === id)).filter(Boolean)
        ) : Infinity;
        const getTempEffect = (temp) => {
            if (temp > Tdecomp * 0.9) {
                return { text: 'Near decomposition', color: 'text-rose-400' };
            } else if (molecule.stateOfMatter === 'Supercritical') {
                return { text: 'Supercritical fluid', color: 'text-fuchsia-400' };
            } else if (temp > 1000) {
                return { text: 'High temperature', color: 'text-orange-400' };
            } else if (temp < 200) {
                return { text: 'Cryogenic', color: 'text-cyan-400' };
            }
            return null;
        };

        // Pressure effect indicator (now actually functional)
        const getPressureEffect = (press) => {
            if (press > 10) {
                return { text: 'High pressure — elevates phase transitions', color: 'text-blue-400' };
            } else if (press < 0.5) {
                return { text: 'Low pressure — lowers boiling point', color: 'text-amber-400' };
            }
            return null;
        };

        const tempEffect = getTempEffect(engine.temperature);
        const pressureEffect = getPressureEffect(engine.pressure);

        html += `
            <div class="panel-section animate-in slide-in-from-left duration-300">
                <div class="panel-header">
                    <h4 class="panel-title">Chemical Species</h4>
                    <span class="text-[8px] px-2 py-1 rounded-full border ${speciesTypeClass} font-black uppercase tracking-wider">${speciesLabel}</span>
                </div>
                
                <div class="mb-4">
                    <div class="flex gap-2 mb-2 flex-wrap">
                        <span class="text-[8px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-bold uppercase">${engine.temperature}K</span>
                        <span class="text-[8px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-bold uppercase">${engine.pressure} atm</span>
                        ${molecule.stateOfMatter ? `<span class="text-[8px] px-2 py-0.5 rounded bg-slate-800 ${getStateColor(molecule.stateOfMatter)} font-bold uppercase">${molecule.stateOfMatter}</span>` : ''}
                    </div>
                    ${tempEffect ? `<div class="text-[9px] ${tempEffect.color} mb-1">${tempEffect.text}</div>` : ''}
                    ${pressureEffect ? `<div class="text-[9px] ${pressureEffect.color} mb-1">${pressureEffect.text}</div>` : ''}
                    <div class="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mb-1">Molecular Formula</div>
                    <div class="text-4xl font-mono font-black text-white mb-3 tracking-tighter flex items-baseline gap-2">
                        ${molecule.isRadical ? '<span class="text-rose-400 text-2xl">\u2022</span>' : ''}${molecule.formula}
                    </div>
                    
                    <div class="text-[10px] text-indigo-400 font-black uppercase tracking-[0.2em] mb-1">Identity</div>
                    <div class="text-2xl font-black text-white mb-2 leading-tight">
                        ${isFetching ? '<span class="animate-pulse text-slate-500 italic">Analyzing...</span>' : (displayName || 'Unknown Species')}
                    </div>

                    ${displayAliases.length > 0 ? `
                        <div class="mb-4">
                            <div class="text-[9px] text-slate-500 font-black uppercase tracking-[0.15em] mb-1">Also Known As</div>
                            <div class="flex flex-wrap gap-1">
                                ${displayAliases.map(a => `<span class="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-medium">${a}</span>`).join('')}
                            </div>
                        </div>
                    ` : ''}

                    ${displayDescription ? `
                        <div class="text-[11px] text-slate-300 leading-relaxed bg-slate-400/5 p-4 rounded-xl border border-white/10 max-h-48 overflow-y-auto custom-scrollbar font-medium whitespace-pre-line">
                            ${displayDescription}
                        </div>
                    ` : ''}
                </div>
                
                <div class="grid grid-cols-2 gap-2 mb-4">
                    <div class="bg-slate-800/40 p-2 rounded-lg border border-slate-700/50">
                        <div class="text-[8px] text-slate-500 uppercase font-black mb-1">Total e\u207B</div>
                        <div class="text-sm font-black ${molecule.totalElectrons % 2 !== 0 ? 'text-rose-400' : 'text-slate-300'}">${molecule.totalElectrons}</div>
                    </div>
                    <div class="bg-slate-800/40 p-2 rounded-lg border border-slate-700/50">
                        <div class="text-[8px] text-slate-500 uppercase font-black mb-1">Net Charge</div>
                        <div class="text-sm font-black ${molecule.netCharge !== 0 ? (molecule.netCharge > 0 ? 'text-blue-400' : 'text-amber-400') : 'text-slate-300'}">
                            ${molecule.netCharge > 0 ? '+' : ''}${molecule.netCharge}
                        </div>
                    </div>
                </div>
                
                <div>
                    <div class="flex justify-between items-center mb-2">
                        <span class="text-[9px] text-slate-500 font-black uppercase tracking-widest">Thermodynamic Stability</span>
                        <span class="text-[10px] font-bold ${stabilityColor}">${Math.round(molecule.stability)}%</span>
                    </div>
                    <div class="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                        <div class="h-full transition-all duration-500 ${stabilityBarColor}" 
                             style="width: ${molecule.stability}%"></div>
                    </div>
                    ${molecule.stability < 30 ? '<div class="text-[9px] text-rose-400 mt-1">Unstable under current conditions</div>' : ''}
                </div>

                ${phaseData.Tb_normal ? `
                <div class="mt-4 pt-3 border-t border-white/5">
                    <div class="text-[9px] text-slate-500 font-black uppercase tracking-widest mb-2">Phase Boundaries (Algorithmic)</div>
                    <div class="grid grid-cols-2 gap-2 mb-2">
                        <div class="bg-slate-800/40 p-2 rounded-lg border border-slate-700/50">
                            <div class="text-[8px] text-slate-500 uppercase font-black mb-1">Melting Pt</div>
                            <div class="text-sm font-black text-slate-300">${phaseData.Tm_normal.toFixed(2)} K</div>
                            ${Math.abs(phaseData.Tm - phaseData.Tm_normal) > 0.05 ? `<div class="text-[8px] text-slate-600">(${phaseData.Tm.toFixed(1)} K at ${engine.pressure} atm)</div>` : ''}
                        </div>
                        <div class="bg-slate-800/40 p-2 rounded-lg border border-slate-700/50">
                            <div class="text-[8px] text-slate-500 uppercase font-black mb-1">Boiling Pt</div>
                            <div class="text-sm font-black text-blue-400">${phaseData.Tb_normal.toFixed(2)} K</div>
                            ${Math.abs(phaseData.Tb - phaseData.Tb_normal) > 0.05 ? `<div class="text-[8px] text-slate-600">(${phaseData.Tb.toFixed(1)} K at ${engine.pressure} atm)</div>` : ''}
                        </div>
                    </div>
                    ${phaseData.Tm > phaseData.Tb ? '<div class="text-[9px] text-amber-400 mt-2">Triple point above current pressure — sublimation occurs (no liquid phase)</div>' : ''}
                </div>
                ` : ''}

                ${gasLaw ? `
                <div class="mt-4 pt-3 border-t border-white/5">
                    <div class="text-[9px] text-slate-500 font-black uppercase tracking-widest mb-2">Gas Laws (PV=nRT)</div>
                    <div class="grid grid-cols-3 gap-2">
                        <div class="bg-slate-800/40 p-2 rounded-lg border border-slate-700/50">
                            <div class="text-[8px] text-slate-500 uppercase font-black mb-1">Vm</div>
                            <div class="text-xs font-black text-emerald-400">${gasLaw.molarVolume} L</div>
                        </div>
                        <div class="bg-slate-800/40 p-2 rounded-lg border border-slate-700/50">
                            <div class="text-[8px] text-slate-500 uppercase font-black mb-1">Density</div>
                            <div class="text-xs font-black text-emerald-400">${gasLaw.density} g/L</div>
                        </div>
                        <div class="bg-slate-800/40 p-2 rounded-lg border border-slate-700/50">
                            <div class="text-[8px] text-slate-500 uppercase font-black mb-1">MFP</div>
                            <div class="text-xs font-black text-emerald-400">${gasLaw.meanFreePath} nm</div>
                        </div>
                    </div>
                    <div class="text-[8px] text-slate-600 mt-1">Molar volume, density, and mean free path at ${engine.temperature}K / ${engine.pressure} atm</div>
                </div>
                ` : ''}
            </div>
        `;

        // VSEPR Geometry & Polarity Section
        if (window.vseprcalculator && molecule.atomIds.length > 1) {
            const vseprData = window.vseprcalculator.calculateGeometry(molecule, engine);

            if (vseprData) {
                const polarityColor = vseprData.polarity === 'Polar' ? 'text-blue-400 bg-blue-500/10 border-blue-500/30' :
                                     vseprData.polarity === 'Nonpolar' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' :
                                     'text-slate-400 bg-slate-500/10 border-slate-500/30';

                html += `
                    <div class="panel-section animate-in slide-in-from-left duration-300">
                        <div class="panel-header">
                            <h4 class="panel-title">Molecular Geometry & Polarity</h4>
                            <span class="text-[8px] px-2 py-1 rounded-full border ${polarityColor} font-black uppercase tracking-wider">${vseprData.polarity}</span>
                        </div>

                        <div class="space-y-4">
                            <!-- VSEPR Visual Diagram -->
                            ${window.vsepVisual ? window.vsepVisual.render(vseprData, molecule, engine) : ''}

                            <!-- Central Atom -->
                            <div class="bg-slate-800/40 p-3 rounded-lg border border-slate-700/50">
                                <div class="text-[8px] text-slate-500 uppercase font-black mb-2">Central Atom</div>
                                <div class="flex items-center gap-2">
                                    <div class="w-8 h-8 rounded-md flex items-center justify-center font-black text-sm shadow border border-white/10"
                                         style="background-color: #${engine.atoms.find(a => a.element.symbol === vseprData.centralAtom)?.element.cpk_hex || '475569'}">
                                        ${vseprData.centralAtom}
                                    </div>
                                    <div class="text-sm font-bold text-white">${vseprData.centralAtomName}</div>
                                </div>
                            </div>

                            <!-- Electron Pairs -->
                            <div class="grid grid-cols-3 gap-2">
                                <div class="bg-slate-800/40 p-2 rounded-lg border border-slate-700/50">
                                    <div class="text-[8px] text-slate-500 uppercase font-black mb-1">Bonding</div>
                                    <div class="text-lg font-black text-indigo-400">${vseprData.bondingPairs}</div>
                                </div>
                                <div class="bg-slate-800/40 p-2 rounded-lg border border-slate-700/50">
                                    <div class="text-[8px] text-slate-500 uppercase font-black mb-1">Lone Pairs</div>
                                    <div class="text-lg font-black text-amber-400">${vseprData.lonePairs}</div>
                                </div>
                                <div class="bg-slate-800/40 p-2 rounded-lg border border-slate-700/50">
                                    <div class="text-[8px] text-slate-500 uppercase font-black mb-1">Total</div>
                                    <div class="text-lg font-black text-slate-300">${vseprData.totalPairs}</div>
                                </div>
                            </div>

                            <!-- Geometry Info -->
                            <div class="space-y-3">
                                <div>
                                    <div class="text-[9px] text-slate-500 font-black uppercase tracking-widest mb-1">Electron Geometry</div>
                                    <div class="text-base font-black text-indigo-400">${vseprData.electronGeometry}</div>
                                </div>
                                <div>
                                    <div class="text-[9px] text-slate-500 font-black uppercase tracking-widest mb-1">Molecular Geometry</div>
                                    <div class="text-base font-black text-blue-400">${vseprData.molecularGeometry}</div>
                                </div>
                                ${vseprData.bondAngle ? `
                                    <div>
                                        <div class="text-[9px] text-slate-500 font-black uppercase tracking-widest mb-1">Bond Angle</div>
                                        <div class="text-base font-black text-emerald-400">${vseprData.bondAngle}°</div>
                                    </div>
                                ` : ''}
                            </div>

                            <!-- Bond Electronegativity -->
                            ${vseprData.bondData && vseprData.bondData.length > 0 ? `
                                <div class="space-y-2">
                                    <div class="text-[9px] text-slate-500 font-black uppercase tracking-widest">Bond Electronegativity</div>
                                    ${vseprData.bondData.map(bond => `
                                        <div class="bg-slate-800/40 p-2 rounded-lg border border-slate-700/50">
                                            <div class="flex justify-between items-center mb-1">
                                                <span class="text-xs font-bold text-white">${bond.atom1}–${bond.atom2}</span>
                                                <span class="text-[8px] px-2 py-0.5 rounded ${parseFloat(bond.difference) > 0.5 ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-700 text-slate-400'} font-bold">
                                                    Δ${bond.difference}
                                                </span>
                                            </div>
                                            <div class="text-[9px] text-slate-500">
                                                EN: ${bond.en1} – ${bond.en2} | ${bond.bondType}
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            ` : ''}

                            <!-- Polarity Explanation -->
                            <div class="bg-gradient-to-br from-slate-800/60 to-slate-900/60 p-3 rounded-lg border border-slate-700/50">
                                <div class="text-[9px] text-slate-500 font-black uppercase tracking-widest mb-2">Polarity Analysis</div>
                                <div class="text-[11px] text-slate-300 leading-relaxed mb-2">
                                    ${vseprData.polarityExplanation}
                                </div>
                                ${vseprData.polarity === 'Polar' && vseprData.dipoleStrength > 0 ? `
                                    <div class="flex items-center gap-2">
                                        <span class="text-[9px] text-slate-500 font-black uppercase">Dipole Strength:</span>
                                        <div class="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                            <div class="h-full bg-gradient-to-r from-blue-400 to-blue-600"
                                                 style="width: ${Math.min((vseprData.dipoleStrength / 3) * 100, 100)}%"></div>
                                        </div>
                                        <span class="text-[9px] font-bold text-blue-400">${vseprData.dipoleStrength}D</span>
                                    </div>
                                ` : ''}
                            </div>

                            ${vseprData.example ? `
                                <div class="text-[9px] text-slate-600 italic text-center pt-2 border-t border-white/5">
                                    Similar molecules: ${vseprData.example}
                                </div>
                            ` : ''}
                        </div>
                    </div>
                `;
            }
        }

        // MOLECULAR FEATURES Section - Stereochemistry, Isotopes, Rings, Expanded Octets
        if (engine.stereochemistry && molecule) {
            const features = engine.analyzeMoleculeFeatures(
                molecule.atomIds.map(id => engine.atoms.find(a => a.id === id)).filter(Boolean),
                engine.bonds
            );

            html += `
                <div class="panel-section animate-in slide-in-from-left duration-300">
                    <div class="panel-header">
                        <h4 class="panel-title">Molecular Features</h4>
                        <span class="text-[8px] px-2 py-1 rounded-full border bg-purple-500/10 text-purple-400 border-purple-500/30 font-black uppercase tracking-wider">${features.structureCount.total} Possible</span>
                    </div>

                    <div class="space-y-4">
                        <!-- Stereochemistry -->
                        ${features.chiralCenters.length > 0 ? `
                        <div class="bg-slate-800/40 p-3 rounded-lg border border-slate-700/50">
                            <div class="text-[9px] text-slate-500 font-black uppercase tracking-widest mb-2 flex items-center gap-1">
                                <span class="text-indigo-400">⚛</span> Chiral Centers
                            </div>
                            <div class="grid grid-cols-2 gap-2">
                                <div>
                                    <span class="text-[8px] text-slate-600">Count:</span>
                                    <div class="text-lg font-black text-indigo-400">${features.chiralCenters.length}</div>
                                </div>
                                <div>
                                    <span class="text-[8px] text-slate-600">Stereoisomers:</span>
                                    <div class="text-lg font-black text-indigo-300">${Math.pow(2, features.chiralCenters.length)}</div>
                                </div>
                            </div>
                        </div>
                        ` : ''}

                        <!-- E/Z Isomerism -->
                        ${features.ezIsomers.length > 0 ? `
                        <div class="bg-slate-800/40 p-3 rounded-lg border border-slate-700/50">
                            <div class="text-[9px] text-slate-500 font-black uppercase tracking-widest mb-2 flex items-center gap-1">
                                <span class="text-cyan-400">=</span> E/Z Double Bonds
                            </div>
                            <div class="text-lg font-black text-cyan-400">${features.ezIsomers.length}</div>
                            <div class="text-[8px] text-slate-600 mt-1">${features.ezIsomers.length} double bond(s) with geometric isomerism</div>
                        </div>
                        ` : ''}

                        <!-- Ring Systems -->
                        ${features.rings.length > 0 ? `
                        <div class="bg-slate-800/40 p-3 rounded-lg border border-slate-700/50">
                            <div class="text-[9px] text-slate-500 font-black uppercase tracking-widest mb-2 flex items-center gap-1">
                                <span class="text-emerald-400">⭕</span> Ring Systems
                            </div>
                            <div class="grid grid-cols-2 gap-2">
                                <div>
                                    <span class="text-[8px] text-slate-600">Total Rings:</span>
                                    <div class="text-lg font-black text-emerald-400">${features.rings.length}</div>
                                </div>
                                <div>
                                    <span class="text-[8px] text-slate-600">Fused:</span>
                                    <div class="text-lg font-black text-emerald-300">${features.fusedRings.length}</div>
                                </div>
                            </div>
                            <div class="text-[8px] text-slate-600 mt-2">
                                ${features.rings.map(r => `<div>Ring: ${r.length}-membered</div>`).join('')}
                            </div>
                        </div>
                        ` : ''}

                        <!-- Hypervalent Structures -->
                        ${features.hypervalentStructures.length > 0 ? `
                        <div class="bg-slate-800/40 p-3 rounded-lg border border-slate-700/50">
                            <div class="text-[9px] text-slate-500 font-black uppercase tracking-widest mb-2 flex items-center gap-1">
                                <span class="text-amber-400">★</span> Expanded Octets
                            </div>
                            <div class="text-[8px] text-amber-300">
                                ${features.hypervalentStructures.map(h => `
                                    <div>${h.atom.element.symbol}: ${h.bondCount} bonds (${h.geometry})</div>
                                `).join('')}
                            </div>
                        </div>
                        ` : ''}

                        <!-- Molecular Mass -->
                        <div class="bg-slate-800/40 p-3 rounded-lg border border-slate-700/50">
                            <div class="text-[9px] text-slate-500 font-black uppercase tracking-widest mb-2">Molecular Mass</div>
                            <div class="text-2xl font-black text-blue-400">${features.molecularMass.toFixed(4)} amu</div>
                            <div class="text-[8px] text-slate-600 mt-1">Based on standard atomic weights</div>
                        </div>

                        <!-- Structure Breakdown -->
                        <div class="bg-slate-800/40 p-3 rounded-lg border border-slate-700/50">
                            <div class="text-[9px] text-slate-500 font-black uppercase tracking-widest mb-2">Structure Count Breakdown</div>
                            <div class="space-y-1 text-[8px] text-slate-300 font-mono">
                                <div>× Stereoisomers: <span class="text-indigo-400 font-bold">${features.structureCount.breakdown.stereoisomers}</span></div>
                                <div>× Isotope variants: <span class="text-blue-400 font-bold">${features.structureCount.breakdown.isotopeVariants}</span></div>
                                <div>× Expanded octet: <span class="text-amber-400 font-bold">${features.structureCount.breakdown.expandedOctetVariants}</span></div>
                                <div>× Ring variants: <span class="text-emerald-400 font-bold">${features.structureCount.breakdown.ringVariants}</span></div>
                                <div class="border-t border-slate-700 mt-1 pt-1">= Total: <span class="text-purple-400 font-bold text-lg">${features.structureCount.breakdown.baseTopology * features.structureCount.breakdown.stereoisomers * features.structureCount.breakdown.isotopeVariants * features.structureCount.breakdown.expandedOctetVariants * features.structureCount.breakdown.ringVariants}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    if (selectedAtom) {
        html += `
            <div class="panel-section animate-in slide-in-from-left duration-300">
                <div class="panel-header">
                    <h4 class="panel-title">Atom Inspector</h4>
                </div>
                
                <div class="flex items-center gap-4 mb-6">
                    <div class="w-10 h-10 rounded-lg flex items-center justify-center font-black text-lg shadow-lg border border-white/10" 
                         style="background-color: #${selectedAtom.element.cpk_hex || '475569'}">
                        ${selectedAtom.element.symbol}
                    </div>
                    <div>
                        <div class="font-black text-sm text-white">${selectedAtom.element.name}</div>
                        <div class="text-[9px] text-emerald-500 font-black uppercase tracking-widest">
                            ${selectedAtom.oxidationState !== undefined && selectedAtom.oxidationState !== 0 ? `Oxidation: ${selectedAtom.oxidationState > 0 ? '+' : ''}${selectedAtom.oxidationState}` : 'Neutral State'}
                        </div>
                    </div>
                </div>

                <div class="space-y-4">
                    <div class="grid grid-cols-3 gap-2 mb-4">
                        <div class="text-center">
                            <label class="block text-[8px] text-slate-500 uppercase font-black tracking-widest mb-1 truncate" title="Partial Charge">Partial</label>
                            <div class="bg-slate-800/60 p-3 rounded-lg border border-slate-700 font-mono text-lg font-black ${(selectedAtom.partialCharge || 0) > 0.01 ? 'text-rose-400' : ((selectedAtom.partialCharge || 0) < -0.01 ? 'text-blue-400' : 'text-slate-400')}">
                                ${Math.abs(selectedAtom.partialCharge || 0) > 0.01 ? ((selectedAtom.partialCharge > 0 ? '\u03B4+' : '\u03B4\u2212') + Math.abs(selectedAtom.partialCharge).toFixed(2)) : '0'}
                            </div>
                        </div>
                        <div class="text-center">
                            <label class="block text-[8px] text-slate-500 uppercase font-black tracking-widest mb-1 truncate">Formal</label>
                            <div class="bg-slate-800/60 p-3 rounded-lg border border-slate-700 font-mono text-lg font-black ${selectedAtom.formalCharge > 0 ? 'text-rose-400' : (selectedAtom.formalCharge < 0 ? 'text-blue-400' : 'text-slate-400')}">
                                ${selectedAtom.formalCharge > 0 ? '+' : ''}${selectedAtom.formalCharge || 0}
                            </div>
                        </div>
                        <div class="text-center">
                            <label class="block text-[8px] text-slate-500 uppercase font-black tracking-widest mb-1 truncate">Oxidation</label>
                            <div class="bg-slate-800/60 p-3 rounded-lg border border-slate-700 font-mono text-lg font-black text-emerald-400">
                                ${selectedAtom.oxidationState > 0 ? '+' : ''}${selectedAtom.oxidationState || 0}
                            </div>
                        </div>
                    </div>
                    <p class="text-[8px] text-slate-600 italic leading-tight mb-4">Partial charge from electronegativity. Formal charge from ionic bonds. Oxidation from electron assignment.</p>

                    <div class="grid grid-cols-2 gap-2 pt-2 border-t border-white/5">
                        <div class="bg-slate-800/40 p-2 rounded-lg border border-slate-700/50">
                            <div class="text-[8px] text-slate-500 uppercase font-black mb-1">Lone Pairs</div>
                            <div class="text-sm font-black text-indigo-400">${selectedAtom.lonePairs || 0}</div>
                        </div>
                        <div class="bg-slate-800/40 p-2 rounded-lg border border-slate-700/50">
                            <div class="text-[8px] text-slate-500 uppercase font-black mb-1">EN (Pauling)</div>
                            <div class="text-sm font-black text-amber-400">${selectedAtom.element.electronegativity_pauling || 'N/A'}</div>
                        </div>
                    </div>
                    
                    <div class="pt-2 border-t border-white/5">
                        <div class="flex justify-between items-center">
                            <label class="text-[9px] text-slate-500 uppercase font-black tracking-widest">Hybridization</label>
                            <span class="text-xs font-black text-blue-400">${selectedAtom.hybridization || 's'}</span>
                        </div>
                        ${selectedAtom.isAromatic ? `
                            <div class="mt-1 flex items-center gap-1">
                                <div class="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                                <span class="text-[9px] font-black text-indigo-400 uppercase">Aromatic Resonance</span>
                            </div>
                        ` : ''}
                    </div>
                </div>

                <button onclick="window.removeAtom('${selectedAtom.id}')" class="w-full mt-6 py-3 bg-rose-500/5 hover:bg-rose-500/10 text-rose-500 border border-rose-500/20 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all">
                    Dissociate Atom
                </button>
            </div>
        `;
    } else if (!molecule || molecule.atomIds.length <= 1) {
        html += `
            <div class="flex-1 flex items-center justify-center text-slate-600 text-[10px] italic py-20 text-center">
                Select an atom or molecule to<br>inspect properties
            </div>
        `;
    }

    if (!inspector) return; // Guard against missing inspector element
    inspector.innerHTML = html;

    // Show/hide inspector panel based on selection (slide from right)
    const inspectorPanel = document.getElementById('inspector-panel');
    const controlsPanel = document.getElementById('controls-panel');
    if (inspectorPanel) {
        if (selectedAtom || (molecule && molecule.atomIds.length > 1)) {
            inspectorPanel.classList.remove('translate-x-full');
            // Hide temperature/pressure controls when inspector is open
            if (controlsPanel) {
                controlsPanel.classList.add('opacity-0', 'pointer-events-none');
            }
        } else {
            inspectorPanel.classList.add('translate-x-full');
            // Show temperature/pressure controls when inspector is closed
            if (controlsPanel) {
                controlsPanel.classList.remove('opacity-0', 'pointer-events-none');
            }
        }
    }
}

window.removeAtom = (id) => {
    engine.atoms = engine.atoms.filter(a => a.id !== id);
    if (selectedAtomId === id) selectedAtomId = null;
    updateScene(true);
};

// Store all elements for search
let allPeriodicElements = [];

function renderPeriodicTable(elements) {
    allPeriodicElements = elements;
    ptGrid.innerHTML = '';
    
    elements.forEach(el => {
        const btn = createElementButton(el);
        ptGrid.appendChild(btn);
    });
}

function createElementButton(el) {
    const btn = document.createElement('button');
    btn.className = 'periodic-item relative aspect-square border-2 bg-slate-900 flex flex-col items-center justify-center p-1 rounded-sm transition-all hover:scale-110 hover:z-10';
    btn.style.gridColumn = el.xpos;
    btn.style.gridRow = el.ypos;
    btn.style.borderColor = getCategoryColor(el.category);
    btn.dataset.symbol = el.symbol.toLowerCase();
    btn.dataset.name = el.name.toLowerCase();
    btn.dataset.number = el.number;
    btn.innerHTML = `<span class="text-[8px] text-slate-500 absolute top-0.5 left-0.5">${el.number}</span>
                     <span class="text-xs font-bold text-white">${el.symbol}</span>`;
    
    btn.onclick = () => {
        addAtom(el);
        ptOverlay.classList.add('hidden');
    };
    btn.onmouseenter = () => showElementInfo(el);
    return btn;
}

// Search functionality
const ptSearch = document.getElementById('pt-search');
if (ptSearch) {
    ptSearch.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        
        if (!query) {
            // Show all elements
            renderPeriodicTable(allPeriodicElements);
            return;
        }
        
        // Filter elements
        const filtered = allPeriodicElements.filter(el => {
            return el.name.toLowerCase().includes(query) ||
                   el.symbol.toLowerCase().includes(query) ||
                   el.number.toString().includes(query);
        });
        
        // Re-render with filtered elements (showing them in a compact grid)
        ptGrid.innerHTML = '';
        
        if (filtered.length === 0) {
            ptGrid.innerHTML = '<div class="col-span-18 text-center text-slate-500 py-8">No elements found</div>';
            return;
        }
        
        // Show filtered elements in a simple grid (not periodic table positions)
        filtered.forEach((el, index) => {
            const btn = document.createElement('button');
            btn.className = 'periodic-item relative aspect-square border-2 bg-slate-900 flex flex-col items-center justify-center p-1 rounded-sm transition-all hover:scale-110 hover:z-10';
            btn.style.gridColumn = (index % 6) + 1;
            btn.style.gridRow = Math.floor(index / 6) + 1;
            btn.style.borderColor = getCategoryColor(el.category);
            btn.innerHTML = `<span class="text-[8px] text-slate-500 absolute top-0.5 left-0.5">${el.number}</span>
                             <span class="text-xs font-bold text-white">${el.symbol}</span>`;
            
            btn.onclick = () => {
                addAtom(el);
                ptOverlay.classList.add('hidden');
                ptSearch.value = ''; // Clear search
                renderPeriodicTable(allPeriodicElements); // Reset to full table
            };
            btn.onmouseenter = () => showElementInfo(el);
            ptGrid.appendChild(btn);
        });
    });
}

function getCategoryColor(cat) {
    const colors = {
        'diatomic nonmetal': '#3b82f6',
        'noble gas': '#a855f7',
        'alkali metal': '#ef4444',
        'alkaline earth metal': '#f97316',
        'metalloid': '#10b981',
        'polyatomic nonmetal': '#2563eb',
        'post-transition metal': '#06b6d4',
        'transition metal': '#facc15',
        'lanthanide': '#ec4899',
        'actinide': '#f43f5e',
    };
    return colors[cat] || '#475569';
}

function showElementInfo(el) {
    ptSidebar.innerHTML = `
        <div class="animate-in fade-in duration-300">
            <div class="w-12 h-12 rounded-lg flex items-center justify-center text-xl font-black mb-4 mx-auto border border-white/20" 
                 style="background-color: #${el.cpk_hex || '475569'}">${el.symbol}</div>
            <h3 class="text-lg font-bold text-center">${el.name}</h3>
            <p class="text-[9px] text-slate-500 uppercase text-center mb-4">${el.category}</p>
            <div class="grid grid-cols-2 gap-2 text-[9px] font-mono">
                <div class="bg-slate-800 p-2 rounded">Mass: ${el.atomic_mass.toFixed(2)}</div>
                <div class="bg-slate-800 p-2 rounded">EN: ${el.electronegativity_pauling || 'N/A'}</div>
            </div>
        </div>
    `;
}

function addAtom(el) {
    console.log('addAtom called with:', el.symbol);
    const container = document.getElementById('simulator-page');
    const width = container ? container.clientWidth : window.innerWidth;
    const height = container ? container.clientHeight : window.innerHeight;
    
    // World coordinate = (Screen coordinate - Translation) / Zoom
    const centerX = (width / 2 - viewState.x) / viewState.zoom;
    const centerY = (height / 2 - viewState.y) / viewState.zoom;

    const atom = {
        id: Math.random().toString(36).substr(2, 9),
        element: el,
        x: centerX + (Math.random() - 0.5) * 50,
        y: centerY + (Math.random() - 0.5) * 50,
        charge: 0,
        oxidationState: 0
    };
    engine.atoms.push(atom);
    console.log('Atom added. Total atoms:', engine.atoms.length);
    updateScene(true);
}

function handleMove(e) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Skip updates if mouse hasn't moved significantly (reduces CPU)
    if (draggingAtom && window._lastMouseX !== undefined) {
        const dx = mouseX - window._lastMouseX;
        const dy = mouseY - window._lastMouseY;
        if (dx * dx + dy * dy < 4) return; // Skip if moved less than 2 pixels
    }
    window._lastMouseX = mouseX;
    window._lastMouseY = mouseY;

    if (viewState.isPanning) {
        const dx = e.clientX - viewState.lastMouse.x;
        const dy = e.clientY - viewState.lastMouse.y;
        viewState.x += dx;
        viewState.y += dy;
        viewState.lastMouse = { x: e.clientX, y: e.clientY };
        updateScene();
        return;
    }

    if (!draggingAtom) return;
    
    // Convert screen coordinates to world coordinates
    draggingAtom.x = (mouseX - viewState.x - dragOffset.x) / viewState.zoom;
    draggingAtom.y = (mouseY - viewState.y - dragOffset.y) / viewState.zoom;
    
    updateScene(false);
}

function handleWheel(e) {
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const zoomSpeed = 0.001;
    const delta = -e.deltaY;
    const factor = Math.pow(1.1, delta / 100);
    const newZoom = Math.min(Math.max(viewState.zoom * factor, 0.1), 5);

    // Zoom relative to mouse position
    const worldX = (mouseX - viewState.x) / viewState.zoom;
    const worldY = (mouseY - viewState.y) / viewState.zoom;

    viewState.zoom = newZoom;
    viewState.x = mouseX - worldX * viewState.zoom;
    viewState.y = mouseY - worldY * viewState.zoom;

    updateScene();
}

function renderAtoms() {
    atomsLayer.innerHTML = '';
    engine.atoms.forEach(atom => {
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.setAttribute('transform', `translate(${atom.x}, ${atom.y})`);
        g.style.cursor = 'grab';
        
        const radius = getAtomRadius(atom);
        const cpkColor = getCPKColor(atom.element.symbol);
        const gradientId = `sphere-grad-${atom.id}`;
        const gradientUrl = createSphereGradient(gradientId, cpkColor);
        
        if (selectedAtomId === atom.id) {
            const glow = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            glow.setAttribute('r', radius + 15);
            glow.setAttribute('fill', 'url(#selection-glow)');
            glow.setAttribute('class', 'animate-pulse selection-glow-circle');
            g.appendChild(glow);
        }

        const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        c.setAttribute('r', radius);
        c.setAttribute('fill', gradientUrl);
        c.setAttribute('filter', 'url(#atom-shadow)');
        
        const highlight = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
        highlight.setAttribute('cx', -radius * 0.25);
        highlight.setAttribute('cy', -radius * 0.25);
        highlight.setAttribute('rx', radius * 0.35);
        highlight.setAttribute('ry', radius * 0.25);
        highlight.setAttribute('fill', 'white');
        highlight.setAttribute('opacity', '0.4');
        
        const t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        t.setAttribute('text-anchor', 'middle');
        t.setAttribute('dy', '.35em');
        const luminance = getLuminance(cpkColor);
        t.setAttribute('fill', luminance > 0.5 ? '#000000' : '#ffffff');
        t.setAttribute('font-size', radius * 0.55);
        t.setAttribute('font-weight', 'bold');
        t.setAttribute('class', 'select-none pointer-events-none');
        t.setAttribute('style', 'text-shadow: 0 1px 2px rgba(0,0,0,0.3)');
        t.textContent = atom.element.symbol;

        // Show partial charge (δ⁺/δ⁻) above the atom
        if (atom.partialCharge && Math.abs(atom.partialCharge) > 0.01) {
            const pcText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            const pcStr = atom.partialCharge > 0 ? '\u03B4+' : '\u03B4\u2212';

            pcText.setAttribute('x', radius + 4);
            pcText.setAttribute('y', -radius - 4);
            pcText.setAttribute('text-anchor', 'start');
            pcText.setAttribute('font-size', '11');
            pcText.setAttribute('font-weight', 'bold');
            pcText.setAttribute('fill', atom.partialCharge > 0 ? '#f87171' : '#60a5fa');
            pcText.setAttribute('class', 'select-none pointer-events-none partial-charge');
            pcText.textContent = pcStr;
            g.appendChild(pcText);
        }

        // Show oxidation state above-left of the atom
        if (atom.oxidationState !== undefined && atom.oxidationState !== 0) {
            const oxText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            const sign = atom.oxidationState > 0 ? '+' : '';
            const oxStr = `${sign}${atom.oxidationState}`;

            oxText.setAttribute('x', -(radius + 4));
            oxText.setAttribute('y', -radius - 4);
            oxText.setAttribute('text-anchor', 'end');
            oxText.setAttribute('font-size', '11');
            oxText.setAttribute('font-weight', 'bold');
            oxText.setAttribute('fill', '#34d399');
            oxText.setAttribute('class', 'select-none pointer-events-none oxidation-state');
            oxText.textContent = oxStr;
            g.appendChild(oxText);
        }

        const shells = atom.element.shells || [];
        shells.forEach((electrons, idx) => {
            const r = radius + (idx + 1) * 18; // Further increased spacing to prevent overlap
            const shell = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            shell.setAttribute('r', r);
            shell.setAttribute('fill', 'none');
            shell.setAttribute('stroke', 'white');
            shell.setAttribute('stroke-opacity', '0.12'); // Subtler shell lines
            g.appendChild(shell);

            const orbitG = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            orbitG.setAttribute('class', 'electron-orbit');
            orbitG.style.setProperty('--duration', `${5 + idx * 2.5}s`); // Even slower for visual clarity
            orbitG.style.transformOrigin = '0 0';

            for (let i = 0; i < electrons; i++) {
                const angle = (i / electrons) * 2 * Math.PI;
                const ex = r * Math.cos(angle);
                const ey = r * Math.sin(angle);
                const e = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                e.setAttribute('cx', ex);
                e.setAttribute('cy', ey);
                e.setAttribute('r', '1.8'); // Balanced electron size
                e.setAttribute('fill', '#60a5fa');
                e.setAttribute('class', 'electron-dot');
                orbitG.appendChild(e);
            }
            g.appendChild(orbitG);
        });

        if (atom.lonePairs > 0) {
            const lpG = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            lpG.setAttribute('class', 'lone-pairs opacity-40');
            for (let i = 0; i < atom.lonePairs; i++) {
                const angle = (i / atom.lonePairs) * 2 * Math.PI + Math.PI/4;
                const lx = (radius * 0.8) * Math.cos(angle);
                const ly = (radius * 0.8) * Math.sin(angle);
                [-2, 2].forEach(offset => {
                    const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                    dot.setAttribute('cx', lx + (offset * Math.cos(angle + Math.PI/2)));
                    dot.setAttribute('cy', ly + (offset * Math.sin(angle + Math.PI/2)));
                    dot.setAttribute('r', '1');
                    dot.setAttribute('fill', '#facc15');
                    lpG.appendChild(dot);
                });
            }
            g.appendChild(lpG);
        }

        g.onpointerdown = (e) => {
            e.stopPropagation();
            draggingAtom = atom;
            selectedAtomId = atom.id;
            const rect = canvas.getBoundingClientRect();
            // Convert click to world coordinates to find offset
            const mouseX = (e.clientX - rect.left - viewState.x) / viewState.zoom;
            const mouseY = (e.clientY - rect.top - viewState.y) / viewState.zoom;
            dragOffset = { x: mouseX - atom.x, y: mouseY - atom.y };
            updateScene();
        };

        g.appendChild(c);
        g.appendChild(highlight);
        g.appendChild(t);
        atomsLayer.appendChild(g);
    });
}

function renderBonds() {
    bondsLayer.innerHTML = '';
    engine.bonds.forEach(bond => {
        const r1 = getAtomRadius(bond.a1);
        const r2 = getAtomRadius(bond.a2);
        
        const dx = bond.a2.x - bond.a1.x;
        const dy = bond.a2.y - bond.a1.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx);
        
        const unitX = dx / dist;
        const unitY = dy / dist;
        
        const start1X = bond.a1.x + unitX * (r1 * 0.7);
        const start1Y = bond.a1.y + unitY * (r1 * 0.7);
        const end2X = bond.a2.x - unitX * (r2 * 0.7);
        const end2Y = bond.a2.y - unitY * (r2 * 0.7);
        
        const midX = (start1X + end2X) / 2;
        const midY = (start1Y + end2Y) / 2;
        
        const offsets = bond.type === 'double' ? [-4, 4] : (bond.type === 'triple' ? [-6, 0, 6] : [0]);
        
        offsets.forEach(offset => {
            const ox = Math.sin(angle) * offset;
            const oy = -Math.cos(angle) * offset;
            
            const bondG = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            
            const bondLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            bondLine.setAttribute('x1', start1X + ox);
            bondLine.setAttribute('y1', start1Y + oy);
            bondLine.setAttribute('x2', end2X + ox);
            bondLine.setAttribute('y2', end2Y + oy);
            
            let strokeColor = '#6366f1';
            if (bond.type === 'ionic') strokeColor = '#fbbf24';
            else if (bond.type === 'aromatic') strokeColor = '#818cf8';
            
            bondLine.setAttribute('stroke', strokeColor);
            bondLine.setAttribute('stroke-width', '4');
            bondLine.setAttribute('stroke-linecap', 'round');
            bondLine.setAttribute('filter', 'url(#bond-glow)');
            bondLine.setAttribute('opacity', '0.7');
            
            if (bond.type === 'ionic') bondLine.setAttribute('stroke-dasharray', '4,4');
            if (bond.type === 'aromatic') {
                const dashLine = bondLine.cloneNode();
                dashLine.setAttribute('stroke-dasharray', '2,4');
                dashLine.setAttribute('stroke-width', '2');
                dashLine.setAttribute('opacity', '1');
                bondG.appendChild(dashLine);
            }
            
            bondG.appendChild(bondLine);
            bondsLayer.appendChild(bondG);
        });
    });
}

function resetVacuum() {
    const atomGroups = atomsLayer.querySelectorAll(':scope > g');
    const rect = canvas.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    engine.atoms.forEach((atom, i) => {
        const g = atomGroups[i];
        if (g) {
            g.style.setProperty('--start-x', `${atom.x}px`);
            g.style.setProperty('--start-y', `${atom.y}px`);
            g.style.setProperty('--center-x', `${(centerX - viewState.x) / viewState.zoom}px`);
            g.style.setProperty('--center-y', `${(centerY - viewState.y) / viewState.zoom}px`);
            g.classList.add('vacuum-animate');
        }
    });

    setTimeout(() => {
        engine.atoms = [];
        engine.bonds = [];
        engine.molecules = [];
        selectedAtomId = null;
        _prevBondCount = 0;
        if (_vsepAnimId) { cancelAnimationFrame(_vsepAnimId); _vsepAnimId = null; }
        if (vsepLayer) vsepLayer.innerHTML = '';
        // Reset view on clear
        viewState.x = 0;
        viewState.y = 0;
        viewState.zoom = 1;
        updateScene(true);
    }, 800);
}

function getCPKColor(symbol) {
    const cpkColors = {
        'H': '#FFFFFF', 'C': '#909090', 'N': '#3050F8', 'O': '#FF0D0D',
        'F': '#90E050', 'Cl': '#1FF01F', 'Br': '#A62929', 'I': '#940094',
        'He': '#FFFF00', 'Ne': '#B3E3F5', 'Ar': '#80D1E3', 'Xe': '#429EB0',
        'P': '#FF8000', 'S': '#FFFF30', 'B': '#FFB5B5', 'Li': '#CC80FF',
        'Na': '#AB5CF2', 'K': '#8F40D4', 'Rb': '#702EB0', 'Cs': '#57178F',
        'Mg': '#8AFF00', 'Ca': '#3DFF00', 'Sr': '#00FF00', 'Ba': '#00C900',
        'Ra': '#007D00', 'Ti': '#999999', 'Fe': '#FFA500',
    };
    return cpkColors[symbol] || '#475569';
}

function getLuminance(hex) {
    const color = hex.replace('#', '');
    const r = parseInt(color.substr(0, 2), 16) / 255;
    const g = parseInt(color.substr(2, 2), 16) / 255;
    const b = parseInt(color.substr(4, 2), 16) / 255;
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function createSphereGradient(id, baseColor) {
    const defs = document.querySelector('#canvas defs');
    let existingGrad = document.getElementById(id);
    if (existingGrad) existingGrad.remove();
    
    const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'radialGradient');
    gradient.setAttribute('id', id);
    gradient.setAttribute('cx', '30%');
    gradient.setAttribute('cy', '30%');
    gradient.setAttribute('r', '70%');
    
    const rgb = hexToRgb(baseColor);
    const lighterColor = `rgb(${Math.min(255, rgb.r + 80)}, ${Math.min(255, rgb.g + 80)}, ${Math.min(255, rgb.b + 80)})`;
    const darkerColor = `rgb(${Math.max(0, rgb.r - 60)}, ${Math.max(0, rgb.g - 60)}, ${Math.max(0, rgb.b - 60)})`;
    
    const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('stop-color', lighterColor);
    
    const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop2.setAttribute('offset', '50%');
    stop2.setAttribute('stop-color', baseColor);
    
    const stop3 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop3.setAttribute('offset', '100%');
    stop3.setAttribute('stop-color', darkerColor);
    
    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    gradient.appendChild(stop3);
    defs.appendChild(gradient);
    
    return `url(#${id})`;
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : { r: 128, g: 128, b: 128 };
}

function getAtomRadius(atom) {
    const baseRadii = {
        'H': 25, 'He': 28, 'C': 35, 'N': 32, 'O': 30, 'F': 28, 
        'Ne': 30, 'P': 38, 'S': 38, 'Cl': 35, 'Ar': 38, 'Br': 40, 
        'I': 45, 'Li': 40, 'Na': 45, 'K': 50, 'Mg': 42, 'Ca': 48,
        'Fe': 40, 'Cu': 38, 'Zn': 38, 'Al': 42, 'Si': 40
    };
    const base = baseRadii[atom.element.symbol] || (20 + atom.element.shells.length * 8);
    return base * 0.8; // Slightly smaller overall (80% of original)
}

// ================================================================
// EXPORT — dropdown letting user choose Image (PNG) or JSON
// ================================================================

// Helper: get clean filename from primary molecule formula
function getExportFilename() {
    let filename = 'atomency-molecule';
    if (engine.molecules.length > 0 && engine.molecules[0].formula) {
        const cleanFormula = engine.molecules[0].formula.replace(/<[^>]*>/g, '').replace(/[^\w-]/g, '');
        if (cleanFormula) filename = `atomency-${cleanFormula}`;
    }
    return filename;
}

// Flash the export button with a message
function flashExportBtn(icon, text, cssClass, duration) {
    const btn = document.getElementById('btn-export');
    if (!btn) return;
    if (cssClass) btn.classList.add(cssClass);
    btn.innerHTML = `<span class="material-icons-round text-sm">${icon}</span> ${text}`;
    setTimeout(() => {
        if (cssClass) btn.classList.remove(cssClass);
        btn.innerHTML = '<span class="material-icons-round text-sm">file_download</span> Export';
    }, duration || 1500);
}

// Close export dropdown if it exists
function closeExportDropdown() {
    const dd = document.getElementById('export-dropdown');
    if (dd) dd.remove();
}

// Toggle export format dropdown
function exportMolecule() {
    // Close if already open
    const existing = document.getElementById('export-dropdown');
    if (existing) { existing.remove(); return; }

    if (engine.atoms.length === 0) {
        flashExportBtn('error_outline', 'Nothing to export', '!bg-rose-600/80', 1500);
        return;
    }

    // Build dropdown above the Export button
    const btn = document.getElementById('btn-export');
    if (!btn) return;

    const dd = document.createElement('div');
    dd.id = 'export-dropdown';
    dd.className = 'absolute bottom-full left-0 right-0 mb-1 bg-slate-800 border border-slate-600/60 rounded-lg shadow-2xl overflow-hidden z-50';
    dd.innerHTML = `
        <button id="export-opt-image" class="w-full flex items-center gap-2 px-3 py-2.5 text-left text-xs font-semibold text-slate-200 hover:bg-emerald-600/30 transition-colors">
            <span class="material-icons-round text-sm text-emerald-400">image</span>
            Image (PNG)
        </button>
        <div class="border-t border-slate-700/60"></div>
        <button id="export-opt-json" class="w-full flex items-center gap-2 px-3 py-2.5 text-left text-xs font-semibold text-slate-200 hover:bg-blue-600/30 transition-colors">
            <span class="material-icons-round text-sm text-blue-400">data_object</span>
            JSON Data
        </button>
    `;

    // Position relative to button's parent
    btn.parentElement.style.position = 'relative';
    btn.parentElement.appendChild(dd);

    dd.querySelector('#export-opt-image').addEventListener('click', () => { closeExportDropdown(); exportAsImage(); });
    dd.querySelector('#export-opt-json').addEventListener('click', () => { closeExportDropdown(); exportAsJSON(); });

    // Close dropdown when clicking elsewhere
    const closeHandler = (e) => {
        if (!dd.contains(e.target) && e.target !== btn && !btn.contains(e.target)) {
            closeExportDropdown();
            document.removeEventListener('pointerdown', closeHandler);
        }
    };
    setTimeout(() => document.addEventListener('pointerdown', closeHandler), 0);
}

// ----------------------------------------------------------------
// EXPORT AS IMAGE (PNG) — capture SVG canvas to a clean PNG
// ----------------------------------------------------------------
function exportAsImage() {
    engine.resolve();

    const svgEl = document.getElementById('canvas');
    if (!svgEl) return;

    const rect = svgEl.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    const scale = 2; // 2x for crisp retina export

    // Clone SVG and prepare it for serialization
    const clone = svgEl.cloneNode(true);
    clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    clone.setAttribute('width', w);
    clone.setAttribute('height', h);
    clone.setAttribute('viewBox', `0 0 ${w} ${h}`);

    // Add dark background rect as first child
    const bgRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    bgRect.setAttribute('width', '100%');
    bgRect.setAttribute('height', '100%');
    bgRect.setAttribute('fill', '#020617');
    clone.insertBefore(bgRect, clone.firstChild);

    // Inline critical styles into the clone for text rendering
    const origTexts = svgEl.querySelectorAll('text');
    const cloneTexts = clone.querySelectorAll('text');
    cloneTexts.forEach((t, i) => {
        const orig = origTexts[i];
        if (orig) {
            const computed = window.getComputedStyle(orig);
            t.setAttribute('font-family', computed.fontFamily || 'system-ui, sans-serif');
            t.setAttribute('font-size', computed.fontSize || '12px');
            t.setAttribute('font-weight', computed.fontWeight || 'normal');
            if (!t.getAttribute('fill')) t.setAttribute('fill', computed.fill || '#e2e8f0');
        }
    });

    const svgData = new XMLSerializer().serializeToString(clone);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = () => {
        const c = document.createElement('canvas');
        c.width = w * scale;
        c.height = h * scale;
        const ctx = c.getContext('2d');
        ctx.scale(scale, scale);
        ctx.drawImage(img, 0, 0, w, h);
        URL.revokeObjectURL(svgUrl);

        // Add watermark
        ctx.globalAlpha = 0.35;
        ctx.font = 'bold 11px system-ui, sans-serif';
        ctx.fillStyle = '#94a3b8';
        ctx.textAlign = 'right';
        ctx.fillText('Atomency', w - 12, h - 10);
        ctx.globalAlpha = 1;

        c.toBlob((blob) => {
            if (!blob) { flashExportBtn('error_outline', 'Export failed', '!bg-rose-600/80', 2000); return; }
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${getExportFilename()}.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            flashExportBtn('check', 'Image saved!', null, 2000);
        }, 'image/png');
    };
    img.onerror = () => {
        URL.revokeObjectURL(svgUrl);
        flashExportBtn('error_outline', 'Export failed', '!bg-rose-600/80', 2000);
    };
    img.src = svgUrl;
}

// ----------------------------------------------------------------
// EXPORT AS JSON — serialize canvas state (existing logic)
// ----------------------------------------------------------------
function exportAsJSON() {
    engine.resolve();

    const atomsData = engine.atoms.map(atom => ({
        id: atom.id,
        element: {
            symbol: atom.element.symbol,
            name: atom.element.name,
            number: atom.element.number,
            atomic_mass: atom.element.atomic_mass,
            category: atom.element.category || '',
            electronegativity_pauling: atom.element.electronegativity_pauling || null,
            cpk_hex: atom.element.cpk_hex || null
        },
        position: { x: Math.round(atom.x * 100) / 100, y: Math.round(atom.y * 100) / 100 },
        charge: atom.charge || 0,
        formalCharge: atom.formalCharge || 0,
        partialCharge: atom.partialCharge || 0,
        oxidationState: atom.oxidationState || 0,
        lonePairs: atom.lonePairs || 0
    }));

    const bondsData = engine.bonds.map(bond => ({
        id: bond.id,
        atom1: bond.a1.id,
        atom2: bond.a2.id,
        type: bond.type || 'covalent',
        order: bond.order || 1,
        isIonic: bond.isIonic || false
    }));

    const moleculesData = (engine.molecules || []).map(mol => ({
        id: mol.id,
        formula: mol.formula || '',
        name: mol.name || '',
        atomIds: mol.atomIds || [],
        molecularMass: mol.molecularMass || null,
        totalElectrons: mol.totalElectrons || null,
        netCharge: mol.netCharge || 0,
        bondingType: mol.bondingType || '',
        stateOfMatter: mol.stateOfMatter || '',
        stability: mol.stability || null,
        description: mol.description || ''
    }));

    const filename = getExportFilename();

    const exportData = {
        format: 'atomency-v1',
        exportedAt: new Date().toISOString(),
        environment: {
            temperature: engine.temperature,
            temperatureUnit: 'K',
            pressure: engine.pressure,
            pressureUnit: 'atm'
        },
        atoms: atomsData,
        bonds: bondsData,
        molecules: moleculesData,
        viewport: {
            zoom: viewState.zoom,
            panX: viewState.x,
            panY: viewState.y
        }
    };

    const json = JSON.stringify(exportData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    flashExportBtn('check', 'JSON saved!', null, 2000);
}

// ----------------------------------------------------------------
// IMPORT — load Atomency JSON export back onto canvas
// ----------------------------------------------------------------

function importMolecules() {
    // Create hidden file input
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json,application/json';
    fileInput.style.display = 'none';
    document.body.appendChild(fileInput);

    // Cleanup helper — remove input from DOM
    const cleanup = () => { if (fileInput.parentNode) fileInput.parentNode.removeChild(fileInput); };

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        cleanup();
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (evt) => {
            let data;
            try {
                data = JSON.parse(evt.target.result);
            } catch (err) {
                showImportError('Invalid JSON file. Please select a valid Atomency export.');
                return;
            }

            // Validate format — accept atomency-v* and legacy chemsuite-v* formats
            if (!data.format || !(data.format.startsWith('atomency') || data.format.startsWith('chemsuite'))) {
                showImportError('Not an Atomency export file. Missing format header.');
                return;
            }

            // For v2 format with molecule-level atoms, flatten into top-level atoms array
            if (!data.atoms && data.molecules && Array.isArray(data.molecules)) {
                data.atoms = [];
                data.molecules.forEach(mol => {
                    if (mol.atoms && Array.isArray(mol.atoms)) {
                        mol.atoms.forEach(a => data.atoms.push(a));
                    }
                });
            }

            if (!data.atoms || !Array.isArray(data.atoms)) {
                showImportError('Invalid file: no atoms data found.');
                return;
            }
            if (data.atoms.length === 0) {
                showImportError('This export file contains no atoms.');
                return;
            }

            // If canvas is empty, just add directly — no need to ask
            if (engine.atoms.length === 0) {
                executeImport(data, 'replace');
                return;
            }

            // Show add/replace modal
            showImportModal(data);
        };
        reader.onerror = () => {
            showImportError('Failed to read the file.');
        };
        reader.readAsText(file);
    });

    // Handle cancel — some browsers fire a focus event when file picker closes without selection
    const cancelHandler = () => {
        setTimeout(() => {
            if (fileInput.parentNode && (!fileInput.files || fileInput.files.length === 0)) {
                cleanup();
            }
        }, 300);
        window.removeEventListener('focus', cancelHandler);
    };
    window.addEventListener('focus', cancelHandler);

    fileInput.click();
}

function showImportModal(data) {
    // Remove any existing modal
    const existing = document.getElementById('import-modal');
    if (existing) existing.remove();

    const atomCount = data.atoms.length;
    const molCount = (data.molecules || []).length;

    const modal = document.createElement('div');
    modal.id = 'import-modal';
    modal.className = 'fixed inset-0 z-[9999] flex items-center justify-center';
    modal.innerHTML = `
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" onclick="closeImportModal()"></div>
        <div class="relative bg-slate-900 border border-slate-600/60 rounded-2xl shadow-2xl p-6 max-w-sm w-full mx-4 animate-fade-in">
            <h3 class="text-sm font-black text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                <span class="material-icons-round text-blue-400 text-lg">file_upload</span>
                Import Molecules
            </h3>
            <p class="text-[11px] text-slate-400 mb-4">
                This file contains <strong class="text-white">${atomCount} atom${atomCount !== 1 ? 's' : ''}</strong>
                ${molCount > 0 ? `in <strong class="text-white">${molCount} molecule${molCount !== 1 ? 's' : ''}</strong>` : ''}.
                How would you like to import?
            </p>
            <div class="space-y-2">
                <button onclick="executeImport(window._importData, 'add'); closeImportModal()"
                    class="w-full py-2.5 bg-blue-600/80 hover:bg-blue-500 text-white font-bold rounded-lg text-xs uppercase tracking-tight transition-all active:scale-95 flex items-center justify-center gap-2 border border-blue-500/30">
                    <span class="material-icons-round text-sm">add_circle</span>
                    Add to Canvas
                </button>
                <button onclick="executeImport(window._importData, 'replace'); closeImportModal()"
                    class="w-full py-2.5 bg-amber-600/80 hover:bg-amber-500 text-white font-bold rounded-lg text-xs uppercase tracking-tight transition-all active:scale-95 flex items-center justify-center gap-2 border border-amber-500/30">
                    <span class="material-icons-round text-sm">swap_horiz</span>
                    Replace Canvas
                </button>
                <button onclick="closeImportModal()"
                    class="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-400 font-bold rounded-lg text-xs uppercase tracking-tight transition-all active:scale-95 border border-slate-700/50">
                    Cancel
                </button>
            </div>
        </div>
    `;

    // Store data reference for the onclick handlers
    window._importData = data;
    document.body.appendChild(modal);
}

function closeImportModal() {
    const modal = document.getElementById('import-modal');
    if (modal) modal.remove();
    delete window._importData;
}

function executeImport(data, mode) {
    // Replace mode: clear existing canvas
    if (mode === 'replace') {
        engine.atoms = [];
        engine.bonds = [];
        engine.molecules = [];
        selectedAtomId = null;
        _prevBondCount = 0;
        if (_vsepAnimId) { cancelAnimationFrame(_vsepAnimId); _vsepAnimId = null; }
        if (vsepLayer) vsepLayer.innerHTML = '';
    }

    // Build a lookup map of full element data from the engine's loaded periodic table
    const elementMap = {};
    engine.elements.forEach(el => {
        elementMap[el.symbol] = el;
    });

    let importedCount = 0;
    let skippedCount = 0;

    // Import atoms
    data.atoms.forEach(atomData => {
        const symbol = atomData.element?.symbol;
        if (!symbol) { skippedCount++; return; }

        // Look up full element data from engine's periodic table
        const fullElement = elementMap[symbol];
        if (!fullElement) {
            console.warn(`Import: Unknown element "${symbol}", skipping.`);
            skippedCount++;
            return;
        }

        const atom = {
            id: Math.random().toString(36).substr(2, 9), // Generate fresh unique ID
            element: fullElement,
            x: atomData.position?.x ?? (300 + Math.random() * 200),
            y: atomData.position?.y ?? (300 + Math.random() * 200),
            charge: atomData.charge || 0,
            formalCharge: atomData.formalCharge || 0,
            partialCharge: atomData.partialCharge || 0,
            oxidationState: atomData.oxidationState || 0,
            lonePairs: atomData.lonePairs || 0
        };

        engine.atoms.push(atom);
        importedCount++;
    });

    // Restore environment settings
    if (data.environment) {
        if (typeof data.environment.temperature === 'number') {
            engine.temperature = data.environment.temperature;
            const tempSlider = document.getElementById('slider-temp');
            const tempVal = document.getElementById('val-temp');
            if (tempSlider) tempSlider.value = engine.temperature;
            if (tempVal) tempVal.textContent = `${engine.temperature} K`;
        }
        if (typeof data.environment.pressure === 'number') {
            engine.pressure = data.environment.pressure;
            const pressSlider = document.getElementById('slider-press');
            const pressVal = document.getElementById('val-press');
            if (pressSlider) pressSlider.value = engine.pressure;
            if (pressVal) pressVal.textContent = `${engine.pressure} atm`;
        }
    }

    // Restore viewport if replacing
    if (mode === 'replace' && data.viewport) {
        if (typeof data.viewport.zoom === 'number') viewState.zoom = data.viewport.zoom;
        if (typeof data.viewport.panX === 'number') viewState.x = data.viewport.panX;
        if (typeof data.viewport.panY === 'number') viewState.y = data.viewport.panY;
    }

    // Re-render everything — engine.resolve() will auto-detect bonds and molecules
    updateScene(true);

    // Read back what the engine detected after resolve
    const bondCount = engine.bonds ? engine.bonds.length : 0;
    const molCount = engine.molecules ? engine.molecules.length : 0;

    // Update HUD stats
    const statAtoms = document.getElementById('stat-atoms');
    const statBonds = document.getElementById('stat-bonds');
    if (statAtoms) statAtoms.textContent = engine.atoms.length;
    if (statBonds) statBonds.textContent = bondCount;

    // Show success toast with detail (much more visible than button flash)
    if (importedCount > 0) {
        const parts = [`${importedCount} atom${importedCount !== 1 ? 's' : ''}`];
        if (bondCount > 0) parts.push(`${bondCount} bond${bondCount !== 1 ? 's' : ''}`);
        if (molCount > 0) parts.push(`${molCount} molecule${molCount !== 1 ? 's' : ''}`);
        showImportSuccess(parts.join(', ') + ' imported!');
    }

    // Also flash the button
    flashImportBtn(
        importedCount > 0 ? 'check' : 'error_outline',
        importedCount > 0 ? 'Done!' : 'No atoms imported',
        importedCount > 0 ? null : '!bg-rose-600/80',
        2000
    );

    if (importedCount === 0) {
        showImportError('No atoms could be imported. Elements may not be recognized.');
    }

    if (skippedCount > 0) {
        console.warn(`Import: Skipped ${skippedCount} atom(s) due to missing/unknown elements.`);
    }
}

function flashImportBtn(icon, text, cssClass, duration) {
    const btn = document.getElementById('btn-import');
    if (!btn) return;
    if (cssClass) btn.classList.add(cssClass);
    btn.innerHTML = `<span class="material-icons-round text-sm">${icon}</span> ${text}`;
    setTimeout(() => {
        if (cssClass) btn.classList.remove(cssClass);
        btn.innerHTML = '<span class="material-icons-round text-sm">file_upload</span> Import';
    }, duration || 1500);
}

function showImportSuccess(message) {
    // Remove any existing toast
    const existing = document.getElementById('import-success-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'import-success-toast';
    toast.className = 'fixed top-6 left-1/2 -translate-x-1/2 z-[99999] bg-emerald-900/95 border border-emerald-500/50 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-fade-in max-w-sm';
    toast.innerHTML = `
        <span class="material-icons-round text-emerald-400 text-base">check_circle</span>
        <span>${message}</span>
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
        if (toast.parentNode) toast.remove();
    }, 4000);
}

function showImportError(message) {
    // Remove any existing error toast
    const existing = document.getElementById('import-error-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'import-error-toast';
    toast.className = 'fixed top-6 left-1/2 -translate-x-1/2 z-[99999] bg-rose-900/95 border border-rose-500/50 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-fade-in max-w-sm';
    toast.innerHTML = `
        <span class="material-icons-round text-rose-400 text-base">error_outline</span>
        <span>${message}</span>
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
        if (toast.parentNode) toast.remove();
    }, 4000);
}

// Expose globally
window.exportMolecule = exportMolecule;
window.exportAsImage = exportAsImage;
window.exportAsJSON = exportAsJSON;
window.importMolecules = importMolecules;
window.closeImportModal = closeImportModal;
window.executeImport = executeImport;

initApp();
