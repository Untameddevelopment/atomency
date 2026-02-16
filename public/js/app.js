function init() {
    renderTable();
    populateSpawnControls();
    document.getElementById('element-search').addEventListener('input', renderTable);
    requestAnimationFrame(updateSimulator);
}

function spawnInAlchemist(symbol) {
    if (typeof engine !== 'undefined' && engine.elements && engine.elements.length > 0) {
        const alchemistElement = engine.elements.find(e => e.symbol === symbol);
        if (alchemistElement) {
            const canvas = document.getElementById('canvas');
            const width = canvas.clientWidth || 600;
            const height = canvas.clientHeight || 400;
            const atom = {
                id: Math.random().toString(36).substr(2, 9),
                element: alchemistElement,
                x: Math.max(100, width / 2 + (Math.random() - 0.5) * 100),
                y: Math.max(100, height / 2 + (Math.random() - 0.5) * 100),
                charge: 0,
                oxidationState: 0
            };
            engine.atoms.push(atom);
            if (typeof updateScene === 'function') {
                updateScene(true);
            }
        }
    }
}

function populateSpawnControls() {
    const container = document.getElementById('spawn-controls');
    if (!container) return;
    container.innerHTML = '';
    
    const wrapper = document.createElement('div');
    wrapper.className = 'flex flex-col gap-3 w-full';

    const select = document.createElement('select');
    select.className = 'bg-slate-800 border border-white/20 rounded px-2 py-1 text-[10px] font-bold text-white outline-none focus:border-blue-500 w-full mb-2';
    const defOpt = document.createElement('option');
    defOpt.text = 'Select All 118 Elements...';
    select.add(defOpt);
    ELEMENTS_DATA.forEach(el => {
        const opt = document.createElement('option');
        opt.value = el.symbol;
        opt.text = `${el.atomicNumber}. ${el.name} (${el.symbol})`;
        select.add(opt);
    });
    select.onchange = (e) => {
        if (e.target.value && e.target.value !== 'Select All 118 Elements...') {
            spawnElement(e.target.value);
            e.target.selectedIndex = 0;
        }
    };
    wrapper.appendChild(select);

    const quick = document.createElement('div');
    quick.className = 'flex flex-wrap justify-center gap-1';
    ['H', 'C', 'N', 'O', 'Na', 'Cl', 'Mg', 'Al', 'Fe', 'Cu', 'K', 'Ca', 'S', 'P', 'F'].forEach(sym => {
        const el = ELEMENTS_DATA.find(e => e.symbol === sym);
        if (el) {
            const btn = document.createElement('button');
            const color = getCategoryColor(el.category);
            btn.onclick = () => spawnElement(sym);
            btn.className = 'w-8 h-7 bg-white/5 border border-white/10 rounded hover:bg-white/10 font-black italic text-[9px] transition-all';
            btn.style.color = `hsl(${color})`;
            btn.innerText = sym;
            quick.appendChild(btn);
        }
    });
    wrapper.appendChild(quick);
    container.appendChild(wrapper);
}

function showPage(page) {
    document.getElementById('home-page').classList.toggle('hidden', page !== 'home');
    document.getElementById('simulator-page').classList.toggle('hidden', page !== 'simulator');

    const tabHome = document.getElementById('tab-home');
    const tabSim = document.getElementById('tab-simulator');
    if (tabHome) tabHome.classList.toggle('active', page === 'home');
    if (tabSim) tabSim.classList.toggle('active', page === 'simulator');
}

function getCategoryColor(cat) {
    const map = {
        'alkali metal': '340 82% 52%',
        'alkaline earth metal': '25 95% 53%',
        'transition metal': '45 93% 47%',
        'post-transition metal': '170 60% 40%',
        'metalloid': '190 80% 40%',
        'noble gas': '320 60% 50%',
        'halogen': '280 60% 50%',
        'lanthanide': '30 60% 60%',
        'actinide': '340 60% 60%',
        'diatomic nonmetal': '200 80% 50%',
        'polyatomic nonmetal': '200 80% 50%'
    };
    return map[cat] || '199 89% 48%';
}

function breakMolecule(particleId) {
    if (typeof engine === 'undefined') return;
    const atomIndex = engine.atoms.findIndex(a => a.id === particleId);
    if (atomIndex === -1) return;
    
    // In this engine, atoms are part of molecules discovered by findMolecules()
    // and stored in engine.molecules. Removing an atom effectively "breaks" its molecule
    // if it's the target atom.
    
    engine.atoms.splice(atomIndex, 1);
    if (typeof updateScene === 'function') {
        updateScene(true);
    }
    closeModal();
}

function spawnParticleDOM(p, canvas) {
    const dom = document.createElement('div');
    dom.className = 'particle';
    
    const color = getCategoryColor(p.el.category);
    dom.style.borderColor = `hsl(${color} / 0.5)`;
    
    const shellContainer = document.createElement('div');
    shellContainer.className = 'absolute inset-0 pointer-events-none electron-shell-container';
    
    const capacities = [2, 8, 18, 32];
    let remaining = p.el.atomicNumber;
    capacities.forEach((cap, i) => {
        if (remaining <= 0) return;
        const count = Math.min(remaining, cap);
        remaining -= count;
        
        const shellRadius = 30 + (i + 1) * 8;
        const shell = document.createElement('div');
        shell.className = 'electron-shell absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2';
        shell.style.width = `${shellRadius * 2}px`;
        shell.style.height = `${shellRadius * 2}px`;
        shellContainer.appendChild(shell);
        
        const orbit = document.createElement('div');
        orbit.className = 'orbit';
        orbit.style.width = `${shellRadius * 2}px`;
        orbit.style.height = `${shellRadius * 2}px`;
        orbit.style.animationDuration = `${5 + i * 3}s`;
        
        for(let j=0; j<count; j++) {
            const e = document.createElement('div');
            e.className = 'electron';
            const angle = (j / count) * Math.PI * 2;
            e.style.left = `${shellRadius + Math.cos(angle) * shellRadius - 1.5}px`;
            e.style.top = `${shellRadius + Math.sin(angle) * shellRadius - 1.5}px`;
            orbit.appendChild(e);
        }
        shellContainer.appendChild(orbit);
    });
    
    dom.appendChild(shellContainer);
    
    const content = document.createElement('div');
    content.className = 'flex flex-col items-center justify-center z-10';
    content.innerHTML = `
        <span class="text-xl font-black">${p.el.symbol}</span>
        <span class="text-[6px] font-bold uppercase opacity-50">${p.el.name}</span>
    `;
    dom.appendChild(content);
    
    dom.addEventListener('mousedown', (e) => {
        draggedParticle = p;
        p.isDragging = true;
        const rect = canvas.getBoundingClientRect();
        p.dragOffsetX = (e.clientX - rect.left) - p.x;
        p.dragOffsetY = (e.clientY - rect.top) - p.y;
        dom.style.zIndex = 100;
        toggleSettings(p);
    });
    
    canvas.appendChild(dom);
    p.dom = dom;
}

async function fetchPubChemData(compoundName) {
    try {
        const response = await fetch(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encodeURIComponent(compoundName)}/JSON`);
        if (!response.ok) return null;
        const data = await response.json();
        const compound = data.PC_Compounds?.[0];
        if (!compound) return null;

        // Fetch description separately from PubChem
        const cid = compound.id.id.cid;
        const descResponse = await fetch(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/description/JSON`);
        const descData = await descResponse.json();
        const description = descData.InformationList?.Information?.[0]?.Description || '';
        
        return {
            ...compound,
            description
        };
    } catch (error) {
        console.error('PubChem fetch error:', error);
        return null;
    }
}

async function showMoleculeDetail(p) {
    const content = document.getElementById('modal-content');
    let specialEffect = '';
    
    // Show loading state
    content.innerHTML = `
        <div class="flex items-center justify-center h-64">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
        </div>
    `;

    // Attempt to fetch live data from PubChem for more detail
    const pubChemData = await fetchPubChemData(p.productName);
    const weight = pubChemData?.props?.find(pr => pr.urn.label === 'Molecular Weight')?.value.fval || 'N/A';
    const cid = pubChemData?.id?.id?.cid;
    const pubChemDesc = pubChemData?.description || '';

    // Find reaction data for the summary
    const reaction = Object.values(REACTIONS).find(r => r.formula === p.formula);
    const summary = reaction?.summary || pubChemDesc || 'A chemical compound formed by the reaction of multiple elements.';
    
    // Unique Animations / Effects based on behavior or formula
    if (p.formula === 'H2O') {
        specialEffect = `
            <div class="mt-4 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300">
                <div class="flex items-center gap-3 mb-2">
                    <div class="w-2 h-2 rounded-full bg-blue-400 animate-ping"></div>
                    <span class="text-xs font-black uppercase tracking-widest">Hydration Active</span>
                </div>
                <div class="water-ripple-container h-24 rounded-lg relative overflow-hidden bg-blue-950/50">
                    <div class="absolute inset-0 opacity-30">
                        <div class="water-wave animate-wave"></div>
                        <div class="water-wave animate-wave-slow opacity-50"></div>
                    </div>
                </div>
            </div>
        `;
    } else if (p.behavior === 'explosive') {
        specialEffect = `
            <div class="mt-4 p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-300">
                <div class="flex items-center gap-3 mb-2">
                    <div class="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></div>
                    <span class="text-xs font-black uppercase tracking-widest">Unstable Compound</span>
                </div>
                <div class="explosion-preview h-24 rounded-lg bg-orange-950/50 flex items-center justify-center">
                    <div class="text-4xl animate-bounce">💥</div>
                </div>
            </div>
        `;
    }

    content.innerHTML = `
        <div class="flex flex-col md:flex-row items-center gap-8 mb-8">
            <div class="w-48 h-48 flex-shrink-0 rounded-full border-4 border-emerald-500 flex items-center justify-center bg-black/40 shadow-[0_0_40px_rgba(16,185,129,0.3)] relative overflow-hidden">
                <span class="text-6xl font-black text-white z-10">${p.formula}</span>
                <div class="absolute inset-0 opacity-30 bg-gradient-to-br from-emerald-500/20 to-transparent"></div>
            </div>
            <div class="flex-1">
                <div class="flex flex-wrap items-center gap-3 mb-2">
                    <h2 class="text-4xl font-black uppercase italic tracking-tighter text-emerald-400">${p.productName}</h2>
                    <div class="px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">Chemical Compound</div>
                </div>
                <p class="text-white/70 leading-relaxed text-sm italic">${summary}</p>
                ${cid ? `<a href="https://pubchem.ncbi.nlm.nih.gov/compound/${cid}" target="_blank" class="text-[10px] text-emerald-400 hover:underline mt-2 inline-block font-black uppercase">View on PubChem (CID: ${cid})</a>` : ''}
            </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div class="bg-white/5 p-4 rounded-xl border border-white/10">
                <p class="text-[10px] uppercase opacity-40 font-black tracking-widest mb-1">Chemical Formula</p>
                <p class="font-mono text-2xl text-emerald-200">${p.formula}</p>
            </div>
            <div class="bg-white/5 p-4 rounded-xl border border-white/10">
                <p class="text-[10px] uppercase opacity-40 font-black tracking-widest mb-1">Molecular Weight</p>
                <p class="font-mono text-2xl text-emerald-200">${weight} g/mol</p>
            </div>
        </div>

        <div class="bg-white/5 p-4 rounded-xl border border-white/10 mb-6">
            <button onclick="breakMolecule('${p.id}')" class="w-full h-full bg-red-500/20 border border-red-500/40 text-red-400 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all py-3">Break Molecule</button>
        </div>

        ${specialEffect}

        <h3 class="text-lg font-bold uppercase tracking-wider text-white/70 border-t border-white/5 pt-6 mb-4">Constituent Atoms</h3>
        <div class="flex flex-wrap gap-2 mb-6">
            ${p.atoms.map(a => `
                <div class="bg-white/5 px-3 py-2 rounded-lg border border-white/10 flex items-center gap-2">
                    <span class="font-black text-lg">${a.symbol}</span>
                </div>
            `).join('')}
        </div>
    `;
    document.getElementById('element-modal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('element-modal').classList.add('hidden');
}

function getTrendValue(el, trendType) {
    if (trendType === 'en') {
        return el.electronegativity || null;
    } else if (trendType === 'radius') {
        return el.atomicRadius || estimateAtomicRadius(el);
    } else if (trendType === 'ionization') {
        return el.ionizationEnergy || estimateIonizationEnergy(el);
    }
    return null;
}

function estimateAtomicRadius(el) {
    const period = el.period;
    const group = el.group;
    if (!group || !period) return null;
    return 50 + (period * 30) - (group * 3);
}

function estimateIonizationEnergy(el) {
    const period = el.period;
    const group = el.group;
    if (!group || !period) return null;
    return 400 + (group * 80) - (period * 50);
}

function getTrendColor(value, min, max, trendType) {
    if (value === null) return null;
    const normalized = (value - min) / (max - min);
    
    if (trendType === 'en') {
        const h = 200 + normalized * 140;
        return `hsl(${h}, 80%, ${30 + normalized * 30}%)`;
    } else if (trendType === 'radius') {
        const h = 120 - normalized * 80;
        return `hsl(${h}, 70%, ${25 + normalized * 25}%)`;
    } else if (trendType === 'ionization') {
        const h = 30 + normalized * 30;
        return `hsl(${h}, 85%, ${30 + normalized * 25}%)`;
    }
    return null;
}

function getIonChargeDisplay(el) {
    const group = el.group;
    const category = el.category;
    
    if (category === 'noble gas') return '';
    if (category === 'alkali metal') return '+1';
    if (category === 'alkaline earth metal') return '+2';
    if (group === 13 && category !== 'metalloid') return '+3';
    if (category === 'halogen') return '-1';
    if (group === 16 && (category.includes('nonmetal') || el.symbol === 'O' || el.symbol === 'S')) return '-2';
    if (group === 15 && (category.includes('nonmetal') || el.symbol === 'N' || el.symbol === 'P')) return '-3';
    
    if (el.commonIonCharge && el.commonIonCharge !== 'None') {
        const charges = el.commonIonCharge.split(',').map(c => c.trim());
        return charges[0];
    }
    return '';
}

function updateLegend(trendType) {
    const legend = document.getElementById('trend-legend');
    const gradient = document.getElementById('legend-gradient');
    
    if (!trendType) {
        legend.classList.add('hidden');
        return;
    }
    
    legend.classList.remove('hidden');
    
    if (trendType === 'en') {
        gradient.style.background = 'linear-gradient(to right, hsl(200, 80%, 30%), hsl(340, 80%, 60%))';
    } else if (trendType === 'radius') {
        gradient.style.background = 'linear-gradient(to right, hsl(120, 70%, 25%), hsl(40, 70%, 50%))';
    } else if (trendType === 'ionization') {
        gradient.style.background = 'linear-gradient(to right, hsl(30, 85%, 30%), hsl(60, 85%, 55%))';
    }
}

function renderTable() {
    const query = document.getElementById('element-search').value.toLowerCase();
    const container = document.getElementById('periodic-table');
    if (!container) return;
    container.innerHTML = '';
    
    const showEN = document.getElementById('toggle-en')?.checked;
    const showRadius = document.getElementById('toggle-radius')?.checked;
    const showIonization = document.getElementById('toggle-ionization')?.checked;
    const showIonCharge = document.getElementById('toggle-ion-charge')?.checked;
    
    let activeTrend = null;
    if (showEN) activeTrend = 'en';
    else if (showRadius) activeTrend = 'radius';
    else if (showIonization) activeTrend = 'ionization';
    
    let trendMin = Infinity, trendMax = -Infinity;
    if (activeTrend) {
        ELEMENTS_DATA.forEach(el => {
            const val = getTrendValue(el, activeTrend);
            if (val !== null) {
                trendMin = Math.min(trendMin, val);
                trendMax = Math.max(trendMax, val);
            }
        });
    }
    
    updateLegend(activeTrend);
    
    ELEMENTS_DATA.forEach(el => {
        const cell = document.createElement('div');
        cell.className = 'element-cell';
        cell.onclick = () => showElementDetail(el);
        cell.style.gridColumn = el.xpos;
        cell.style.gridRow = el.ypos;
        
        const isFiltered = query && !(el.name.toLowerCase().includes(query) || el.symbol.toLowerCase().includes(query) || el.atomicNumber.toString().includes(query));
        if (isFiltered) cell.style.opacity = '0.1';

        const color = getCategoryColor(el.category);
        
        if (activeTrend && !isFiltered) {
            const trendVal = getTrendValue(el, activeTrend);
            const trendColor = getTrendColor(trendVal, trendMin, trendMax, activeTrend);
            if (trendColor) {
                cell.style.backgroundColor = trendColor;
                cell.style.borderColor = 'rgba(255,255,255,0.3)';
            } else {
                cell.style.backgroundColor = 'rgba(50,50,50,0.5)';
                cell.style.borderColor = 'rgba(255,255,255,0.1)';
            }
        } else {
            cell.style.borderColor = `hsl(${color} / 0.4)`;
            cell.style.backgroundColor = `hsl(${color} / 0.1)`;
        }

        const ionChargeHtml = showIonCharge ? `<span class="ion-charge-badge">${getIonChargeDisplay(el)}</span>` : '';
        
        cell.innerHTML = `
            <span class="absolute top-0.5 left-1 text-[8px] opacity-60 font-mono">${el.atomicNumber}</span>
            ${ionChargeHtml}
            <span class="text-sm font-black" style="color: ${activeTrend ? 'white' : `hsl(${color})`}">${el.symbol}</span>
            <span class="text-[8px] opacity-40 uppercase truncate w-full text-center px-1 font-bold">${el.name}</span>
        `;
        container.appendChild(cell);
    });
}

function showElementDetail(el) {
    const content = document.getElementById('modal-content');
    const color = getCategoryColor(el.category);
    
    content.innerHTML = `
        <div class="flex flex-col md:flex-row items-center gap-8 mb-8">
            <div class="w-48 h-48 flex-shrink-0 rounded-full border-4 flex items-center justify-center bg-black/40 relative overflow-hidden" style="border-color: hsl(${color}); box-shadow: 0 0 40px hsla(${color.split(' ')[0]}, 80%, 50%, 0.3)">
                <span class="text-6xl font-black text-white z-10">${el.symbol}</span>
                <div class="absolute inset-0 opacity-30" style="background: linear-gradient(to br, hsl(${color} / 0.2), transparent)"></div>
            </div>
            <div class="flex-1">
                <div class="flex flex-wrap items-center gap-3 mb-2">
                    <h2 class="text-4xl font-black uppercase italic tracking-tighter" style="color: hsl(${color})">${el.name}</h2>
                    <div class="px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-white/5 border border-white/10 text-white/70">${el.category}</div>
                </div>
                <p class="text-white/70 leading-relaxed text-sm italic">${el.summary || 'A fascinating chemical element with unique properties.'}</p>
            </div>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div class="bg-white/5 p-4 rounded-xl border border-white/10">
                <p class="text-[10px] uppercase opacity-40 font-black tracking-widest mb-1">Atomic Number</p>
                <p class="font-mono text-2xl text-white">${el.atomicNumber}</p>
            </div>
            <div class="bg-white/5 p-4 rounded-xl border border-white/10">
                <p class="text-[10px] uppercase opacity-40 font-black tracking-widest mb-1">Atomic Mass</p>
                <p class="font-mono text-xl text-white">${el.atomicMass ? parseFloat(el.atomicMass).toFixed(2) : 'N/A'}</p>
            </div>
            <div class="bg-white/5 p-4 rounded-xl border border-white/10">
                <p class="text-[10px] uppercase opacity-40 font-black tracking-widest mb-1">Phase</p>
                <p class="font-mono text-2xl text-white capitalize">${el.phase || 'N/A'}</p>
            </div>
            <div class="bg-white/5 p-4 rounded-xl border border-white/10">
                <p class="text-[10px] uppercase opacity-40 font-black tracking-widest mb-1">Density</p>
                <p class="font-mono text-2xl text-white">${el.density || 'N/A'}</p>
            </div>
        </div>

        <div class="bg-white/5 p-6 rounded-2xl border border-white/10 mb-6">
            <h3 class="text-xs font-black uppercase tracking-widest text-white/30 mb-4">Discovery Details</h3>
            <div class="flex items-center gap-4">
                <div class="flex-1">
                    <p class="text-white font-bold">${el.discoveredBy || 'Unknown'}</p>
                    <p class="text-[10px] uppercase opacity-40 font-black tracking-widest">Discoverer</p>
                </div>
                <div class="h-8 w-px bg-white/10"></div>
                <div class="flex-1">
                    <p class="text-white font-bold">${el.appearance || 'Standard'}</p>
                    <p class="text-[10px] uppercase opacity-40 font-black tracking-widest">Appearance</p>
                </div>
            </div>
        </div>

        <div class="flex justify-center">
            <button onclick="spawnInAlchemist('${el.symbol}'); closeModal(); showPage('simulator');" class="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-black uppercase tracking-widest transition-all">Spawn in Simulator</button>
        </div>
    `;
    document.getElementById('element-modal').classList.remove('hidden');
}

let particles = [];
let draggedParticle = null;

function spawnElement(symbol) {
    const el = ELEMENTS_DATA.find(e => e.symbol === symbol);
    if (!el) return;
    
    const canvas = document.getElementById('simulator-canvas');
    const rect = canvas.getBoundingClientRect();
    
    const particle = {
        id: Math.random().toString(36).substr(2, 9),
        el,
        x: rect.width / 2 + (Math.random() - 0.5) * 200,
        y: rect.height / 2 + (Math.random() - 0.5) * 200,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        radius: 30,
        isDragging: false,
        isCompound: false,
        dom: null,
        charge: 0
    };
    
    const dom = document.createElement('div');
    dom.className = 'particle';
    
    const color = getCategoryColor(el.category);
    dom.style.borderColor = `hsl(${color} / 0.5)`;
    
    const shellContainer = document.createElement('div');
    shellContainer.className = 'absolute inset-0 pointer-events-none electron-shell-container';
    
    const capacities = [2, 8, 18, 32];
    let remaining = el.atomicNumber;
    capacities.forEach((cap, i) => {
        if (remaining <= 0) return;
        const count = Math.min(remaining, cap);
        remaining -= count;
        
        const shellRadius = 30 + (i + 1) * 8;
        const shell = document.createElement('div');
        shell.className = 'electron-shell absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2';
        shell.style.width = `${shellRadius * 2}px`;
        shell.style.height = `${shellRadius * 2}px`;
        shellContainer.appendChild(shell);
        
        const orbit = document.createElement('div');
        orbit.className = 'orbit';
        orbit.style.width = `${shellRadius * 2}px`;
        orbit.style.height = `${shellRadius * 2}px`;
        orbit.style.animationDuration = `${5 + i * 3}s`;
        
        for(let j=0; j<count; j++) {
            const e = document.createElement('div');
            e.className = 'electron';
            const angle = (j / count) * Math.PI * 2;
            e.style.left = `${shellRadius + Math.cos(angle) * shellRadius - 1.5}px`;
            e.style.top = `${shellRadius + Math.sin(angle) * shellRadius - 1.5}px`;
            orbit.appendChild(e);
        }
        shellContainer.appendChild(orbit);
    });
    
    dom.appendChild(shellContainer);
    
    const content = document.createElement('div');
    content.className = 'flex flex-col items-center justify-center z-10';
    content.innerHTML = `
        <span class="text-xl font-black">${el.symbol}</span>
        <span class="text-[6px] font-bold uppercase opacity-50">${el.name}</span>
    `;
    dom.appendChild(content);
    
    dom.addEventListener('mousedown', (e) => {
        draggedParticle = particle;
        particle.isDragging = true;
        const rect = canvas.getBoundingClientRect();
        particle.dragOffsetX = (e.clientX - rect.left) - particle.x;
        particle.dragOffsetY = (e.clientY - rect.top) - particle.y;
        dom.style.zIndex = 100;
        toggleSettings(particle);
    });
    
    canvas.appendChild(dom);
    particle.dom = dom;
    particles.push(particle);
}

window.addEventListener('mousemove', (e) => {
    if (draggedParticle) {
        const canvas = document.getElementById('simulator-canvas');
        const rect = canvas.getBoundingClientRect();
        draggedParticle.x = (e.clientX - rect.left) - draggedParticle.dragOffsetX;
        draggedParticle.y = (e.clientY - rect.top) - draggedParticle.dragOffsetY;
        draggedParticle.vx = 0;
        draggedParticle.vy = 0;
    }
});

window.addEventListener('mouseup', () => {
    if (draggedParticle) {
        draggedParticle.isDragging = false;
        draggedParticle.dom.style.zIndex = '';
        draggedParticle = null;
    }
});

function resetSimulator() {
    const canvas = document.getElementById('simulator-canvas');
    particles.forEach(p => p.dom.remove());
    particles = [];
    toggleSettings(null);
}

function updateSimulator() {
    const canvas = document.getElementById('simulator-canvas');
    if (!canvas || document.getElementById('simulator-page').classList.contains('hidden')) {
        requestAnimationFrame(updateSimulator);
        return;
    }
    const rect = canvas.getBoundingClientRect();
    
    for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (!p.isDragging) {
            p.x += p.vx; p.y += p.vy;
            p.vx *= 0.98; p.vy *= 0.98;
            if (p.x < p.radius) { p.x = p.radius; p.vx *= -0.5; }
            if (p.x > rect.width - p.radius) { p.x = rect.width - p.radius; p.vx *= -0.5; }
            if (p.y < p.radius) { p.y = p.radius; p.vy *= -0.5; }
            if (p.y > rect.height - p.radius) { p.y = rect.height - p.radius; p.vy *= -0.5; }
        }
        p.dom.style.left = `${p.x - p.radius}px`;
        p.dom.style.top = `${p.y - p.radius}px`;

        for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            
            if (dist < p.radius + p2.radius + 15) {
                // Progressive Bonding Logic
                if (!p.atoms) {
                    p.atoms = [{ symbol: p.el.symbol, id: p.id }];
                }
                if (!p2.atoms) {
                    p2.atoms = [{ symbol: p2.el.symbol, id: p2.id }];
                }

                const combinedAtoms = [...p.atoms, ...p2.atoms];
                const totalCounts = {};
                combinedAtoms.forEach(a => totalCounts[a.symbol] = (totalCounts[a.symbol] || 0) + 1);
                
                // Sort keys for deterministic matching
                const symbols = Object.keys(totalCounts).sort();
                let reactMatch = null;
                
                // Check if this specific combination matches a reaction
                for (const key in REACTIONS) {
                    const reaction = REACTIONS[key];
                    const rRatio = reaction.ratio;
                    
                    // Standardize matching to use raw atom counts
                    let match = true;
                    
                    // Pre-calculate reaction's total atom requirements if not already cached
                    if (!reaction._totalAtoms) {
                        const sumAtoms = (ratio) => {
                            const result = {};
                            for (const k in ratio) {
                                // Is it a raw element symbol?
                                if (ELEMENTS_DATA.find(e => e.symbol === k)) {
                                    result[k] = (result[k] || 0) + ratio[k];
                                } else {
                                    // It's a formula/product name - look up its ratio
                                    const subReact = Object.values(REACTIONS).find(r => r.formula === k || r.product === k);
                                    if (subReact) {
                                        const sub = sumAtoms(subReact.ratio);
                                        for (const sk in sub) {
                                            result[sk] = (result[sk] || 0) + sub[sk] * ratio[k];
                                        }
                                    }
                                }
                            }
                            return result;
                        };
                        reaction._totalAtoms = sumAtoms(rRatio);
                    }

                    const rTotalSymbols = Object.keys(reaction._totalAtoms).sort();
                    if (symbols.length !== rTotalSymbols.length) {
                        match = false;
                    } else {
                        for (let k = 0; k < symbols.length; k++) {
                            const sym = symbols[k];
                            if (sym !== rTotalSymbols[k] || totalCounts[sym] !== reaction._totalAtoms[sym]) {
                                match = false;
                                break;
                            }
                        }
                    }
                    
                    if (match) {
                        reactMatch = reaction;
                        break;
                    }
                }

                if (reactMatch) {
                    // Visual Fusion Animation
                    p.dom.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                    p.dom.style.transform = 'scale(1.5)';
                    p.dom.style.opacity = '0.5';
                    
                    p.isCompound = true;
                    p.atoms = combinedAtoms;
                    p.formula = reactMatch.formula;
                    p.productName = reactMatch.product;
                    p.behavior = reactMatch.behavior || 'stable';
                    
                    setTimeout(() => {
                        p.dom.classList.add('fused-compound');
                        p.dom.style.transform = 'scale(1)';
                        p.dom.style.opacity = '1';
                        p.dom.style.borderColor = '#10b981';
                        p.dom.style.boxShadow = '0 0 40px rgba(16, 185, 129, 0.6)';
                        
                        // Clear existing visual components
                        const shells = p.dom.querySelectorAll('.electron-shell-container');
                        shells.forEach(s => s.remove());
                        const existingAtoms = p.dom.querySelector('.fused-atoms-visual');
                        if (existingAtoms) existingAtoms.remove();

                        // Create space-filling model visual
                        const flex = p.dom.querySelector('.flex-col');
                        if (flex) {
                            flex.innerHTML = `
                                <span class="text-xl font-black text-white drop-shadow-md z-20">${p.formula}</span>
                            `;
                        }

                        // Add fused atoms visual (Space-filling style)
                        const fusedContainer = document.createElement('div');
                        fusedContainer.className = 'fused-atoms-visual absolute inset-0 flex items-center justify-center pointer-events-none';
                        
                        // Generate overlapping circles for atoms
                        const atomCount = p.atoms.length;
                        p.atoms.forEach((atom, idx) => {
                            const circle = document.createElement('div');
                            const elData = ELEMENTS_DATA.find(e => e.symbol === atom.symbol);
                            
                            // Specific Color Fix: Oxygen is Red, Hydrogen is White/Light Blue, Carbon is Black/Grey
                            let color = `hsl(${getCategoryColor(elData?.category || 'nonmetal')})`;
                            if (atom.symbol === 'O') color = '#ef4444'; // Bright Red
                            if (atom.symbol === 'H') color = '#f8fafc'; // White
                            if (atom.symbol === 'C') color = '#334155'; // Dark Grey
                            
                            circle.className = 'fused-atom-circle';
                            // Position atoms in a small cluster
                            const angle = (idx / atomCount) * Math.PI * 2;
                            const offset = atomCount > 1 ? 12 : 0;
                            const size = atom.symbol === 'H' ? 22 : 32; // H is smaller
                            
                            circle.style.width = `${size}px`;
                            circle.style.height = `${size}px`;
                            circle.style.backgroundColor = color;
                            circle.style.left = `calc(50% + ${Math.cos(angle) * offset}px)`;
                            circle.style.top = `calc(50% + ${Math.sin(angle) * offset}px)`;
                            fusedContainer.appendChild(circle);
                        });
                        p.dom.appendChild(fusedContainer);
                        
                        if (reactMatch.behavior === 'explosive') {
                            p.dom.classList.add('behavior-explosive');
                        }
                        
                        // Add title for info
                        p.dom.title = `${p.productName} (${p.formula})`;
                        p.dom.onclick = () => showMoleculeDetail(p);
                    }, 500);

                    p.vx = (p.vx + p2.vx) / 2;
                    p.vy = (p.vy + p2.vy) / 2;
                    p2.dom.remove();
                    particles.splice(j, 1);
                    j--; continue;
                } else {
                    // Preview partial combination
                    p.dom.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                }
                
                const angle = Math.atan2(dy, dx);
                p.vx += Math.cos(angle) * 0.5; p.vy += Math.sin(angle) * 0.5;
                p2.vx -= Math.cos(angle) * 0.5; p2.vy -= Math.sin(angle) * 0.5;
            }
        }
    }
    requestAnimationFrame(updateSimulator);
}

function toggleSettings(p) {
    const panel = document.getElementById('settings-panel');
    if (!p) { panel.classList.add('hidden'); return; }
    panel.classList.remove('hidden');
    const content = document.getElementById('settings-content');
    content.innerHTML = `
        <div class="space-y-4">
            <div>
                <label class="text-[8px] uppercase opacity-50 block mb-1">Charge (${p.charge || 0})</label>
                <input type="range" min="-4" max="4" value="${p.charge || 0}" step="1" 
                    class="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    oninput="updateAtomProperty('${p.id}', 'charge', this.value)">
            </div>
        </div>
    `;
}

function updateAtomProperty(id, prop, val) {
    const p = particles.find(x => x.id === id);
    if (p) {
        p[prop] = parseInt(val);
        if (prop === 'charge') {
            const badge = p.dom.querySelector('.charge-badge') || document.createElement('span');
            badge.className = 'charge-badge absolute -top-2 -right-2 bg-blue-500 text-[10px] font-black px-2 rounded-full z-20 shadow-lg';
            badge.innerText = val > 0 ? `+${val}` : (val < 0 ? val : '');
            if (val == 0) badge.remove(); else p.dom.appendChild(badge);
        }
    }
}

init();
