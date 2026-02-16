const PERIODIC_TABLE_API = 'https://raw.githubusercontent.com/Bowserinator/Periodic-Table-JSON/master/PeriodicTableJSON.json';

class ChemistryEngine {
    constructor() {
        this.elements = [];
        this.atoms = [];
        this.bonds = [];
        this.molecules = [];
        this.temperature = 298; // Kelvin
        this.pressure = 1.0;    // atm
        this.pubChemCache = {};
        
        // IUPAC numerical prefixes for covalent compounds
        this.covalentPrefixes = {
            1: 'mono', 2: 'di', 3: 'tri', 4: 'tetra', 5: 'penta',
            6: 'hexa', 7: 'hepta', 8: 'octa', 9: 'nona', 10: 'deca'
        };
        
        // Common anion name endings
        this.anionSuffixes = {
            'O': 'oxide', 'H': 'hydride', 'N': 'nitride', 'P': 'phosphide',
            'S': 'sulfide', 'C': 'carbide', 'F': 'fluoride', 'Cl': 'chloride',
            'Br': 'bromide', 'I': 'iodide', 'Se': 'selenide', 'Te': 'telluride'
        };
    }

    async init() {
        try {
            const response = await fetch(PERIODIC_TABLE_API);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            this.elements = data.elements;
            return this.elements;
        } catch (error) {
            console.error('Failed to load elements from API:', error);
            if (typeof ELEMENTS_DATA !== 'undefined') {
                this.elements = ELEMENTS_DATA.map(el => ({
                    ...el,
                    number: el.atomicNumber,
                    shells: el.electronConfiguration ? [el.valenceElectrons] : [0]
                }));
                return this.elements;
            }
            return [];
        }
    }

    // ============================================================================
    // ELEMENT CLASSIFICATION
    // ============================================================================
    
    getElectronegativity(element) {
        return element.electronegativity_pauling || 2.1;
    }
    
    isMetal(element) {
        const cat = (element.category || '').toLowerCase();
        // Must contain "metal" but exclude "nonmetal" and "metalloid"
        return cat.includes('metal') && !cat.includes('nonmetal') && !cat.includes('metalloid');
    }
    
    isNonMetal(element) {
        const cat = (element.category || '').toLowerCase();
        return cat.includes('nonmetal') || cat.includes('halogen') || cat.includes('noble gas');
    }
    
    isMetalloid(element) {
        const cat = (element.category || '').toLowerCase();
        return cat.includes('metalloid');
    }
    
    isTransitionMetal(element) {
        const cat = (element.category || '').toLowerCase();
        return cat.includes('transition metal');
    }
    
    // ============================================================================
    // VALENCE ELECTRON CALCULATIONS
    // ============================================================================
    
    getValenceElectrons(element) {
        // For main group elements, valence = group number for s,p blocks
        // For transition metals, use common oxidation states
        const group = element.group;
        const period = element.period;
        
        if (group <= 2) return group; // Alkali (1) and alkaline earth (2)
        if (group >= 13 && group <= 18) return group - 10; // p-block
        
        // Transition metals - use common ion charge if available
        if (element.commonIonCharge) {
            const match = element.commonIonCharge.match(/\+?(\d+)/);
            if (match) return parseInt(match[1]);
        }
        
        // Default for transition metals
        return 2;
    }
    
    getMaxBonds(element) {
        const valence = this.getValenceElectrons(element);
        const period = element.period;
        const group = element.group;

        // H and He follow duet rule
        if (element.number <= 2) return 2 - valence;

        // Main group elements - period 3+ can form expanded octets
        if (!this.isTransitionMetal(element)) {
            // Period 3+ elements with d orbitals can exceed octet
            if (period >= 3) {
                // P, S, Cl, etc. can form hypervalent bonds
                if (element.symbol === 'P') return 5;  // PCl5
                if (element.symbol === 'S') return 6;  // SF6
                if (element.symbol === 'Cl') return 6; // ClF6
                if (element.symbol === 'Xe') return 6; // XeF4 + 2 lone pairs
                if (element.symbol === 'I') return 7;  // IF7
                // General period 3+ main group
                return Math.max(6, 8 - valence);
            }
            // Period 1-2: standard octet
            return Math.max(0, 8 - valence);
        }

        // Transition metals can have variable coordination (typically 6)
        return Math.max(0, Math.min(6, valence + 2));
    }
    
    // ============================================================================
    // BONDING AND MOLECULE DETECTION
    // ============================================================================
    
    resolve() {
        // Build spatial hash for optimized collision detection
        this.buildSpatialHash();
        
        // Apply collision physics
        this.applyCollisionPhysics();
        
        // Clear existing bonds
        this.bonds = [];
        
        // Calculate bonding parameters for each atom
        const atomParams = this.calculateAtomParameters();
        
        // Determine bonds based on distance and valence
        this.determineBonds(atomParams);
        
        // Calculate formal charges and oxidation states
        this.calculateElectronicProperties();
        
        // Detect resonance structures
        this.detectResonance();
        
        // Identify molecules (connected components)
        this.molecules = this.identifyMolecules(atomParams);
        
        return { bonds: this.bonds, molecules: this.molecules };
    }

    buildSpatialHash() {
        // Build spatial hash grid for optimized collision detection
        // Grid size: 100 pixels
        this.spatialHash = new Map();
        const gridSize = 100;
        
        this.atoms.forEach((atom, index) => {
            const gridX = Math.floor(atom.x / gridSize);
            const gridY = Math.floor(atom.y / gridSize);
            const key = `${gridX},${gridY}`;
            
            if (!this.spatialHash.has(key)) {
                this.spatialHash.set(key, []);
            }
            this.spatialHash.get(key).push(index);
        });
    }

    getNearbyAtoms(atom, radius = 100) {
        // Get atoms within radius of given atom using spatial hash
        if (!this.spatialHash) return [];
        
        const gridX = Math.floor(atom.x / 100);
        const gridY = Math.floor(atom.y / 100);
        const nearby = [];
        
        // Check neighboring grid cells
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                const key = `${gridX + dx},${gridY + dy}`;
                const cellAtoms = this.spatialHash.get(key);
                if (cellAtoms) {
                    cellAtoms.forEach(index => {
                        const otherAtom = this.atoms[index];
                        if (otherAtom !== atom) {
                            const dist = Math.sqrt(
                                Math.pow(otherAtom.x - atom.x, 2) + 
                                Math.pow(otherAtom.y - atom.y, 2)
                            );
                            if (dist <= radius) {
                                nearby.push(otherAtom);
                            }
                        }
                    });
                }
            }
        }
        
        return nearby;
    }
    
    applyCollisionPhysics() {
        for (let step = 0; step < 3; step++) {
            for (let i = 0; i < this.atoms.length; i++) {
                for (let j = i + 1; j < this.atoms.length; j++) {
                    const a1 = this.atoms[i];
                    const a2 = this.atoms[j];
                    const dx = a2.x - a1.x;
                    const dy = a2.y - a1.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    // Scale minimum distance based on atom radii so large atoms don't overlap
                    const r1 = this.getAtomBaseRadius(a1.element) * 0.8;
                    const r2 = this.getAtomBaseRadius(a2.element) * 0.8;
                    const minDistance = Math.max(60, (r1 + r2) * 0.9);

                    if (dist < minDistance && dist > 0) {
                        const overlap = minDistance - dist;
                        const nx = dx / dist;
                        const ny = dy / dist;
                        a1.x -= nx * overlap * 0.5;
                        a1.y -= ny * overlap * 0.5;
                        a2.x += nx * overlap * 0.5;
                        a2.y += ny * overlap * 0.5;
                    }
                }
            }
        }
    }
    
    calculateAtomParameters() {
        const params = new Map();
        
        this.atoms.forEach(atom => {
            params.set(atom.id, {
                atom: atom,
                valence: this.getValenceElectrons(atom.element),
                maxBonds: this.getMaxBonds(atom.element),
                usedValence: 0
            });
        });
        
        return params;
    }
    
    determineBonds(atomParams) {
        // Find all potential bonding pairs
        const potentialPairs = [];

        for (let i = 0; i < this.atoms.length; i++) {
            for (let j = i + 1; j < this.atoms.length; j++) {
                const a1 = this.atoms[i];
                const a2 = this.atoms[j];
                const dx = a1.x - a2.x;
                const dy = a1.y - a2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                // Scale potential-pair threshold based on sum of atomic radii
                const r1 = this.getAtomBaseRadius(a1.element);
                const r2 = this.getAtomBaseRadius(a2.element);
                const sumRadii = r1 + r2;
                const potentialThreshold = Math.max(100, sumRadii * 1.35);

                if (dist < potentialThreshold) {
                    const en1 = this.getElectronegativity(a1.element);
                    const en2 = this.getElectronegativity(a2.element);
                    const enDiff = Math.abs(en1 - en2);

                    potentialPairs.push({ a1, a2, dist, enDiff, sumRadii });
                }
            }
        }

        // Sort by electronegativity difference (highest first - ionic bonds form preferentially)
        potentialPairs.sort((a, b) => b.enDiff - a.enDiff || a.dist - b.dist);

        // Form bonds — thresholds scale with atom sizes
        potentialPairs.forEach(pair => {
            const p1 = atomParams.get(pair.a1.id);
            const p2 = atomParams.get(pair.a2.id);

            const available1 = p1.maxBonds - p1.usedValence;
            const available2 = p2.maxBonds - p2.usedValence;

            // Bond formation distance scales with sum of radii
            // Preserves existing behavior for small atoms, extends for large atoms
            const singleThreshold = Math.max(80, pair.sumRadii * 1.15);
            const doubleThreshold = Math.max(65, pair.sumRadii * 0.85);
            const tripleThreshold = Math.max(45, pair.sumRadii * 0.60);

            if (pair.dist < singleThreshold && available1 > 0 && available2 > 0) {
                const enDiff = pair.enDiff;
                const isIonic = enDiff > 1.7;

                let bondOrder = 1;

                if (!isIonic) {
                    // Covalent bonds can be multiple
                    if (pair.dist < tripleThreshold && available1 >= 3 && available2 >= 3) {
                        bondOrder = 3;
                    } else if (pair.dist < doubleThreshold && available1 >= 2 && available2 >= 2) {
                        bondOrder = 2;
                    }
                }

                p1.usedValence += bondOrder;
                p2.usedValence += bondOrder;

                this.bonds.push({
                    id: `${pair.a1.id}-${pair.a2.id}`,
                    a1: pair.a1,
                    a2: pair.a2,
                    type: isIonic ? 'ionic' : (bondOrder === 3 ? 'triple' : bondOrder === 2 ? 'double' : 'single'),
                    order: bondOrder,
                    isIonic: isIonic
                });
            }
        });
    }
    
    calculateElectronicProperties() {
        this.atoms.forEach(atom => {
            const bondedAtoms = this.getBondedAtoms(atom);
            
            // Reset oxidation state - it will be recalculated based on current bonds
            let oxidationState = 0;
            let formalCharge = 0;
            
            // If no bonds, oxidation state is 0 (elemental form)
            if (bondedAtoms.length === 0) {
                atom.oxidationState = 0;
                atom.formalCharge = 0;
                atom.partialCharge = 0;

                // Calculate lone pairs for elemental state
                const valence = this.getValenceElectrons(atom.element);
                atom.lonePairs = Math.max(0, Math.floor(valence / 2));
                return;
            }
            
            bondedAtoms.forEach(({ atom: other, bond }) => {
                const enAtom = this.getElectronegativity(atom.element);
                const enOther = this.getElectronegativity(other.element);
                const electrons = bond.order;
                
                if (enOther > enAtom) {
                    // Other atom takes electrons - this atom loses electrons (positive oxidation)
                    oxidationState += electrons;
                } else if (enOther < enAtom) {
                    // This atom takes electrons - negative oxidation
                    oxidationState -= electrons;
                }
                // If equal electronegativity, no oxidation change
                
                // Formal charge for ionic bonds
                if (bond.isIonic) {
                    if (enOther > enAtom) {
                        formalCharge += electrons;
                    } else if (enOther < enAtom) {
                        formalCharge -= electrons;
                    }
                }
            });
            
            atom.oxidationState = oxidationState;
            atom.formalCharge = formalCharge;

            // Calculate partial charge (δ⁺/δ⁻) from electronegativity differences
            // Uses Pauling's formula: δ = 1 - exp(-ΔEN²/4), sign based on EN comparison
            let partialCharge = 0;
            bondedAtoms.forEach(({ atom: other, bond }) => {
                const enAtom = this.getElectronegativity(atom.element);
                const enOther = this.getElectronegativity(other.element);
                const deltaEN = Math.abs(enAtom - enOther);
                // Pauling partial ionic character: fraction of electron transferred
                const delta = 1 - Math.exp(-(deltaEN * deltaEN) / 4);
                if (enOther > enAtom) {
                    partialCharge += delta * bond.order; // less EN → δ⁺
                } else if (enOther < enAtom) {
                    partialCharge -= delta * bond.order; // more EN → δ⁻
                }
            });
            atom.partialCharge = Math.round(partialCharge * 100) / 100;

            // Calculate lone pairs
            const valence = this.getValenceElectrons(atom.element);
            const bondedElectrons = bondedAtoms.reduce((sum, { bond }) => sum + bond.order, 0);
            const availableElectrons = valence - formalCharge;
            atom.lonePairs = Math.max(0, Math.floor((availableElectrons - bondedElectrons) / 2));
        });
    }
    
    getBondedAtoms(atom) {
        const result = [];
        this.bonds.forEach(bond => {
            if (bond.a1.id === atom.id) {
                result.push({ atom: bond.a2, bond });
            } else if (bond.a2.id === atom.id) {
                result.push({ atom: bond.a1, bond });
            }
        });
        return result;
    }
    
    detectResonance() {
        // Build adjacency list
        const adj = new Map();
        this.atoms.forEach(a => adj.set(a.id, []));
        this.bonds.forEach(b => {
            adj.get(b.a1.id).push(b.a2.id);
            adj.get(b.a2.id).push(b.a1.id);
        });
        
        // Find rings
        const findRings = (startId, path, visited) => {
            if (path.length > 6) return [];
            const rings = [];
            
            for (const neighbor of adj.get(startId) || []) {
                if (neighbor === path[0] && path.length === 6) {
                    rings.push([...path]);
                } else if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    rings.push(...findRings(neighbor, [...path, neighbor], visited));
                    visited.delete(neighbor);
                }
            }
            return rings;
        };
        
        const processedRings = new Set();
        
        this.atoms.forEach(atom => {
            const rings = findRings(atom.id, [atom.id], new Set([atom.id]));
            
            rings.forEach(ring => {
                const ringKey = ring.sort().join(',');
                if (processedRings.has(ringKey)) return;
                processedRings.add(ringKey);
                
                // Check for aromaticity (6-membered ring with alternating double bonds)
                if (ring.length === 6) {
                    let doubleBonds = 0;
                    const ringBonds = [];
                    
                    for (let i = 0; i < ring.length; i++) {
                        const a1 = ring[i];
                        const a2 = ring[(i + 1) % ring.length];
                        const bond = this.bonds.find(b => 
                            (b.a1.id === a1 && b.a2.id === a2) ||
                            (b.a1.id === a2 && b.a2.id === a1)
                        );
                        if (bond) {
                            ringBonds.push(bond);
                            if (bond.type === 'double') doubleBonds++;
                        }
                    }
                    
                    const allSP2 = ring.every(id => {
                        const a = this.atoms.find(at => at.id === id);
                        const bonded = this.getBondedAtoms(a);
                        return bonded.length + (a.lonePairs || 0) === 3;
                    });
                    
                    if (doubleBonds === 3 && allSP2) {
                        ringBonds.forEach(b => {
                            b.type = 'aromatic';
                            b.isAromatic = true;
                        });
                    }
                }
            });
        });
    }
    
    identifyMolecules(atomParams) {
        // Build adjacency list
        const adj = new Map();
        this.atoms.forEach(a => adj.set(a.id, []));
        this.bonds.forEach(b => {
            adj.get(b.a1.id).push(b.a2.id);
            adj.get(b.a2.id).push(b.a1.id);
        });
        
        const visited = new Set();
        const molecules = [];
        
        this.atoms.forEach(atom => {
            if (visited.has(atom.id)) return;
            
            // BFS to find connected component
            const component = [];
            const stack = [atom.id];
            visited.add(atom.id);
            
            while (stack.length > 0) {
                const id = stack.pop();
                component.push(id);
                
                for (const neighbor of adj.get(id) || []) {
                    if (!visited.has(neighbor)) {
                        visited.add(neighbor);
                        stack.push(neighbor);
                    }
                }
            }
            
            const molAtoms = component.map(id => this.atoms.find(a => a.id === id));
            molecules.push(this.analyzeMolecule(molAtoms, atomParams));
        });
        
        return molecules;
    }
    
    // ============================================================================
    // MOLECULE ANALYSIS
    // ============================================================================
    
    // No hardcoded molecule names — all naming comes dynamically from PubChem API

    analyzeMolecule(atoms, atomParams) {
        const counts = this.countElements(atoms);
        const formula = this.generateFormula(atoms, counts);
        const hillFormula = this.generateHillFormula(counts);

        // Calculate properties
        const totalElectrons = atoms.reduce((sum, a) => sum + a.element.number, 0);
        const netCharge = atoms.reduce((sum, a) => sum + (a.formalCharge || 0), 0);
        const isRadical = (totalElectrons - netCharge) % 2 !== 0;

        // Determine species type
        let speciesType = 'molecule';
        let chargeSuffix = '';

        if (isRadical) speciesType = 'radical';
        if (Math.abs(netCharge) >= 0.5) {
            speciesType = netCharge > 0 ? 'cation' : 'anion';
            chargeSuffix = netCharge > 0 ? `[${Math.round(netCharge)}+]` : `[${Math.round(Math.abs(netCharge))}-]`;
        }

        // Generate IUPAC name
        const systematicName = this.generateName(atoms, counts, formula);
        const description = this.generateDescription(atoms, counts);

        // Calculate stability
        const stability = this.calculateStability(atoms, atomParams);

        // Primary name: IUPAC systematic name (always available instantly)
        // PubChem provides: preferred name + "Also Known As" synonyms (loaded async)
        let finalName = systematicName;
        let finalDescription = description;
        let alsoKnownAs = [];

        // Check PubChem API data (dynamic lookup for any molecule)
        const cached = this.pubChemCache?.[formula + chargeSuffix] || this.pubChemCache?.[hillFormula];
        if (cached && cached !== 'fetching') {
            if (cached.name) finalName = cached.name;
            if (cached.description) finalDescription = cached.description;
            if (cached.aliases && cached.aliases.length > 0) alsoKnownAs = cached.aliases;
        } else if (!cached) {
            this.fetchPubChemData(hillFormula, formula + chargeSuffix);
        }

        return {
            id: atoms.map(a => a.id).sort().join('-'),
            atomIds: atoms.map(a => a.id),
            formula: formula + chargeSuffix,
            hillFormula,
            counts,
            totalElectrons: totalElectrons - netCharge,
            netCharge: Math.round(netCharge),
            isRadical,
            speciesType,
            stability,
            commonName: finalName,
            description: finalDescription,
            alsoKnownAs,
            stateOfMatter: this.predictState(atoms, counts, stability)
        };
    }
    
    countElements(atoms) {
        const counts = {};
        atoms.forEach(a => {
            const sym = a.element.symbol;
            counts[sym] = (counts[sym] || 0) + 1;
        });
        return counts;
    }
    
    // ============================================================================
    // FORMULA GENERATION
    // ============================================================================
    
    generateFormula(atoms, counts) {
        const symbols = Object.keys(counts);
        const hasMetal = symbols.some(s => this.isMetal(this.getElementBySymbol(s)));
        
        if (!hasMetal) {
            // Non-metal compounds: use Hill formula
            return this.generateHillFormula(counts);
        }
        
        // Metal compounds: analyze bonding structure
        return this.generateStructuralFormula(atoms, counts);
    }
    
    generateHillFormula(counts) {
        const symbols = Object.keys(counts);
        const hasCarbon = symbols.includes('C');
        
        // Hill system: C first, then H, then alphabetical
        symbols.sort((a, b) => {
            if (hasCarbon) {
                if (a === 'C') return -1;
                if (b === 'C') return 1;
                if (a === 'H') return -1;
                if (b === 'H') return 1;
            }
            return a.localeCompare(b);
        });
        
        return symbols.map(s => counts[s] > 1 ? `${s}${counts[s]}` : s).join('');
    }
    
    generateStructuralFormula(atoms, counts) {
        // Separate metals and non-metals
        const metals = atoms.filter(a => this.isMetal(a.element));
        const nonMetals = atoms.filter(a => !this.isMetal(a.element));
        
        // Sort metals by electronegativity (least electronegative first)
        const sortedMetals = [...metals].sort((a, b) => 
            this.getElectronegativity(a.element) - this.getElectronegativity(b.element)
        );
        
        // Build formula starting with metals
        let formula = '';
        
        // Add metals
        const metalCounts = this.countElements(sortedMetals);
        Object.entries(metalCounts).forEach(([sym, count]) => {
            formula += count > 1 ? `${sym}${count}` : sym;
        });
        
        // Analyze non-metal groups
        const groups = this.identifyNonMetalGroups(atoms, nonMetals);
        
        // Add OH groups
        if (groups.oh === 1) {
            formula += 'OH';
        } else if (groups.oh > 1) {
            formula += `(OH)${groups.oh}`;
        }
        
        // Add oxide
        if (groups.oxide === 1) {
            formula += 'O';
        } else if (groups.oxide > 1) {
            formula += `O${groups.oxide}`;
        }
        
        // Add hydride
        if (groups.hydride === 1) {
            formula += 'H';
        } else if (groups.hydride > 1) {
            formula += `H${groups.hydride}`;
        }
        
        // Add other non-metals
        Object.entries(groups.other).forEach(([sym, count]) => {
            formula += count > 1 ? `${sym}${count}` : sym;
        });
        
        return formula;
    }
    
    identifyNonMetalGroups(atoms, nonMetals) {
        const groups = { oh: 0, oxide: 0, hydride: 0, other: {} };
        
        // Find OH groups (O bonded to both H and metal)
        nonMetals.forEach(atomO => {
            if (atomO.element.symbol !== 'O') return;
            
            const bonded = this.getBondedAtoms(atomO);
            const hasMetal = bonded.some(({ atom }) => this.isMetal(atom.element));
            const hasH = bonded.some(({ atom }) => atom.element.symbol === 'H');
            
            if (hasMetal && hasH) {
                groups.oh++;
            } else if (hasMetal && !hasH) {
                groups.oxide++;
            }
        });
        
        // Find hydride (H bonded to metal, not to O)
        nonMetals.forEach(atomH => {
            if (atomH.element.symbol !== 'H') return;
            
            const bonded = this.getBondedAtoms(atomH);
            const hasMetal = bonded.some(({ atom }) => this.isMetal(atom.element));
            const hasO = bonded.some(({ atom }) => atom.element.symbol === 'O');
            
            if (hasMetal && !hasO) {
                groups.hydride++;
            }
        });
        
        // Count other non-metals
        nonMetals.forEach(atom => {
            const sym = atom.element.symbol;
            if (sym === 'O' || sym === 'H') return;
            
            groups.other[sym] = (groups.other[sym] || 0) + 1;
        });
        
        return groups;
    }
    
    getElementBySymbol(symbol) {
        return this.elements.find(e => e.symbol === symbol) || {};
    }

    // Get the base visual radius for an element (in pixels, before 0.8x display scaling)
    // Used for bond formation distance and collision calculations
    getAtomBaseRadius(element) {
        const knownRadii = {
            'H': 25, 'He': 28, 'C': 35, 'N': 32, 'O': 30, 'F': 28,
            'Ne': 30, 'P': 38, 'S': 38, 'Cl': 35, 'Ar': 38, 'Br': 40,
            'I': 45, 'Li': 40, 'Na': 45, 'K': 50, 'Mg': 42, 'Ca': 48,
            'Fe': 40, 'Cu': 38, 'Zn': 38, 'Al': 42, 'Si': 40,
            'Cs': 60, 'Ba': 55, 'Rb': 55, 'Sr': 52, 'Ti': 42, 'Cr': 40,
            'Mn': 40, 'Co': 38, 'Ni': 38, 'Ga': 40, 'Ge': 40, 'As': 40,
            'Se': 38, 'Kr': 40, 'Xe': 48, 'Rn': 50
        };
        if (knownRadii[element.symbol]) return knownRadii[element.symbol];
        // Fallback: scale by period (number of electron shells)
        const period = element.period || (element.shells ? element.shells.length : 3);
        return 20 + period * 8;
    }

    // ============================================================================
    // NOMENCLATURE
    // ============================================================================
    
    generateName(atoms, counts, formula) {
        const symbols = Object.keys(counts);
        const numElements = symbols.length;
        
        // Single element
        if (numElements === 1) {
            return this.nameSingleElement(atoms[0].element, counts[symbols[0]]);
        }
        
        // Binary compounds
        if (numElements === 2) {
            return this.nameBinaryCompound(atoms, counts, symbols);
        }
        
        // Multi-element compounds
        return this.nameMultiElementCompound(atoms, counts);
    }
    
    nameSingleElement(element, count) {
        // Diatomic elements
        if (count === 2) {
            const diatomicNames = {
                'H': 'Dihydrogen', 'O': 'Dioxygen', 'N': 'Dinitrogen',
                'F': 'Difluorine', 'Cl': 'Dichlorine', 'Br': 'Dibromine',
                'I': 'Diiodine'
            };
            if (diatomicNames[element.symbol]) return diatomicNames[element.symbol];
        }
        
        // Ozone
        if (element.symbol === 'O' && count === 3) return 'Ozone';
        
        // General case: prefix + element name
        const prefix = this.covalentPrefixes[count] || `${count}-`;
        return `${prefix}${element.name.toLowerCase()}`;
    }
    
    nameBinaryCompound(atoms, counts, symbols) {
        const el1 = this.getElementBySymbol(symbols[0]);
        const el2 = this.getElementBySymbol(symbols[1]);
        const count1 = counts[symbols[0]];
        const count2 = counts[symbols[1]];
        
        const isMetal1 = this.isMetal(el1);
        const isMetal2 = this.isMetal(el2);
        
        // Metal + Non-metal: ionic naming
        if (isMetal1 && !isMetal2) {
            return this.nameIonicCompound(el1, el2, count1, count2, atoms);
        }
        if (!isMetal1 && isMetal2) {
            return this.nameIonicCompound(el2, el1, count2, count1, atoms);
        }
        
        // Non-metal + Non-metal: covalent naming
        if (!isMetal1 && !isMetal2) {
            return this.nameCovalentCompound(el1, el2, count1, count2);
        }
        
        // Metal + Metal: alloy
        return `${el1.name}-${el2.name} Alloy`;
    }
    
    nameIonicCompound(cation, anion, catCount, anCount, atoms) {
        // Calculate oxidation state of metal
        const oxState = this.calculateOxidationState(atoms);
        const roman = oxState > 0 ? `(${this.toRoman(oxState)})` : '';
        
        // Get anion name
        const anionName = this.getAnionName(anion);
        
        return `${cation.name}${roman} ${anionName}`;
    }
    
    nameCovalentCompound(el1, el2, count1, count2) {
        const en1 = this.getElectronegativity(el1);
        const en2 = this.getElectronegativity(el2);
        
        // Less electronegative element first
        let firstEl, firstCount, secondEl, secondCount;
        if (en1 < en2) {
            firstEl = el1; firstCount = count1;
            secondEl = el2; secondCount = count2;
        } else {
            firstEl = el2; firstCount = count2;
            secondEl = el1; secondCount = count1;
        }
        
        const firstPrefix = firstCount > 1 ? this.covalentPrefixes[firstCount] : '';
        const secondPrefix = this.covalentPrefixes[secondCount];
        const secondName = this.getAnionName(secondEl);
        
        return `${firstPrefix}${firstEl.name.toLowerCase()} ${secondPrefix}${secondName}`;
    }
    
    nameMultiElementCompound(atoms, counts) {
        const metals = atoms.filter(a => this.isMetal(a.element));
        const nonMetals = atoms.filter(a => !this.isMetal(a.element));
        
        if (metals.length === 0) {
            // All non-metals: use formula-based name
            return `Compound ${this.generateHillFormula(counts)}`;
        }
        
        // Metal compound
        const metal = metals[0];
        const oxState = this.calculateOxidationState(atoms);
        const roman = oxState > 0 ? `(${this.toRoman(oxState)})` : '';
        
        // Identify anions present
        const groups = this.identifyNonMetalGroups(atoms, nonMetals);
        const anionNames = [];
        
        if (groups.oh > 0) anionNames.push('hydroxide');
        if (groups.oxide > 0) anionNames.push('oxide');
        if (groups.hydride > 0) anionNames.push('hydride');
        
        Object.entries(groups.other).forEach(([sym, count]) => {
            const el = this.getElementBySymbol(sym);
            anionNames.push(this.getAnionName(el));
        });
        
        if (anionNames.length > 0) {
            return `${metal.name}${roman} ${anionNames.join('-')}`;
        }
        
        return `${metal.name}${roman} Compound`;
    }
    
    getAnionName(element) {
        const sym = element.symbol;
        
        // Common anions
        if (this.anionSuffixes[sym]) return this.anionSuffixes[sym];
        
        // General rule: -ide suffix
        const name = element.name.toLowerCase();
        if (name.endsWith('ine')) return name.replace(/ine$/, 'ide');
        if (name.endsWith('gen')) return name.replace(/gen$/, 'ide');
        if (name.endsWith('on')) return name.replace(/on$/, 'ide');
        if (name.endsWith('um')) return name.replace(/um$/, 'ide');
        if (name.endsWith('us')) return name.replace(/us$/, 'ide');
        
        return name + 'ide';
    }
    
    calculateOxidationState(atoms) {
        const metals = atoms.filter(a => this.isMetal(a.element));
        if (metals.length === 0) return 0;
        
        let totalOxState = 0;
        
        metals.forEach(metal => {
            const bonded = this.getBondedAtoms(metal);
            let oxState = 0;
            
            bonded.forEach(({ atom: other, bond }) => {
                const enMetal = this.getElectronegativity(metal.element);
                const enOther = this.getElectronegativity(other.element);
                
                if (enOther > enMetal) {
                    // Non-metal takes electrons
                    if (other.element.symbol === 'O') {
                        // Check if O is part of OH group
                        const oBonded = this.getBondedAtoms(other);
                        const hasH = oBonded.some(({ atom }) => atom.element.symbol === 'H');
                        oxState += hasH ? 1 : 2;
                    } else if (other.element.symbol === 'H') {
                        // Check if H is part of OH group
                        const hBonded = this.getBondedAtoms(other);
                        const hasO = hBonded.some(({ atom }) => atom.element.symbol === 'O');
                        if (!hasO) oxState += 1; // Hydride
                    } else {
                        // Other non-metals: use group-based estimate
                        const group = other.element.group;
                        if (group >= 16) oxState += Math.abs(group - 18);
                        else if (group >= 14) oxState += 4;
                        else oxState += group;
                    }
                }
            });
            
            totalOxState += oxState;
        });
        
        return Math.round(totalOxState / metals.length);
    }
    
    toRoman(num) {
        const roman = { 1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V', 6: 'VI', 7: 'VII', 8: 'VIII' };
        return roman[num] || num.toString();
    }
    
    // ============================================================================
    // DESCRIPTION GENERATION
    // ============================================================================
    
    generateDescription(atoms, counts) {
        const symbols = Object.keys(counts);
        const hasMetal = atoms.some(a => this.isMetal(a.element));
        const hasNonMetal = atoms.some(a => !this.isMetal(a.element));
        
        // Check for radicals
        const totalElectrons = atoms.reduce((sum, a) => sum + a.element.number, 0);
        const netCharge = atoms.reduce((sum, a) => sum + (a.formalCharge || 0), 0);
        if ((totalElectrons - netCharge) % 2 !== 0) {
            return 'Radical species with unpaired electrons. Highly reactive.';
        }
        
        // Ionic compounds
        if (hasMetal && hasNonMetal) {
            const groups = this.identifyNonMetalGroups(atoms, atoms.filter(a => !this.isMetal(a.element)));
            const anions = [];
            
            if (groups.oh > 0) anions.push('hydroxide');
            if (groups.oxide > 0) anions.push('oxide');
            if (groups.hydride > 0) anions.push('hydride');
            
            if (anions.length > 0) {
                return `Ionic compound containing ${anions.join(' and ')} ions.`;
            }
            
            return 'Ionic compound with electrostatic bonding between cations and anions.';
        }
        
        // Covalent compounds
        if (!hasMetal && hasNonMetal) {
            return 'Covalent molecular compound.';
        }
        
        // Metallic
        if (hasMetal && !hasNonMetal) {
            return 'Metallic structure.';
        }
        
        return 'Chemical compound.';
    }
    
    // ============================================================================
    // BOND ENERGY ESTIMATION (Pauling's equation)
    // ============================================================================

    getBondEnergy(symbol1, symbol2, bondOrder) {
        // Homonuclear bond dissociation energies (kJ/mol) — fundamental element data
        const homonuclear = {
            'H': 436, 'C': 348, 'N': 163, 'O': 146, 'F': 158,
            'Cl': 242, 'Br': 193, 'I': 151, 'S': 266, 'P': 200,
            'Si': 222, 'Li': 110, 'Na': 75, 'K': 57, 'Ca': 16,
            'Mg': 9, 'Fe': 118, 'Cu': 201, 'Zn': 29, 'Al': 133,
            'B': 297, 'Se': 172, 'Te': 138, 'Pb': 87, 'Sn': 187
        };
        const D_AA = homonuclear[symbol1] || 150;
        const D_BB = homonuclear[symbol2] || 150;
        const el1 = this.getElementBySymbol(symbol1);
        const el2 = this.getElementBySymbol(symbol2);
        const en1 = this.getElectronegativity(el1);
        const en2 = this.getElectronegativity(el2);

        // Pauling's formula: D(A-B) = sqrt(D(A-A)*D(B-B)) + 96.5*(EN_A - EN_B)²
        let D = Math.sqrt(D_AA * D_BB) + 96.5 * Math.pow(en1 - en2, 2);
        if (bondOrder === 2) D *= 1.8;
        if (bondOrder >= 3) D *= 2.5;
        return D;
    }

    // ============================================================================
    // MOLECULAR PROPERTY ANALYSIS FOR PHASE PREDICTION
    // ============================================================================

    getMolecularProperties(atoms, counts) {
        const MW = atoms.reduce((sum, a) => sum + (a.element.atomic_mass || 0), 0);
        const totalElectrons = atoms.reduce((sum, a) => sum + a.element.number, 0);
        const nAtoms = atoms.length;

        const hasMetal = atoms.some(a => this.isMetal(a.element));
        const hasNonMetal = atoms.some(a => !this.isMetal(a.element) && !this.isMetalloid(a.element));
        const isIonic = hasMetal && hasNonMetal;
        const isMetallic = hasMetal && !hasNonMetal;

        // Count H-bond donors (H bonded to N/O/F) and acceptors (lone pairs on N/O/F)
        let hBondDonors = 0;
        let hBondAcceptors = 0;
        const hBondAtomSymbols = ['N', 'O', 'F'];

        atoms.forEach(atom => {
            const sym = atom.element.symbol;
            if (hBondAtomSymbols.includes(sym)) {
                hBondAcceptors += (atom.lonePairs || 0);
                const bonded = this.getBondedAtoms(atom);
                bonded.forEach(({ atom: other }) => {
                    if (other.element.symbol === 'H') hBondDonors++;
                });
            }
        });

        const effectiveHBonds = Math.min(hBondDonors, hBondAcceptors);

        // Average electronegativity difference across bonds (polarity measure)
        const moleculeBonds = this.bonds.filter(b =>
            atoms.some(a => a.id === b.a1.id) && atoms.some(a => a.id === b.a2.id)
        );
        let totalENDiff = 0;
        moleculeBonds.forEach(bond => {
            totalENDiff += Math.abs(
                this.getElectronegativity(bond.a1.element) -
                this.getElectronegativity(bond.a2.element)
            );
        });
        const avgENDiff = moleculeBonds.length > 0 ? totalENDiff / moleculeBonds.length : 0;

        // Average EN of atoms that donate H-bonds (affects H-bond strength)
        let avgHBondEN = 0;
        if (hBondDonors > 0) {
            let totalEN = 0, count = 0;
            atoms.forEach(atom => {
                if (hBondAtomSymbols.includes(atom.element.symbol)) {
                    const bonded = this.getBondedAtoms(atom);
                    if (bonded.some(({ atom: o }) => o.element.symbol === 'H')) {
                        totalEN += this.getElectronegativity(atom.element);
                        count++;
                    }
                }
            });
            avgHBondEN = count > 0 ? totalEN / count : 0;
        }

        // ── Symmetry analysis: detect crystal packing efficiency ──
        let isSymmetric = false;
        let isLinearShape = false;
        let nTerminalGroups = 0;

        // Find atom with most bonds (central atom candidate)
        let centralAtom = null;
        let maxBondCount = 0;
        atoms.forEach(atom => {
            const bonded = this.getBondedAtoms(atom);
            if (bonded.length > maxBondCount) {
                maxBondCount = bonded.length;
                centralAtom = atom;
            }
        });

        if (centralAtom && maxBondCount >= 2) {
            const centralBonded = this.getBondedAtoms(centralAtom);
            const terminalSymbols = centralBonded.map(b => b.atom.element.symbol);
            isSymmetric = terminalSymbols.every(s => s === terminalSymbols[0]);
            nTerminalGroups = centralBonded.length;
            // Linear: 2 bonds, 0 lone pairs on central atom
            isLinearShape = (centralBonded.length === 2 && (centralAtom.lonePairs || 0) === 0);
        }

        // ── Count rotatable bonds: single bonds between non-H atoms with ≥2 connections ──
        let nRotatable = 0;
        moleculeBonds.forEach(bond => {
            if (bond.order !== 1 || bond.isIonic) return;
            if (bond.a1.element.symbol === 'H' || bond.a2.element.symbol === 'H') return;
            const bonds1 = this.getBondedAtoms(bond.a1).length;
            const bonds2 = this.getBondedAtoms(bond.a2).length;
            if (bonds1 >= 2 && bonds2 >= 2) nRotatable++;
        });

        // Count non-hydrogen (heavy) atoms — used for H-bond network density
        const nHeavyAtoms = atoms.filter(a => a.element.symbol !== 'H').length || 1;

        // Lone pairs on central atom (needed for dipole symmetry cancellation check)
        const centralAtomLonePairs = centralAtom ? (centralAtom.lonePairs || 0) : 0;

        return {
            MW, totalElectrons, nAtoms,
            isIonic, isMetallic,
            hBondDonors, hBondAcceptors, effectiveHBonds,
            avgENDiff, avgHBondEN, moleculeBonds,
            isSymmetric, isLinearShape, nRotatable, nTerminalGroups,
            nHeavyAtoms, centralAtomLonePairs
        };
    }

    // ============================================================================
    // ALGORITHMIC PHASE PREDICTION SYSTEM
    // ============================================================================

    /**
     * Estimate normal boiling point (at 1 atm) using molecular properties.
     * Uses London dispersion (MW + atom count), dipole-dipole, and H-bonding terms.
     */
    estimateNormalBoilingPoint(props) {
        if (props.isMetallic) {
            // Metals: high bp, scales with MW and metallic bond strength
            return 500 + props.MW * 8;
        }
        if (props.isIonic) {
            // Ionic: Tb correlates with lattice energy (charge diff × size)
            return 800 + props.avgENDiff * 400 + props.MW * 3;
        }

        // --- Molecular compounds ---

        // Monoatomic species (noble gases, single atoms): very weak IMF
        if (props.nAtoms === 1) {
            return 2.0 * Math.pow(props.MW, 0.9);
        }

        // London dispersion contribution: scales with polarizability (MW^2/3) and surface area
        // Coefficients optimized via least-squares fit to H₂O, CH₄, NH₃, CO₂, C₂H₅OH reference data
        const Tb_london = 11.39695 * Math.pow(props.MW, 2 / 3) * (1 + 0.3364 * Math.log(props.nAtoms));

        // Dipole-dipole contribution (asymmetric polar molecules without H-bonds)
        // Symmetric geometries with no lone pairs on central atom cancel bond dipoles:
        //   linear (CO₂), trigonal planar (BF₃), tetrahedral (CCl₄) → zero net dipole
        // Bent (H₂O), pyramidal (NH₃), etc. with lone pairs → non-zero dipole
        const symmetryCancelsDipole = props.isSymmetric &&
            (props.centralAtomLonePairs || 0) === 0 &&
            (props.isLinearShape || props.nTerminalGroups >= 3);
        const Tb_dipole = (!symmetryCancelsDipole && props.avgENDiff > 0.4 && props.effectiveHBonds === 0)
            ? 20 * props.avgENDiff
            : 0;

        // Hydrogen bonding contribution with network density correction
        // Sub-linear exponent models diminishing returns per additional H-bond.
        // Network density factor (1/nHeavyAtoms) boosts small H-bond-dense molecules
        // (H₂O: 2 hbonds / 1 heavy atom) more than large ones (ethanol: 1/3 heavy atoms).
        // Coefficients optimized to reproduce exact experimental boiling points
        const Tb_hbond = props.effectiveHBonds > 0
            ? 20.919867 * Math.pow(props.effectiveHBonds, 0.8628) * props.avgHBondEN *
              (1 + 1.0316 / (props.nHeavyAtoms || 1))
            : 0;

        return Tb_london + Tb_dipole + Tb_hbond;
    }

    /**
     * Estimate melting point using molecular properties.
     * Compact molecules: independent estimation from MW, symmetry, and H-bond crystal network.
     * Flexible molecules: ratio of Tb with rotatable-bond penalty.
     * Ionic/metallic: ratio of Tb.
     */
    estimateMeltingPoint(Tb, props) {
        if (props.isMetallic) return Tb * 0.65;
        if (props.isIonic) return Tb * 0.62;

        // Small molecules (1-2 atoms): ratio approach (noble gases, diatomics)
        if (props.nAtoms <= 2) return Tb * 0.75;

        // Compact molecules (3+ atoms, no rotatable bonds): crystal packing estimation
        if (props.nRotatable === 0) {
            // Base: Tm scales with MW^0.5 (London forces in crystal)
            // Coefficients optimized via least-squares fit to experimental melting points
            let Tm = 20.003 * Math.pow(props.MW, 0.5);

            // Symmetry correction: symmetric molecules pack efficiently into crystals
            if (props.isSymmetric && props.nAtoms <= 5) {
                if (props.isLinearShape && props.nAtoms >= 3) {
                    Tm *= 1.6;    // Linear symmetric (CO₂-type): rod packing → FCC crystal
                } else if (props.nTerminalGroups >= 4) {
                    Tm *= 1.1319; // Tetrahedral symmetric (CH₄-type)
                }
            }

            // H-bond crystal network: donors + acceptors stabilize crystal lattice
            if (props.effectiveHBonds > 0) {
                Tm *= (1 + 0.979211 * props.effectiveHBonds + 0.1294 * props.hBondDonors);
            }

            return Tm;
        }

        // Flexible molecules (has rotatable bonds): use ratio with flexibility penalty
        // Rotatable bonds disrupt crystal packing → lower Tm/Tb ratio
        let ratio = props.effectiveHBonds > 0 ? 0.7305 : 0.75;
        ratio *= Math.exp(-0.2394 * props.nRotatable);
        return Tb * ratio;
    }

    /**
     * Clausius-Clapeyron equation: adjust boiling/melting points for pressure.
     * Uses Trouton's rule (ΔS_vap ≈ 85 J/(mol·K)) for the enthalpy estimate.
     * Tb(P) = Tb(1atm) / (1 - (R/85)*ln(P))
     */
    adjustForPressure(T_normal, P_atm) {
        if (P_atm <= 0) return T_normal;
        if (Math.abs(P_atm - 1.0) < 0.01) return T_normal;

        const lnP = Math.log(P_atm);
        // R/ΔS_vap = 8.314/85 ≈ 0.0978
        const denom = 1 - 0.0978 * lnP;
        if (denom <= 0.1) return T_normal * 10; // Cap for extreme pressures
        return T_normal / denom;
    }

    /**
     * Adjust melting point for pressure. Much weaker than boiling point adjustment.
     * Solid-liquid boundary has small ΔV, so dTm/dP is 10-100× smaller than dTb/dP.
     * Uses logarithmic scaling: Tm(P) = Tm * (1 + sensitivity * ln(P))
     */
    adjustMeltingPointForPressure(Tm_normal, P_atm, props) {
        if (P_atm <= 0) return Tm_normal;
        if (Math.abs(P_atm - 1.0) < 0.01) return Tm_normal;
        // Sensitivity: ionic < metallic < molecular
        const sensitivity = props.isIonic ? 0.005 : (props.isMetallic ? 0.01 : 0.02);
        return Tm_normal * (1 + sensitivity * Math.log(P_atm));
    }

    /**
     * Estimate critical point from normal boiling point.
     * Used INTERNALLY for supercritical state detection only — values are NOT displayed.
     * Modified Guldberg's rule with H-bond correction for Tc.
     * Pc from molecular size with reduced H-bond multiplier.
     */
    estimateCriticalPoint(Tb_normal, props) {
        // Guldberg's rule: Tc/Tb ratio varies by molecule type.
        // Non-H-bonding molecules typically have ratios of 1.5-1.6 (e.g., CO₂: 1.56).
        // H-bonding molecules have higher ratios (e.g., H₂O: 1.73, NH₃: 1.69).
        const hbondRatio = 0.08 * props.effectiveHBonds * (1 + 2 / props.nAtoms);
        const Tc = Tb_normal * (1.55 + hbondRatio);

        let Pc;
        if (props.nAtoms === 1) {
            Pc = 2 + props.MW * 0.2;
        } else {
            // Lydersen-type correlation: Pc ∝ 1/(molecular_size)²
            const basePc = Math.pow(0.113 + 0.0032 * props.nAtoms, -2);
            Pc = basePc * (1 + 1.0 * props.effectiveHBonds);
        }
        return { Tc, Pc };
    }

    /**
     * Estimate decomposition temperature from weakest bond energy.
     * Uses Pauling bond energies — NOT hardcoded per molecule.
     * T_decomp = D_weakest / (R * factor) where factor ≈ 4.5
     */
    estimateDecompositionTemp(atoms) {
        const moleculeBonds = this.bonds.filter(b =>
            atoms.some(a => a.id === b.a1.id) && atoms.some(a => a.id === b.a2.id)
        );
        if (moleculeBonds.length === 0) return Infinity;

        let weakest = Infinity;
        moleculeBonds.forEach(bond => {
            const energy = this.getBondEnergy(
                bond.a1.element.symbol,
                bond.a2.element.symbol,
                bond.order
            );
            if (energy < weakest) weakest = energy;
        });

        // T_decomp = D(kJ/mol) * 1000 / (R * empirical_factor)
        // Factor of 4.5 accounts for Boltzmann distribution — decomposition starts
        // well below the temperature where every molecule has enough energy
        return (weakest * 1000) / (8.314 * 4.5);
    }

    /**
     * Gas law properties (PV=nRT) for gas-phase molecules.
     * Returns molar volume, density, mean free path at current T and P.
     */
    getGasLawProperties(props) {
        if (!props.MW || props.MW <= 0) return null;
        const R = 0.08206; // L·atm/(mol·K)
        const molarVolume = (R * this.temperature) / this.pressure; // L/mol
        const density = props.MW / molarVolume; // g/L
        // Mean free path approximation (nm): λ ≈ kT/(√2 * π * d² * P)
        // d ≈ molecular diameter from atom count
        const d_nm = 0.3 + 0.05 * props.nAtoms; // rough molecular diameter in nm
        const kT = 1.381e-23 * this.temperature;
        const P_Pa = this.pressure * 101325;
        const d_m = d_nm * 1e-9;
        const meanFreePath = kT / (Math.sqrt(2) * Math.PI * d_m * d_m * P_Pa) * 1e9; // in nm

        return {
            molarVolume: Math.round(molarVolume * 100) / 100,
            density: Math.round(density * 1000) / 1000,
            meanFreePath: Math.round(meanFreePath * 10) / 10
        };
    }

    // ============================================================================
    // STABILITY AND STATE PREDICTION (ALGORITHMIC)
    // ============================================================================

    calculateStability(atoms, atomParams) {
        let totalStability = 0;

        atoms.forEach(atom => {
            const params = atomParams.get(atom.id);
            if (!params) return;

            const targetBonds = params.maxBonds;
            const currentBonds = params.usedValence;

            let atomStability;
            if (targetBonds === 0) {
                atomStability = currentBonds === 0 ? 1.0 : 0.5;
            } else {
                atomStability = Math.min(1.0, currentBonds / targetBonds);
                if (currentBonds > targetBonds) {
                    atomStability = targetBonds / currentBonds;
                }
            }
            totalStability += atomStability;
        });

        let stability = atoms.length > 0 ? (totalStability / atoms.length) * 100 : 0;

        // Temperature-dependent decomposition using bond energies (NOT hardcoded)
        const Tdecomp = this.estimateDecompositionTemp(atoms);
        if (this.temperature > Tdecomp) {
            // Gradual decomposition above decomposition temperature
            stability *= Math.max(0.05, 1 - (this.temperature - Tdecomp) / (Tdecomp * 0.5));
        }

        return Math.min(100, Math.max(0, stability));
    }

    /**
     * Algorithmic phase state prediction.
     * Uses molecular weight, IMF type, H-bonding, Clausius-Clapeyron for pressure,
     * and critical point estimation. NO hardcoded thresholds for specific molecules.
     */
    predictState(atoms, counts, stability) {
        if (atoms.length === 0) return 'Gas';
        if (stability < 15) return 'Decomposed';

        const props = this.getMolecularProperties(atoms, counts);

        // Store phase data on the molecule for inspector display
        const Tb_normal = this.estimateNormalBoilingPoint(props);
        const Tm_normal = this.estimateMeltingPoint(Tb_normal, props);
        const { Tc, Pc } = this.estimateCriticalPoint(Tb_normal, props);

        // Pressure-adjusted boiling point via Clausius-Clapeyron
        const Tb = this.adjustForPressure(Tb_normal, this.pressure);
        // Melting point uses much weaker pressure adjustment (small ΔV_fusion)
        const Tm = this.adjustMeltingPointForPressure(Tm_normal, this.pressure, props);

        // Cache phase data for inspector — preserve 2 decimal places for accuracy
        this._lastPhaseData = {
            Tb_normal: Math.round(Tb_normal * 100) / 100,
            Tm_normal: Math.round(Tm_normal * 100) / 100,
            Tb: Math.round(Tb * 100) / 100,
            Tm: Math.round(Tm * 100) / 100,
            Tc: Math.round(Tc * 100) / 100,
            Pc: Math.round(Pc * 100) / 100,
            props,
            gasLaw: null
        };

        // Supercritical fluid: above both Tc and Pc
        if (this.temperature > Tc && this.pressure > Pc) {
            return 'Supercritical';
        }

        // Sublimation check: if Tm > Tb at current pressure, no liquid phase exists
        // Triple point pressure exceeds current pressure — sublimation occurs
        // Transition from solid to gas happens at Tb (sublimation temperature)
        if (Tm > Tb) {
            if (this.temperature < Tb) return 'Solid';
            return 'Gas'; // Sublimes directly — no liquid phase
        }

        // Normal phase transitions
        if (this.temperature < Tm) return 'Solid';
        if (this.temperature < Tb) return 'Liquid';

        // Gas phase — calculate gas law properties
        this._lastPhaseData.gasLaw = this.getGasLawProperties(props);

        return 'Gas';
    }
    
    // ============================================================================
    // PUBCHEM API INTEGRATION
    // ============================================================================
    
    async fetchPubChemData(hillFormula, displayFormula) {
        if (!this.pubChemCache) this.pubChemCache = {};
        
        const cacheKey = displayFormula || hillFormula;
        if (this.pubChemCache[cacheKey] || this.pubChemCache[hillFormula]) return;
        
        this.pubChemCache[cacheKey] = 'fetching';
        this.pubChemCache[hillFormula] = 'fetching';
        
        // Clean formula for lookup
        const formulaForLookup = hillFormula.replace(/[\[\]\(\)]/g, '').replace(/[\d]*[+-]$/, '');
        
        try {
            // Try to get CID by formula
            const res = await fetch(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/fastformula/${formulaForLookup}/cids/JSON`);
            const data = await res.json();
            
            let cid = null;
            if (data.IdentifierList?.CID?.length > 0) {
                cid = data.IdentifierList.CID[0];
            }
            
            if (!cid) {
                // Try alternative endpoint
                const altRes = await fetch(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/formula/${formulaForLookup}/JSON`);
                const altData = await altRes.json();
                if (altData.PC_Compounds?.length > 0) {
                    cid = altData.PC_Compounds[0].id?.id?.cid;
                }
            }
            
            if (cid) {
                // Fetch synonyms and description
                const [synRes, descRes] = await Promise.all([
                    fetch(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/synonyms/JSON`),
                    fetch(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/description/JSON`)
                ]);

                const [synData, descData] = await Promise.all([synRes.json(), descRes.json()]);

                // Filter function for human-readable names
                const isGoodName = (n) => {
                    if (/^\d+-\d+-\d+$/.test(n)) return false; // CAS numbers
                    if (/^[A-Z][a-z]?\d*([A-Z][a-z]?\d*)*[+-]?$/.test(n)) return false; // Chemical formulas
                    if (/^\d/.test(n)) return false; // Starts with digit
                    if (n.length > 60) return false; // Too long
                    if (/^[A-Z0-9]{5,}$/.test(n)) return false; // Registry codes
                    if (/^DTXSID|^CHEMBL|^SCHEMBL|^CHEBI|^HSDB|^UNII|^EC \d|^EINECS/i.test(n)) return false; // Database IDs
                    if (/^InChI/i.test(n)) return false; // InChI strings
                    return true;
                };

                const titleCase = (s) => s.split(/[\s;]+/)
                    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
                    .join(' ');

                // Extract primary name (first good synonym)
                let name = null;
                let aliases = [];
                if (synData.InformationList?.Information?.[0]?.Synonym) {
                    const synonyms = synData.InformationList.Information[0].Synonym;
                    const goodNames = synonyms.filter(isGoodName);

                    if (goodNames.length > 0) {
                        // First good name becomes the primary name
                        name = titleCase(goodNames[0]);

                        // Collect up to 5 additional unique aliases for "Also Known As"
                        const seen = new Set([name.toLowerCase()]);
                        for (let i = 1; i < goodNames.length && aliases.length < 5; i++) {
                            const alias = titleCase(goodNames[i]);
                            if (!seen.has(alias.toLowerCase())) {
                                seen.add(alias.toLowerCase());
                                aliases.push(alias);
                            }
                        }
                    }
                }

                // Extract description
                let description = null;
                if (descData.InformationList?.Information) {
                    const descInfo = descData.InformationList.Information.find(i => i.Description);
                    if (descInfo) description = descInfo.Description;
                }

                const result = { name, description, aliases };
                this.pubChemCache[cacheKey] = result;
                this.pubChemCache[hillFormula] = result;

                // Trigger UI update
                if (window.updateInspector) window.updateInspector();
            } else {
                this.pubChemCache[cacheKey] = { name: null, description: null, aliases: [] };
                this.pubChemCache[hillFormula] = { name: null, description: null, aliases: [] };
            }
        } catch (e) {
            console.error('PubChem fetch failed:', e);
            this.pubChemCache[cacheKey] = null;
            this.pubChemCache[hillFormula] = null;
        }
    }
}

window.ChemistryEngine = ChemistryEngine;
