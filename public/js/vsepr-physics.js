// ===================
// VSEPR DIRECT GEOMETRY POSITIONER
// ===================
// Positions atoms at mathematically exact VSEPR angles.
// No physics simulation — pure trigonometry from known bond angles.
// Works algorithmically for any molecule.

class VSEPRPhysics {
    constructor() {
        this.BOND_LENGTH = 72;
        this.LERP_SPEED = 0.10;

        // Ideal 2D bond directions for every VSEPR geometry.
        // Each entry: array of unit-vector directions for ALL electron domains.
        // First N entries = bonding pairs, remaining = lone pairs.
        // Angles are exact VSEPR values projected to 2D.
        this.idealDirections = this._buildIdealDirections();
    }

    _buildIdealDirections() {
        const dirs = {};
        const rad = (deg) => deg * Math.PI / 180;

        // Helper: produce unit vectors from an array of angles (degrees, 0° = right, CCW)
        const fromAngles = (angles) => angles.map(a => ({
            x: Math.cos(rad(a)),
            y: -Math.sin(rad(a))  // SVG y-axis is inverted
        }));

        // --- 2 electron domains ---
        // 2-0: Linear, 180°
        dirs['2-0'] = fromAngles([0, 180]);

        // --- 3 electron domains ---
        // 3-0: Trigonal Planar, 120° between bonds
        dirs['3-0'] = fromAngles([90, 210, 330]);
        // 2-1: Bent, 117° (LP at top)
        dirs['2-1'] = fromAngles([210 + 1.5, 330 - 1.5, 90]); // bonds first, then LP

        // --- 4 electron domains ---
        // Tetrahedral 2D projection: top, bottom-left, bottom-right, back
        // 4-0: Tetrahedral, 109.5° (2D projection)
        dirs['4-0'] = fromAngles([90, 210, 330, 270]);
        // 3-1: Trigonal Pyramidal, 107° (LP at top)
        dirs['3-1'] = fromAngles([210, 330, 270, 90]); // 3 bonds, 1 LP
        // 2-2: Bent, 104.5° (2 LP at top)
        const halfBent = 104.5 / 2;
        dirs['2-2'] = fromAngles([270 - halfBent, 270 + halfBent, 90 - 30, 90 + 30]);

        // --- 5 electron domains ---
        // 5-0: Trigonal Bipyramidal (axial top/bottom, 3 equatorial)
        dirs['5-0'] = fromAngles([90, 270, 0, 120, 240]); // axial + equatorial
        // 4-1: Seesaw (remove 1 equatorial LP)
        dirs['4-1'] = fromAngles([90, 270, 0, 240, 120]); // 4 bonds, 1 LP
        // 3-2: T-shaped (remove 2 equatorial LP)
        dirs['3-2'] = fromAngles([90, 270, 0, 120, 240]); // 3 bonds, 2 LP
        // 2-3: Linear (remove 3 equatorial LP)
        dirs['2-3'] = fromAngles([90, 270, 0, 120, 240]); // 2 bonds, 3 LP

        // --- 6 electron domains ---
        // 6-0: Octahedral
        dirs['6-0'] = fromAngles([90, 0, 270, 180, 45, 225]);
        // 5-1: Square Pyramidal (remove 1 LP)
        dirs['5-1'] = fromAngles([90, 0, 270, 180, 45, 225]);
        // 4-2: Square Planar (remove 2 trans LP)
        dirs['4-2'] = fromAngles([0, 90, 180, 270, 45, 225]);

        return dirs;
    }

    // ========================================================================
    // PUBLIC API
    // ========================================================================

    /**
     * Per-frame simulation: gently lerps atoms toward ideal VSEPR positions.
     * Called every frame in updateScene().
     */
    simulate(engine, draggingId) {
        if (!engine.molecules || !engine.bonds || engine.bonds.length === 0) return;

        engine.molecules.forEach(mol => {
            if (!mol.atomIds || mol.atomIds.length < 3) return;

            const atoms = mol.atomIds
                .map(id => engine.atoms.find(a => a.id === id))
                .filter(Boolean);

            if (atoms.length < 3) return;

            const processed = new Set();
            atoms.forEach(atom => {
                if (processed.has(atom.id)) return;
                const bondCount = this._bondCount(atom, engine);
                if (bondCount >= 2) {
                    processed.add(atom.id);
                    this._positionNeighbours(atom, engine, draggingId, this.LERP_SPEED);
                }
            });
        });
    }

    /**
     * Snap atoms to exact VSEPR positions (called by the VSEPR button).
     * Uses lerp=1.0 to place atoms at exact positions immediately.
     */
    snapToGeometry(engine) {
        if (!engine.molecules || !engine.bonds || engine.bonds.length === 0) return;

        engine.molecules.forEach(mol => {
            if (!mol.atomIds || mol.atomIds.length < 3) return;

            const atoms = mol.atomIds
                .map(id => engine.atoms.find(a => a.id === id))
                .filter(Boolean);

            if (atoms.length < 3) return;

            const processed = new Set();
            atoms.forEach(atom => {
                if (processed.has(atom.id)) return;
                const bondCount = this._bondCount(atom, engine);
                if (bondCount >= 2) {
                    processed.add(atom.id);
                    this._positionNeighbours(atom, engine, null, 1.0); // instant snap
                }
            });
        });
    }

    // ========================================================================
    // CORE POSITIONING
    // ========================================================================

    _positionNeighbours(center, engine, draggingId, lerp) {
        // Collect bonded neighbours
        const neighbours = [];
        engine.bonds.forEach(bond => {
            if (bond.a1.id === center.id) neighbours.push(bond.a2);
            else if (bond.a2.id === center.id) neighbours.push(bond.a1);
        });
        if (neighbours.length < 2) return;

        const lonePairs = center.lonePairs || 0;
        const key = `${neighbours.length}-${lonePairs}`;
        const directions = this.idealDirections[key];
        if (!directions) return;

        // Get only the bonding directions (first N entries)
        const bondDirs = directions.slice(0, neighbours.length);

        // Find optimal rotation to match current atom layout
        const rotation = this._findBestRotation(center, neighbours, bondDirs);

        // Apply rotation and position
        const cosR = Math.cos(rotation);
        const sinR = Math.sin(rotation);

        // When snapping (lerp=1.0), normalize all bond lengths to uniform distance.
        // During gentle lerp, preserve current distance to avoid jarring jumps.
        const isSnapping = lerp >= 1.0;

        for (let i = 0; i < neighbours.length; i++) {
            const atom = neighbours[i];
            if (atom.id === draggingId || center.id === draggingId) continue;

            // Find best matching direction for this atom
            const assignedDir = this._assignDirection(i, neighbours, bondDirs, center, rotation);

            // Rotate ideal direction
            const rx = assignedDir.x * cosR - assignedDir.y * sinR;
            const ry = assignedDir.x * sinR + assignedDir.y * cosR;

            // Compute bond length
            let bondLen;
            if (isSnapping) {
                // Normalize: use uniform BOND_LENGTH for clean geometry
                bondLen = this.BOND_LENGTH;
            } else {
                // Preserve current distance for smooth per-frame lerp
                const dx = atom.x - center.x;
                const dy = atom.y - center.y;
                const currentDist = Math.sqrt(dx * dx + dy * dy);
                bondLen = currentDist > 10 ? currentDist : this.BOND_LENGTH;
            }

            const targetX = center.x + rx * bondLen;
            const targetY = center.y + ry * bondLen;

            atom.x += (targetX - atom.x) * lerp;
            atom.y += (targetY - atom.y) * lerp;
        }
    }

    // ========================================================================
    // ROTATION & ASSIGNMENT
    // ========================================================================

    /**
     * Find the 2D rotation that best aligns ideal directions with current positions.
     * Tests every 3° and picks the one minimizing angular deviation.
     */
    _findBestRotation(center, neighbours, bondDirs) {
        const curAngles = neighbours.map(a =>
            Math.atan2(a.y - center.y, a.x - center.x)
        );

        let bestRot = 0;
        let bestCost = Infinity;
        const step = 3 * Math.PI / 180;
        const steps = Math.ceil(2 * Math.PI / step);

        for (let s = 0; s < steps; s++) {
            const rot = s * step;
            let cost = 0;
            const used = new Set();

            for (let i = 0; i < curAngles.length; i++) {
                let bestDiff = Infinity;
                let bestJ = 0;

                for (let j = 0; j < bondDirs.length; j++) {
                    if (used.has(j)) continue;
                    const idealAngle = Math.atan2(
                        bondDirs[j].x * Math.sin(rot) + bondDirs[j].y * Math.cos(rot),
                        bondDirs[j].x * Math.cos(rot) - bondDirs[j].y * Math.sin(rot)
                    );
                    let diff = Math.abs(curAngles[i] - idealAngle);
                    if (diff > Math.PI) diff = 2 * Math.PI - diff;
                    if (diff < bestDiff) {
                        bestDiff = diff;
                        bestJ = j;
                    }
                }

                used.add(bestJ);
                cost += bestDiff;
            }

            if (cost < bestCost) {
                bestCost = cost;
                bestRot = rot;
            }
        }

        return bestRot;
    }

    /**
     * Assign the best direction for atom index i using greedy matching.
     */
    _assignDirection(atomIdx, neighbours, bondDirs, center, rotation) {
        const curAngles = neighbours.map(a =>
            Math.atan2(a.y - center.y, a.x - center.x)
        );

        const cosR = Math.cos(rotation);
        const sinR = Math.sin(rotation);

        // Compute rotated ideal angles
        const idealAngles = bondDirs.map(d =>
            Math.atan2(d.x * sinR + d.y * cosR, d.x * cosR - d.y * sinR)
        );

        // Greedy assignment
        const used = new Set();
        const assignments = new Array(neighbours.length);

        for (let i = 0; i < curAngles.length; i++) {
            let bestJ = 0;
            let bestDiff = Infinity;

            for (let j = 0; j < idealAngles.length; j++) {
                if (used.has(j)) continue;
                let diff = Math.abs(curAngles[i] - idealAngles[j]);
                if (diff > Math.PI) diff = 2 * Math.PI - diff;
                if (diff < bestDiff) {
                    bestDiff = diff;
                    bestJ = j;
                }
            }

            used.add(bestJ);
            assignments[i] = bestJ;
        }

        return bondDirs[assignments[atomIdx]];
    }

    // ========================================================================
    // HELPERS
    // ========================================================================

    _bondCount(atom, engine) {
        let count = 0;
        for (let i = 0; i < engine.bonds.length; i++) {
            const b = engine.bonds[i];
            if (b.a1.id === atom.id || b.a2.id === atom.id) count++;
        }
        return count;
    }
}

// --- Global singleton ---
window.vsepPhysics = new VSEPRPhysics();
console.log('VSEPR Direct Geometry Positioner loaded');
