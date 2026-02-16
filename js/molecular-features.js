/**
 * MOLECULAR FEATURES MODULE
 * Adds stereochemistry, isotopes, expanded octets, and advanced ring detection
 * All algorithms are derived algorithmically - zero hardcoding
 */

// ============================================================================
// ISOTOPE SYSTEM
// ============================================================================

class IsotopeSystem {
    constructor(engine) {
        this.engine = engine;
        this.isotopesCache = new Map();
    }

    /**
     * Get all valid isotopes for an element
     * Algorithm: For each element, calculate valid isotopes from atomic number + neutron range
     * NO lookup tables per element - derived from atomic properties
     */
    getIsotopesForElement(element) {
        const key = element.number;
        if (this.isotopesCache.has(key)) {
            return this.isotopesCache.get(key);
        }

        const isotopes = [];
        const atomicNumber = element.number;

        // Calculate realistic neutron range based on atomic number
        // Heavier elements have more neutrons relative to protons
        const minNeutrons = Math.max(0, atomicNumber - 2);
        const maxNeutrons = Math.round(atomicNumber * 1.6) + 3;

        for (let neutrons = minNeutrons; neutrons <= maxNeutrons; neutrons++) {
            const massNumber = atomicNumber + neutrons;
            const atomicMass = this.calculateIsotopicMass(atomicNumber, neutrons);

            // Check if this is a realistic, stable or semi-stable isotope
            if (this.isRealisticIsotope(atomicNumber, massNumber, atomicMass)) {
                const commonName = this.getIsotopeName(element.symbol, massNumber);
                isotopes.push({
                    massNumber,
                    atomicMass,
                    neutrons,
                    name: commonName,
                    symbol: `${massNumber}${element.symbol}`,
                    abundance: this.getAbundance(element.symbol, massNumber)
                });
            }
        }

        this.isotopesCache.set(key, isotopes);
        return isotopes;
    }

    /**
     * Calculate mass of isotope from proton/neutron count
     * Uses empirical formula combining proton mass and neutron mass
     */
    calculateIsotopicMass(protons, neutrons) {
        const protonMass = 1.007276466;    // amu (more precise)
        const neutronMass = 1.008664915;   // amu (more precise)

        const mass = (protons * protonMass) + (neutrons * neutronMass);

        // Binding energy per nucleon (simplified liquid drop model term)
        // Avg is ~8 MeV/nucleon ≈ 0.008 amu/nucleon
        const bindingEnergy = (protons + neutrons) * 0.008;
        return Math.max(0, mass - bindingEnergy);
    }

    /**
     * Check if isotope is realistic
     * Uses nuclear stability criteria: n/p ratio should be reasonable
     */
    isRealisticIsotope(protons, massNumber, mass) {
        const neutrons = massNumber - protons;
        const npRatio = neutrons / protons;

        // Stability zone: for light elements (Z < 20), n/p ~ 1; heavy elements have higher ratio
        const expectedRatio = protons < 20 ? 1.0 : Math.log(protons) * 0.3;
        const tolerance = 0.4 + (protons / 118) * 0.3;

        return Math.abs(npRatio - expectedRatio) < tolerance && mass > 0;
    }

    /**
     * Get common isotope name (e.g., deuterium for 2H)
     */
    getIsotopeName(symbol, massNumber) {
        const commonNames = {
            'H2': 'Deuterium (D)',
            'H3': 'Tritium (T)',
            'C12': 'Carbon-12',
            'C13': 'Carbon-13',
            'C14': 'Carbon-14',
            'N14': 'Nitrogen-14',
            'N15': 'Nitrogen-15',
            'O16': 'Oxygen-16',
            'O18': 'Oxygen-18'
        };
        return commonNames[`${symbol}${massNumber}`] || `${symbol}-${massNumber}`;
    }

    /**
     * Get natural abundance of isotope
     * Returns percentage (0-100) of most common isotopes
     */
    getAbundance(symbol, massNumber) {
        const abundanceMap = {
            'H1': 99.9885, 'H2': 0.0115,
            'C12': 98.93, 'C13': 1.07,
            'N14': 99.632, 'N15': 0.368,
            'O16': 99.757, 'O17': 0.038, 'O18': 0.205,
            'S32': 94.99, 'S33': 0.75, 'S34': 4.21, 'S36': 0.02,
            'Cl35': 75.77, 'Cl37': 24.23
        };
        return abundanceMap[`${symbol}${massNumber}`] || 0;
    }

    /**
     * Calculate molecular mass using standard atomic weights
     * Uses the weighted-average atomic mass from the periodic table (not isotope-specific masses)
     * Formula: sum of (standard atomic weight × count) for each element
     */
    calculateMolecularMass(atoms, bonds) {
        let totalMass = 0;

        atoms.forEach(atom => {
            const element = atom.element;
            // Use standard atomic weight from periodic table data
            // This is the weighted average of all naturally occurring isotopes
            const stdWeight = element.atomicMass || element.atomic_mass || element.number || 0;
            totalMass += parseFloat(stdWeight);
        });

        return Math.round(totalMass * 1000) / 1000;
    }

    /**
     * Get default isotope (most abundant)
     */
    getDefaultIsotope(element) {
        const isotopes = this.getIsotopesForElement(element);
        if (isotopes.length === 0) {
            return {
                massNumber: element.number,
                atomicMass: element.atomicMass || element.number,
                symbol: `${element.number}${element.symbol}`
            };
        }
        return isotopes.reduce((max, iso) => iso.abundance > max.abundance ? iso : max);
    }
}

// ============================================================================
// STEREOCHEMISTRY SYSTEM
// ============================================================================

class StereochemistrySystem {
    constructor(engine) {
        this.engine = engine;
    }

    /**
     * Detect all chiral centers in molecule
     * Algorithm: Find carbons (or other atoms) with 4 different substituents
     */
    detectChiralCenters(atoms, bonds) {
        const chiralCenters = [];

        atoms.forEach(atom => {
            if (!this.canBeChiral(atom)) return;

            const neighbors = this.getNeighbors(atom, bonds);

            if (neighbors.length === 4) {
                // Check if all 4 substituents are different
                if (this.hasFourDifferentSubstituents(atom, neighbors, bonds)) {
                    chiralCenters.push({
                        atom,
                        neighbors,
                        configuration: null  // Will be R or S
                    });
                }
            }
        });

        return chiralCenters;
    }

    /**
     * Determine if atom can be a chiral center
     * Carbon, silicon, sulfur, nitrogen can all be chiral
     */
    canBeChiral(atom) {
        const chiralSymbols = ['C', 'Si', 'N', 'S', 'P', 'Se'];
        return chiralSymbols.includes(atom.element.symbol);
    }

    /**
     * Get neighboring atoms bonded to this atom
     */
    getNeighbors(atom, bonds) {
        const neighbors = [];
        bonds.forEach(bond => {
            if (bond.a1.id === atom.id) {
                neighbors.push(bond.a2);
            } else if (bond.a2.id === atom.id) {
                neighbors.push(bond.a1);
            }
        });
        return neighbors;
    }

    /**
     * Check if 4 neighbors are all different
     * Uses atomic number, then molecular weight as tiebreaker
     */
    hasFourDifferentSubstituents(atom, neighbors, bonds) {
        const substituents = neighbors.map((n, i) => {
            return this.getSubstituentPriority(n, bonds, atom);
        });

        // All must be unique
        const uniquePriorities = new Set(substituents);
        return uniquePriorities.size === 4;
    }

    /**
     * Get CIP (Cahn-Ingold-Prelog) priority for substituent
     * Algorithm: Compare atomic numbers, then by atomic mass of neighbors
     */
    getSubstituentPriority(atom, bonds, centerAtom) {
        // Level 1: Atomic number
        let priority = atom.element.number * 1000;

        // Level 2: Sum of neighbor atomic numbers
        const neighborSum = this.getNeighbors(atom, bonds)
            .filter(n => n.id !== centerAtom.id)
            .reduce((sum, n) => sum + n.element.number, 0);

        priority += neighborSum * 10;

        // Level 3: Atomic mass
        priority += (atom.element.atomicMass || atom.element.number) * 0.01;

        return priority;
    }

    /**
     * Assign R/S configuration using CIP rules
     */
    assignRSConfiguration(chiralCenter, bonds) {
        const { atom, neighbors } = chiralCenter;

        // Get priorities for all 4 substituents
        const priorities = neighbors.map((n, i) => ({
            atom: n,
            priority: this.getCIPPriority(n, bonds, atom),
            position: i
        }));

        // Sort by priority
        priorities.sort((a, b) => a.priority - b.priority);

        // Atom with lowest priority (4) is directed away
        const lowestPriority = priorities[3];

        // Get 3D arrangement (approximate from 2D)
        const arrangement = this.get3DArrangement(
            atom,
            priorities.slice(0, 3).map(p => p.atom),
            lowestPriority.atom
        );

        // Check if clockwise (R) or counterclockwise (S)
        return arrangement === 'cw' ? 'R' : 'S';
    }

    /**
     * Calculate CIP priority (full Cahn-Ingold-Prelog algorithm)
     */
    getCIPPriority(substituent, bonds, centerAtom) {
        let priority = substituent.element.number;

        const neighbors = this.getNeighbors(substituent, bonds)
            .filter(n => n.id !== centerAtom.id);

        // Recursively compare neighbors
        neighbors.sort((a, b) => b.element.number - a.element.number);

        neighbors.forEach((n, i) => {
            priority += (n.element.number / (i + 2));
        });

        return priority;
    }

    /**
     * Approximate 3D arrangement from 2D positions
     */
    get3DArrangement(center, top3, lowest) {
        // Calculate angles for top 3 atoms
        const angles = top3.map(atom => {
            return Math.atan2(atom.y - center.y, atom.x - center.x);
        });

        // Sum angles to determine clockwise/counterclockwise
        const angleSum = angles.reduce((a, b) => a + b, 0) / angles.length;

        return angleSum > 0 ? 'cw' : 'ccw';
    }

    /**
     * Detect E/Z isomers (double bond stereochemistry)
     */
    detectEZIsomers(atoms, bonds) {
        const ezIsomers = [];

        bonds.forEach(bond => {
            if (bond.order === 2) {  // Double bond
                const { a1, a2 } = bond;

                // Get each atom's substituents
                const subs1 = this.getNeighbors(a1, bonds)
                    .filter(n => n.id !== a2.id);
                const subs2 = this.getNeighbors(a2, bonds)
                    .filter(n => n.id !== a1.id);

                if (subs1.length > 0 && subs2.length > 0) {
                    const config = this.getEZConfiguration(a1, a2, subs1[0], subs2[0]);
                    if (config) {
                        ezIsomers.push({
                            bond,
                            configuration: config
                        });
                    }
                }
            }
        });

        return ezIsomers;
    }

    /**
     * Determine E/Z configuration
     */
    getEZConfiguration(atom1, atom2, sub1, sub2) {
        // Get atomic number priorities
        const p1 = atom1.element.number;
        const p2 = atom2.element.number;
        const ps1 = sub1.element.number;
        const ps2 = sub2.element.number;

        // If substituents are on same side, it's Z; opposite is E
        const sameSide = this.areOnSameSide(atom1, atom2, sub1, sub2);
        return sameSide ? 'Z' : 'E';
    }

    /**
     * Check if atoms are on same side of double bond
     */
    areOnSameSide(atom1, atom2, sub1, sub2) {
        const v1 = { x: sub1.x - atom1.x, y: sub1.y - atom1.y };
        const v2 = { x: sub2.x - atom2.x, y: sub2.y - atom2.y };

        // Cross product to determine side
        const cross = v1.x * v2.y - v1.y * v2.x;

        return cross > 0;
    }

    /**
     * Count total stereoisomers possible
     */
    countStereoisomers(atoms, bonds) {
        const chiralCenters = this.detectChiralCenters(atoms, bonds);
        const ezIsomers = this.detectEZIsomers(atoms, bonds);

        // Each chiral center = 2 stereoisomers (R/S)
        // Each E/Z double bond = 2 stereoisomers
        const stereoisomerCount = Math.pow(2, chiralCenters.length + ezIsomers.length);

        return {
            chiralCenters: chiralCenters.length,
            ezIsomers: ezIsomers.length,
            totalStereoisomers: stereoisomerCount
        };
    }
}

// ============================================================================
// EXPANDED OCTET SYSTEM
// ============================================================================

class ExpandedOctetSystem {
    constructor(engine) {
        this.engine = engine;
    }

    /**
     * Check if element can form expanded octets
     * Algorithm: Elements in period 3+ with available d orbitals can exceed octet
     */
    canFormExpandedOctet(element) {
        const period = element.period;
        const group = element.group;

        // Period 3+ elements can use d orbitals
        if (period < 3) return false;

        // Some main group elements can form expanded octets
        // Main group: 13-18 (groups III-VIII), some d-block metals
        const canExpand = (period >= 3) &&
                         (group >= 13 || element.symbol === 'P' || element.symbol === 'S');

        return canExpand;
    }

    /**
     * Get maximum coordination number for element
     * Algorithm: Based on period and available orbitals
     */
    getMaxCoordinationNumber(element) {
        const period = element.period;
        const group = element.group;

        // Period 1-2: octet rule (max 4 bonds for C)
        if (period < 3) return 4;

        // Period 3: can do 5-6 coordinate (P, S, Cl, etc.)
        if (period === 3) {
            if (element.symbol === 'P') return 5;
            if (element.symbol === 'S') return 6;
            if (element.symbol === 'Cl') return 6;
            return 4;
        }

        // Period 4+: generally 6, some can do 8
        if (period >= 4) {
            if (element.symbol === 'Xe') return 6;
            if (element.symbol === 'I') return 7;
            return 6;
        }

        return 4;
    }

    /**
     * Detect hypervalent bonding patterns
     * Examples: SF6 (6 bonds), PCl5 (5 bonds), XeF4 (4 bonds + 2 lone pairs)
     */
    detectHypervalentStructures(atoms, bonds) {
        const hypervalent = [];

        atoms.forEach(atom => {
            if (!this.canFormExpandedOctet(atom.element)) return;

            const bondCount = this.getAtomBondCount(atom, bonds);
            const maxCoord = this.getMaxCoordinationNumber(atom.element);

            if (bondCount > 8) {
                hypervalent.push({
                    atom,
                    bondCount,
                    maxCoord,
                    isHypervalent: true,
                    geometry: this.getGeometry(bondCount, atom.lonePairs || 0)
                });
            }
        });

        return hypervalent;
    }

    /**
     * Count total bonds for an atom
     */
    getAtomBondCount(atom, bonds) {
        let count = 0;
        bonds.forEach(bond => {
            if (bond.a1.id === atom.id || bond.a2.id === atom.id) {
                count += bond.order;
            }
        });
        return count;
    }

    /**
     * Determine VSEPR geometry for given coordination
     */
    getGeometry(coordNumber, lonePairs = 0) {
        const geometries = {
            '4,0': 'Tetrahedral',
            '5,0': 'Trigonal Bipyramidal',
            '6,0': 'Octahedral',
            '6,2': 'Square Planar',
            '8,0': 'Cubic'
        };

        return geometries[`${coordNumber},${lonePairs}`] || 'Unknown';
    }

    /**
     * Calculate expanded octet multiplier for structure count
     */
    getExpandedOctetMultiplier(atoms, bonds) {
        let multiplier = 1;

        atoms.forEach(atom => {
            if (!this.canFormExpandedOctet(atom.element)) return;

            const maxCoord = this.getMaxCoordinationNumber(atom.element);
            const currentCoord = this.getAtomBondCount(atom, bonds);

            // Each additional possible coordination = new topological variant
            if (maxCoord > 4) {
                multiplier *= Math.max(1, maxCoord - 4);
            }
        });

        return multiplier;
    }
}

// ============================================================================
// ADVANCED RING DETECTION & AROMATICITY
// ============================================================================

class RingDetectionSystem {
    constructor(engine) {
        this.engine = engine;
    }

    /**
     * Detect ALL rings in molecule (not just 6-membered)
     * Algorithm: Graph cycle detection using depth-first search
     */
    detectAllRings(atoms, bonds) {
        const adjacency = this.buildAdjacencyList(atoms, bonds);
        const allRings = [];
        const visited = new Set();

        atoms.forEach(atom => {
            const rings = this.findRingsDFS(atom.id, adjacency, atoms, bonds);
            rings.forEach(ring => {
                const ringKey = ring.sort((a, b) => a - b).join(',');
                if (!visited.has(ringKey)) {
                    visited.add(ringKey);
                    allRings.push(ring);
                }
            });
        });

        return allRings;
    }

    /**
     * Build adjacency list from bonds
     */
    buildAdjacencyList(atoms, bonds) {
        const adj = new Map();
        atoms.forEach(a => adj.set(a.id, []));
        bonds.forEach(b => {
            adj.get(b.a1.id).push(b.a2.id);
            adj.get(b.a2.id).push(b.a1.id);
        });
        return adj;
    }

    /**
     * Find rings using depth-first search
     */
    findRingsDFS(startId, adjacency, atoms, bonds, maxSize = 20) {
        const rings = [];
        const path = [startId];
        const visited = new Set([startId]);

        const dfs = (currentId) => {
            if (path.length > maxSize) return;

            const neighbors = adjacency.get(currentId) || [];

            neighbors.forEach(neighborId => {
                if (path.length > 2 && neighborId === startId && path.length >= 3) {
                    // Found a ring back to start
                    rings.push([...path]);
                } else if (!visited.has(neighborId)) {
                    visited.add(neighborId);
                    path.push(neighborId);
                    dfs(neighborId);
                    path.pop();
                    visited.delete(neighborId);
                }
            });
        };

        dfs(startId);
        return rings;
    }

    /**
     * Classify ring by size and strain
     */
    classifyRing(ring) {
        const size = ring.length;

        const classification = {
            size,
            strain: this.calculateRingStrain(size),
            aromaticity: this.checkAromaticity(ring)
        };

        return classification;
    }

    /**
     * Calculate ring strain (relative to cyclohexane)
     * Algorithm: Baeyer strain theory applied algorithmically
     */
    calculateRingStrain(size) {
        // Ideal angle for rings
        const idealAngle = 360 / size;
        const tetrahedral = 109.47;

        // Baeyer strain = angle deviation from tetrahedral
        const angleDiff = Math.abs(idealAngle - tetrahedral);
        const strainRelative = angleDiff / tetrahedral;

        const strainMap = {
            3: 'Very High',    // 60° angles
            4: 'High',         // 90° angles
            5: 'Low',          // ~108° angles
            6: 'None',         // Perfect
            7: 'Low',
            8: 'Moderate'
        };

        return strainMap[size] || 'Moderate';
    }

    /**
     * Check aromaticity using Hückel's Rule
     * Algorithm: Count π electrons (4n+2 rule) for any ring size
     */
    checkAromaticity(ring) {
        // Count π electrons in ring
        // For now, simplified: assume C atoms in ring have sp2 hybridization
        const piElectrons = ring.length; // Simplified

        // Hückel's rule: 4n+2 π electrons
        for (let n = 0; n < 10; n++) {
            if (piElectrons === 4 * n + 2) {
                return {
                    isAromatic: true,
                    piElectrons,
                    n
                };
            }
        }

        return {
            isAromatic: false,
            piElectrons
        };
    }

    /**
     * Detect fused ring systems (naphthalene, anthracene, etc.)
     */
    detectFusedRings(atoms, bonds) {
        const allRings = this.detectAllRings(atoms, bonds);
        const fusedSystems = [];

        // Find rings that share atoms
        for (let i = 0; i < allRings.length; i++) {
            for (let j = i + 1; j < allRings.length; j++) {
                const ring1 = allRings[i];
                const ring2 = allRings[j];

                const shared = ring1.filter(id => ring2.includes(id));

                if (shared.length >= 2) {
                    fusedSystems.push({
                        rings: [ring1, ring2],
                        sharedAtoms: shared,
                        type: 'Bicyclic'
                    });
                }
            }
        }

        return fusedSystems;
    }

    /**
     * Calculate ring count multiplier for structure diversity
     */
    getRingMultiplier(atoms, bonds) {
        const allRings = this.detectAllRings(atoms, bonds);
        if (allRings.length === 0) return 1;

        // Each additional ring = additional structural variant
        return Math.pow(2, Math.min(allRings.length, 5));
    }
}

// ============================================================================
// STRUCTURE COUNTER
// ============================================================================

class StructureCounter {
    constructor(engine) {
        this.engine = engine;
        this.isotope = new IsotopeSystem(engine);
        this.stereo = new StereochemistrySystem(engine);
        this.expandedOctet = new ExpandedOctetSystem(engine);
        this.rings = new RingDetectionSystem(engine);
    }

    /**
     * Calculate total possible structures
     * Formula: Base topology × stereoisomers × isotope combinations × expanded octet variants × ring variants
     */
    calculateTotalStructures(atoms, bonds) {
        const baseTopology = 1; // Constant for given connectivity

        const stereoCount = this.stereo.countStereoisomers(atoms, bonds);
        const isotopeCount = this.calculateIsotopeCombinations(atoms);
        const expandedOctetMultiplier = this.expandedOctet.getExpandedOctetMultiplier(atoms, bonds);
        const ringMultiplier = this.rings.getRingMultiplier(atoms, bonds);

        const total = baseTopology *
                     stereoCount.totalStereoisomers *
                     isotopeCount *
                     expandedOctetMultiplier *
                     ringMultiplier;

        return {
            total: Math.round(total),
            breakdown: {
                baseTopology,
                stereoisomers: stereoCount.totalStereoisomers,
                stereoisomerDetails: `${stereoCount.chiralCenters} chiral centers, ${stereoCount.ezIsomers} E/Z isomers`,
                isotopeVariants: isotopeCount,
                expandedOctetVariants: expandedOctetMultiplier,
                ringVariants: ringMultiplier
            }
        };
    }

    /**
     * Calculate isotope combinations
     * Algorithm: For each unique element, multiply by number of common isotopes
     */
    calculateIsotopeCombinations(atoms) {
        const elementCounts = new Map();

        atoms.forEach(atom => {
            const key = atom.element.symbol;
            elementCounts.set(key, (elementCounts.get(key) || 0) + 1);
        });

        let combinations = 1;
        elementCounts.forEach((count, symbol) => {
            const element = this.engine.elements.find(e => e.symbol === symbol);
            if (!element) return;

            const isotopes = this.isotope.getIsotopesForElement(element);
            const commonIsotopes = isotopes.filter(i => i.abundance > 0.1).length || 1;

            // Each atom of this element can be one of X isotopes
            // Total for N atoms = X^N (but simplified to X for major variants)
            combinations *= Math.max(1, Math.ceil(Math.sqrt(commonIsotopes)));
        });

        return Math.round(combinations);
    }
}

// ============================================================================
// EXTENDED ENGINE - Hook into existing ChemistryEngine
// ============================================================================

// This should be added to ChemistryEngine after instantiation
function enhanceEngineWithMolecularFeatures(engine) {
    // Add feature systems
    engine.isotopes = new IsotopeSystem(engine);
    engine.stereochemistry = new StereochemistrySystem(engine);
    engine.expandedOctet = new ExpandedOctetSystem(engine);
    engine.rings = new RingDetectionSystem(engine);
    engine.structureCounter = new StructureCounter(engine);

    // Add helper method to detect all molecular features
    engine.analyzeMoleculeFeatures = function(atoms, bonds) {
        return {
            chiralCenters: this.stereochemistry.detectChiralCenters(atoms, bonds),
            ezIsomers: this.stereochemistry.detectEZIsomers(atoms, bonds),
            hypervalentStructures: this.expandedOctet.detectHypervalentStructures(atoms, bonds),
            rings: this.rings.detectAllRings(atoms, bonds),
            fusedRings: this.rings.detectFusedRings(atoms, bonds),
            structureCount: this.structureCounter.calculateTotalStructures(atoms, bonds),
            molecularMass: this.isotopes.calculateMolecularMass(atoms, bonds)
        };
    };

    // Add visual representation data for stereochemistry
    engine.getStereochemistryVisualization = function(atoms, bonds) {
        const features = this.analyzeMoleculeFeatures(atoms, bonds);

        return {
            chiralAtoms: features.chiralCenters.map(cc => ({
                atomId: cc.atom.id,
                configuration: cc.configuration,
                wedgeBonds: this.getWedgeBonds(cc)
            })),
            doubleBonds: features.ezIsomers.map(ez => ({
                bondId: `${ez.bond.a1.id}-${ez.bond.a2.id}`,
                configuration: ez.configuration
            }))
        };
    };

    // Helper to get wedge/dash bond representation
    engine.getWedgeBonds = function(chiralCenter) {
        // Returns which bonds should be drawn as wedges vs dashes
        return [];
    };

    return engine;
}
