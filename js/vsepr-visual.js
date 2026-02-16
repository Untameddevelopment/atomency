// ===================
// VSEPR VISUAL SHAPE RENDERER
// ===================
// Rule-based molecular geometry visualization using inline SVG
// Shows bond angles, lone pairs as electron clouds, educational animations
// NO physics — all positions from VSEPR domain lookup tables

class VSEPRVisual {
    constructor() {
        this.W = 220;
        this.H = 200;
        this.CX = 110;
        this.CY = 100;
        this.R = 62;
        this.ATOM_R = 14;
        this.CENTER_R = 17;
        this.ARC_R = 26;
        this._cacheKey = null;
        this._cachedHTML = '';
        this.layouts = this._defineLayouts();
    }

    _defineLayouts() {
        return {
            // 2 electron domains — Linear
            '2-0': {
                domains: [{ x: -1, y: 0 }, { x: 1, y: 0 }],
                bonds: 2, lones: 0
            },
            // 3 electron domains — Trigonal Planar
            '3-0': {
                domains: [{ x: 0, y: -1 }, { x: -0.866, y: 0.5 }, { x: 0.866, y: 0.5 }],
                bonds: 3, lones: 0
            },
            // 3 domains, 1 LP — Bent (~117)
            '2-1': {
                domains: [{ x: -0.866, y: 0.5 }, { x: 0.866, y: 0.5 }, { x: 0, y: -1 }],
                bonds: 2, lones: 1
            },
            // 4 domains — Tetrahedral
            '4-0': {
                domains: [
                    { x: 0, y: -1 },
                    { x: -0.87, y: 0.5 },
                    { x: 0.87, y: 0.5 },
                    { x: 0, y: 0.35, behind: true }
                ],
                bonds: 4, lones: 0
            },
            // 4 domains, 1 LP — Trigonal Pyramidal
            '3-1': {
                domains: [
                    { x: -0.87, y: 0.5 },
                    { x: 0.87, y: 0.5 },
                    { x: 0, y: 0.35, behind: true },
                    { x: 0, y: -1 }
                ],
                bonds: 3, lones: 1
            },
            // 4 domains, 2 LP — Bent (~104.5)
            '2-2': {
                domains: [
                    { x: -0.82, y: 0.38 },
                    { x: 0.82, y: 0.38 },
                    { x: -0.38, y: -0.85 },
                    { x: 0.38, y: -0.85 }
                ],
                bonds: 2, lones: 2
            },
            // 5 domains — Trigonal Bipyramidal
            '5-0': {
                domains: [
                    { x: 0, y: -1.1 },
                    { x: -1, y: 0 },
                    { x: 0.5, y: -0.15, behind: true },
                    { x: 0.5, y: 0.15, behind: true },
                    { x: 0, y: 1.1 }
                ],
                bonds: 5, lones: 0
            },
            // 5 domains, 1 LP — Seesaw
            '4-1': {
                domains: [
                    { x: 0, y: -1.1 },
                    { x: -1, y: 0 },
                    { x: 0, y: 1.1 },
                    { x: 0.5, y: -0.15, behind: true },
                    { x: 0.85, y: 0 }
                ],
                bonds: 4, lones: 1
            },
            // 5 domains, 2 LP — T-shaped
            '3-2': {
                domains: [
                    { x: 0, y: -1.1 },
                    { x: -1, y: 0 },
                    { x: 0, y: 1.1 },
                    { x: 0.75, y: -0.35 },
                    { x: 0.75, y: 0.35 }
                ],
                bonds: 3, lones: 2
            },
            // 5 domains, 3 LP — Linear
            '2-3': {
                domains: [
                    { x: 0, y: -1.1 },
                    { x: 0, y: 1.1 },
                    { x: -1, y: 0 },
                    { x: 0.55, y: -0.35 },
                    { x: 0.55, y: 0.35 }
                ],
                bonds: 2, lones: 3
            },
            // 6 domains — Octahedral
            '6-0': {
                domains: [
                    { x: 0, y: -1 },
                    { x: 1, y: 0 },
                    { x: 0, y: 1 },
                    { x: -1, y: 0 },
                    { x: 0.55, y: -0.55, behind: true },
                    { x: -0.55, y: 0.55, behind: true }
                ],
                bonds: 6, lones: 0
            },
            // 6 domains, 1 LP — Square Pyramidal
            '5-1': {
                domains: [
                    { x: 0, y: -1 },
                    { x: 0.85, y: 0.15 },
                    { x: 0, y: 0.85 },
                    { x: -0.85, y: 0.15 },
                    { x: 0.5, y: -0.5, behind: true },
                    { x: -0.55, y: 0.65 }
                ],
                bonds: 5, lones: 1
            },
            // 6 domains, 2 LP — Square Planar
            '4-2': {
                domains: [
                    { x: 0, y: -1 },
                    { x: 1, y: 0 },
                    { x: 0, y: 1 },
                    { x: -1, y: 0 },
                    { x: 0.6, y: -0.6 },
                    { x: -0.6, y: 0.6 }
                ],
                bonds: 4, lones: 2
            }
        };
    }

    // ----------------------------------------------------------------
    // PUBLIC: generate HTML for the inspector panel
    // ----------------------------------------------------------------
    render(vseprData, molecule, engine) {
        if (!vseprData) return '';
        const key = `${vseprData.bondingPairs}-${vseprData.lonePairs}`;
        const layout = this.layouts[key];
        if (!layout) return '';

        // Gather bonded atoms FIRST — needed for correct cache key
        // Filter bonds to only those within the current molecule
        const centralAtom = engine.atoms.find(a =>
            a.element.symbol === vseprData.centralAtom &&
            molecule.atomIds.includes(a.id)
        );
        const bondedAtoms = [];
        if (centralAtom) {
            engine.bonds.forEach(b => {
                if (b.a1.id === centralAtom.id && molecule.atomIds.includes(b.a2.id)) {
                    bondedAtoms.push(b.a2);
                } else if (b.a2.id === centralAtom.id && molecule.atomIds.includes(b.a1.id)) {
                    bondedAtoms.push(b.a1);
                }
            });
        }

        // Cache key includes actual bonded atom symbols so different molecules
        // with the same geometry pattern (e.g. H2O vs LiOH) get unique SVGs
        const bondedKey = bondedAtoms.map(a => a.element.symbol).sort().join(',');
        const cacheKey = `${key}-${vseprData.centralAtom}-${bondedKey}`;
        if (this._cacheKey === cacheKey && this._cachedHTML) {
            return this._cachedHTML;
        }

        let html = '<div class="vsepr-visual-wrap">';
        html += this._svg(layout, vseprData, centralAtom, bondedAtoms);

        html += this._labels(vseprData);
        html += '</div>';

        this._currentVseprData = vseprData;
        this._cacheKey = cacheKey;
        this._cachedHTML = html;
        return html;
    }

    // ----------------------------------------------------------------
    // SVG BUILDER
    // ----------------------------------------------------------------
    _svg(layout, data, centralAtom, bondedAtoms) {
        const { W, H, CX, CY, R, ATOM_R, CENTER_R, ARC_R } = this;
        const id = 'vv'; // short prefix for ids
        let s = `<svg viewBox="0 0 ${W} ${H}" class="w-full" style="max-height:210px">`;

        // Defs
        s += `<defs>
            <radialGradient id="${id}-lpg">
                <stop offset="0%" stop-color="#fbbf24" stop-opacity="0.7"/>
                <stop offset="70%" stop-color="#f59e0b" stop-opacity="0.25"/>
                <stop offset="100%" stop-color="#f59e0b" stop-opacity="0"/>
            </radialGradient>
            <filter id="${id}-gl"><feGaussianBlur stdDeviation="2.5" result="b"/>
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="${id}-sh"><feDropShadow dx="0" dy="1" stdDeviation="2" flood-color="#000" flood-opacity="0.4"/></filter>
        </defs>`;

        // Faint outer circle
        s += `<circle cx="${CX}" cy="${CY}" r="${R + 22}" fill="none" stroke="rgba(100,116,139,0.12)" stroke-width="1" stroke-dasharray="4,4"/>`;

        // --- Lone pair lobes (behind everything) ---
        for (let i = layout.bonds; i < layout.domains.length; i++) {
            const d = layout.domains[i];
            const dist = R * 0.52;
            const lx = CX + d.x * dist;
            const ly = CY + d.y * dist;
            const ang = Math.atan2(d.y, d.x) * 180 / Math.PI;
            const perpX = -Math.sin(ang * Math.PI / 180) * 4.5;
            const perpY = Math.cos(ang * Math.PI / 180) * 4.5;

            s += `<g class="vsepr-lp" style="transition:opacity 0.6s ease">`;
            s += `<ellipse cx="${lx}" cy="${ly}" rx="11" ry="20"
                fill="url(#${id}-lpg)" transform="rotate(${ang + 90},${lx},${ly})"
                filter="url(#${id}-gl)"/>`;
            s += `<circle cx="${lx + perpX}" cy="${ly + perpY}" r="2" fill="#fbbf24" opacity="0.85"/>`;
            s += `<circle cx="${lx - perpX}" cy="${ly - perpY}" r="2" fill="#fbbf24" opacity="0.85"/>`;
            const lblD = R * 0.8;
            const llx = CX + d.x * lblD;
            const lly = CY + d.y * lblD;
            s += `<text x="${llx}" y="${lly}" text-anchor="middle" dominant-baseline="central"
                fill="#fbbf24" font-size="8" font-weight="700" opacity="0.55" font-family="system-ui">LP</text>`;
            s += `</g>`;
        }

        // --- Angle arc between first two bonds ---
        if (layout.bonds >= 2 && data.bondAngle) {
            s += this._arc(layout.domains[0], layout.domains[1], data.bondAngle, CX, CY, ARC_R);
        }

        // --- Bond lines ---
        for (let i = 0; i < layout.bonds; i++) {
            const d = layout.domains[i];
            const ex = CX + d.x * R;
            const ey = CY + d.y * R;
            const dash = d.behind;
            s += `<line x1="${CX}" y1="${CY}" x2="${ex}" y2="${ey}"
                stroke="${dash ? '#818cf8' : '#6366f1'}" stroke-width="${dash ? 2.5 : 3.5}"
                ${dash ? 'stroke-dasharray="5,3"' : ''} opacity="${dash ? 0.45 : 0.85}"
                stroke-linecap="round"/>`;
        }

        // --- Central atom ---
        const cc = centralAtom ? `#${centralAtom.element.cpk_hex || '475569'}` : '#6366f1';
        s += `<circle cx="${CX}" cy="${CY}" r="${CENTER_R}" fill="${cc}"
            stroke="rgba(255,255,255,0.3)" stroke-width="1.5" filter="url(#${id}-sh)"/>`;
        s += `<text x="${CX}" y="${CY}" text-anchor="middle" dominant-baseline="central"
            fill="white" font-size="13" font-weight="800" font-family="system-ui"
            style="text-shadow:0 1px 2px rgba(0,0,0,0.5)">${data.centralAtom}</text>`;

        // --- Terminal atoms ---
        for (let i = 0; i < layout.bonds; i++) {
            const d = layout.domains[i];
            const ex = CX + d.x * R;
            const ey = CY + d.y * R;
            const a = bondedAtoms[i];
            const sym = (a && a.element) ? a.element.symbol : '?';
            const col = (a && a.element) ? `#${a.element.cpk_hex || '6366f1'}` : '#6366f1';
            const beh = d.behind;
            const op = beh ? 0.5 : 0.92;
            const r = beh ? ATOM_R * 0.78 : ATOM_R;
            s += `<circle cx="${ex}" cy="${ey}" r="${r}" fill="${col}"
                stroke="rgba(255,255,255,0.2)" stroke-width="1" opacity="${op}" filter="url(#${id}-sh)"/>`;
            s += `<text x="${ex}" y="${ey}" text-anchor="middle" dominant-baseline="central"
                fill="white" font-size="${beh ? 9 : 11}" font-weight="700" opacity="${op}"
                font-family="system-ui">${sym}</text>`;
        }

        s += '</svg>';
        return s;
    }

    // ----------------------------------------------------------------
    // ANGLE ARC
    // ----------------------------------------------------------------
    _arc(d1, d2, angle, cx, cy, r) {
        const a1 = Math.atan2(d1.y, d1.x);
        const a2 = Math.atan2(d2.y, d2.x);
        let start = a1, end = a2;
        let diff = end - start;
        while (diff < -Math.PI) diff += 2 * Math.PI;
        while (diff > Math.PI) diff -= 2 * Math.PI;
        if (diff < 0) { [start, end] = [end, start]; diff = -diff; }

        const sx = cx + Math.cos(start) * r;
        const sy = cy + Math.sin(start) * r;
        const ex = cx + Math.cos(end) * r;
        const ey = cy + Math.sin(end) * r;
        const large = diff > Math.PI ? 1 : 0;

        let s = `<path d="M ${sx.toFixed(1)} ${sy.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${ex.toFixed(1)} ${ey.toFixed(1)}"
            fill="none" stroke="#22c55e" stroke-width="1.5" opacity="0.6" stroke-dasharray="3,2"/>`;

        const mid = start + diff / 2;
        const lr = r + 12;
        const lx = cx + Math.cos(mid) * lr;
        const ly = cy + Math.sin(mid) * lr;
        s += `<text x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" text-anchor="middle" dominant-baseline="central"
            fill="#22c55e" font-size="9" font-weight="700" font-family="system-ui">${angle}\u00B0</text>`;
        return s;
    }

    // ----------------------------------------------------------------
    // LABELS
    // ----------------------------------------------------------------
    _labels(data) {
        const lp = data.lonePairs > 0;
        let h = '<div class="text-center mt-2 space-y-1">';
        h += `<div id="vsepr-vis-elabel" class="text-[10px] font-bold text-slate-400 transition-all duration-500">`;
        h += `Electron: <span class="text-indigo-400">${data.electronGeometry}</span>`;
        if (lp) h += ` <span class="text-slate-600 mx-1">\u2192</span> Molecular: <span class="text-blue-400">${data.molecularGeometry}</span>`;
        h += `</div>`;
        if (!lp) {
            h += `<div class="text-[9px] text-slate-600">No lone pairs \u2014 electron & molecular geometry identical</div>`;
        } else {
            h += `<div id="vsepr-vis-expl" class="text-[9px] text-slate-500 transition-all duration-500">${data.lonePairs} lone pair${data.lonePairs > 1 ? 's' : ''} push bonding pairs \u2192 ${data.molecularGeometry.toLowerCase()}</div>`;
        }
        h += '</div>';
        return h;
    }

}

window.vsepVisual = new VSEPRVisual();
console.log('VSEPR Visual Renderer loaded');
