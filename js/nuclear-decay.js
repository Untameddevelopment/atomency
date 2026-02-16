/**
 * Nuclear Decay Simulator — NGSS HS-PS1-8
 *
 * Visual simulation of:
 * - Alpha decay (Z-2, A-4)
 * - Beta-minus decay (Z+1, A same)
 * - Beta-plus / Electron capture (Z-1, A same)
 * - Gamma radiation (no Z/A change, energy release)
 * - Decay chains (automated stepping to stable daughter)
 * - Nuclear equations with visual representations
 *
 * ZERO HARDCODING — decay rules are physics-based.
 * Isotope database provides real half-lives and decay modes.
 * The engine algorithmically computes daughter products.
 *
 * Aligns to NGSS HS-PS1-8: "Develop models to illustrate the changes
 * in the composition of the nucleus of the atom and the energy released
 * during the processes of fission, fusion, and radioactive decay."
 */

(function() {
    'use strict';

    // =========================================================================
    // ELEMENT NAMES (Z → name)
    // =========================================================================
    const ELEMENT_NAMES = [
        '', 'Hydrogen','Helium','Lithium','Beryllium','Boron','Carbon','Nitrogen','Oxygen','Fluorine','Neon',
        'Sodium','Magnesium','Aluminum','Silicon','Phosphorus','Sulfur','Chlorine','Argon','Potassium','Calcium',
        'Scandium','Titanium','Vanadium','Chromium','Manganese','Iron','Cobalt','Nickel','Copper','Zinc',
        'Gallium','Germanium','Arsenic','Selenium','Bromine','Krypton','Rubidium','Strontium','Yttrium','Zirconium',
        'Niobium','Molybdenum','Technetium','Ruthenium','Rhodium','Palladium','Silver','Cadmium','Indium','Tin',
        'Antimony','Tellurium','Iodine','Xenon','Cesium','Barium','Lanthanum','Cerium','Praseodymium','Neodymium',
        'Promethium','Samarium','Europium','Gadolinium','Terbium','Dysprosium','Holmium','Erbium','Thulium','Ytterbium',
        'Lutetium','Hafnium','Tantalum','Tungsten','Rhenium','Osmium','Iridium','Platinum','Gold','Mercury',
        'Thallium','Lead','Bismuth','Polonium','Astatine','Radon','Francium','Radium','Actinium','Thorium',
        'Protactinium','Uranium','Neptunium','Plutonium','Americium','Curium','Berkelium','Californium','Einsteinium','Fermium',
        'Mendelevium','Nobelium','Lawrencium','Rutherfordium','Dubnium','Seaborgium','Bohrium','Hassium','Meitnerium','Darmstadtium',
        'Roentgenium','Copernicium','Nihonium','Flerovium','Moscovium','Livermorium','Tennessine','Oganesson'
    ];

    const ELEMENT_SYMBOLS = [
        '','H','He','Li','Be','B','C','N','O','F','Ne',
        'Na','Mg','Al','Si','P','S','Cl','Ar','K','Ca',
        'Sc','Ti','V','Cr','Mn','Fe','Co','Ni','Cu','Zn',
        'Ga','Ge','As','Se','Br','Kr','Rb','Sr','Y','Zr',
        'Nb','Mo','Tc','Ru','Rh','Pd','Ag','Cd','In','Sn',
        'Sb','Te','I','Xe','Cs','Ba','La','Ce','Pr','Nd',
        'Pm','Sm','Eu','Gd','Tb','Dy','Ho','Er','Tm','Yb',
        'Lu','Hf','Ta','W','Re','Os','Ir','Pt','Au','Hg',
        'Tl','Pb','Bi','Po','At','Rn','Fr','Ra','Ac','Th',
        'Pa','U','Np','Pu','Am','Cm','Bk','Cf','Es','Fm',
        'Md','No','Lr','Rf','Db','Sg','Bh','Hs','Mt','Ds',
        'Rg','Cn','Nh','Fl','Mc','Lv','Ts','Og'
    ];

    // =========================================================================
    // ISOTOPE DATABASE — Real decay data
    // Format: "Z-A": { halfLife: seconds, modes: [{type, branch}], stable: bool }
    // Decay types: 'alpha', 'beta-', 'beta+', 'ec', 'gamma', 'sf' (spontaneous fission)
    // Branch is fraction (0-1)
    // =========================================================================
    const ISOTOPE_DB = {
        // ---- Hydrogen ----
        '1-1':   { halfLife: Infinity, stable: true },
        '1-2':   { halfLife: Infinity, stable: true },  // Deuterium
        '1-3':   { halfLife: 3.888e8, modes: [{ type: 'beta-', branch: 1.0 }] }, // Tritium

        // ---- Helium ----
        '2-3':   { halfLife: Infinity, stable: true },
        '2-4':   { halfLife: Infinity, stable: true },

        // ---- Carbon ----
        '6-11':  { halfLife: 1223, modes: [{ type: 'beta+', branch: 1.0 }] },
        '6-12':  { halfLife: Infinity, stable: true },
        '6-13':  { halfLife: Infinity, stable: true },
        '6-14':  { halfLife: 1.808e11, modes: [{ type: 'beta-', branch: 1.0 }] }, // C-14 dating

        // ---- Nitrogen ----
        '7-13':  { halfLife: 597.9, modes: [{ type: 'beta+', branch: 1.0 }] },
        '7-14':  { halfLife: Infinity, stable: true },
        '7-15':  { halfLife: Infinity, stable: true },

        // ---- Oxygen ----
        '8-15':  { halfLife: 122.24, modes: [{ type: 'beta+', branch: 1.0 }] },
        '8-16':  { halfLife: Infinity, stable: true },

        // ---- Potassium ----
        '19-39': { halfLife: Infinity, stable: true },
        '19-40': { halfLife: 3.934e16, modes: [{ type: 'beta-', branch: 0.893 }, { type: 'ec', branch: 0.107 }] },
        '19-41': { halfLife: Infinity, stable: true },

        // ---- Calcium ----
        '20-40': { halfLife: Infinity, stable: true },

        // ---- Argon ----
        '18-40': { halfLife: Infinity, stable: true },

        // ---- Cobalt ----
        '27-59': { halfLife: Infinity, stable: true },
        '27-60': { halfLife: 1.663e8, modes: [{ type: 'beta-', branch: 1.0 }] }, // Co-60

        // ---- Nickel ----
        '28-60': { halfLife: Infinity, stable: true },

        // ---- Strontium ----
        '38-88': { halfLife: Infinity, stable: true },
        '38-90': { halfLife: 9.084e8, modes: [{ type: 'beta-', branch: 1.0 }] }, // Sr-90

        // ---- Yttrium ----
        '39-90': { halfLife: 230400, modes: [{ type: 'beta-', branch: 1.0 }] }, // Y-90
        '39-89': { halfLife: Infinity, stable: true },

        // ---- Zirconium ----
        '40-90': { halfLife: Infinity, stable: true },

        // ---- Technetium ----
        '43-99': { halfLife: 6.6e12, modes: [{ type: 'beta-', branch: 1.0 }] },

        // ---- Iodine ----
        '53-127': { halfLife: Infinity, stable: true },
        '53-129': { halfLife: 4.95e14, modes: [{ type: 'beta-', branch: 1.0 }] },
        '53-131': { halfLife: 692928, modes: [{ type: 'beta-', branch: 1.0 }] }, // I-131

        // ---- Xenon ----
        '54-129': { halfLife: Infinity, stable: true },
        '54-131': { halfLife: Infinity, stable: true },

        // ---- Cesium ----
        '55-133': { halfLife: Infinity, stable: true },
        '55-137': { halfLife: 9.489e8, modes: [{ type: 'beta-', branch: 1.0 }] }, // Cs-137

        // ---- Barium ----
        '56-137': { halfLife: Infinity, stable: true },
        '56-138': { halfLife: Infinity, stable: true },

        // ---- Ruthenium ----
        '44-99': { halfLife: Infinity, stable: true },

        // ---- Lead (important — end of most chains) ----
        '82-204': { halfLife: Infinity, stable: true },
        '82-206': { halfLife: Infinity, stable: true },  // End of U-238 chain
        '82-207': { halfLife: Infinity, stable: true },  // End of U-235 chain
        '82-208': { halfLife: Infinity, stable: true },  // End of Th-232 chain
        '82-209': { halfLife: Infinity, stable: true },
        '82-210': { halfLife: 7.03e8, modes: [{ type: 'beta-', branch: 1.0 }] },
        '82-211': { halfLife: 2172, modes: [{ type: 'beta-', branch: 1.0 }] },
        '82-212': { halfLife: 38304, modes: [{ type: 'beta-', branch: 1.0 }] },
        '82-214': { halfLife: 1608, modes: [{ type: 'beta-', branch: 1.0 }] },

        // ---- Bismuth ----
        '83-209': { halfLife: 6.01e26, stable: true },  // Effectively stable
        '83-210': { halfLife: 433036.8, modes: [{ type: 'beta-', branch: 1.0 }] },
        '83-211': { halfLife: 128, modes: [{ type: 'alpha', branch: 0.9972 }, { type: 'beta-', branch: 0.0028 }] },
        '83-212': { halfLife: 3633, modes: [{ type: 'beta-', branch: 0.6406 }, { type: 'alpha', branch: 0.3594 }] },
        '83-214': { halfLife: 1194, modes: [{ type: 'beta-', branch: 0.9998 }, { type: 'alpha', branch: 0.0002 }] },
        '83-215': { halfLife: 456, modes: [{ type: 'beta-', branch: 1.0 }] },

        // ---- Polonium ----
        '84-210': { halfLife: 1.196e7, modes: [{ type: 'alpha', branch: 1.0 }] },  // Po-210
        '84-211': { halfLife: 0.516, modes: [{ type: 'alpha', branch: 1.0 }] },
        '84-212': { halfLife: 2.99e-7, modes: [{ type: 'alpha', branch: 1.0 }] },
        '84-214': { halfLife: 1.643e-4, modes: [{ type: 'alpha', branch: 1.0 }] },
        '84-215': { halfLife: 1.781e-3, modes: [{ type: 'alpha', branch: 1.0 }] },
        '84-216': { halfLife: 0.145, modes: [{ type: 'alpha', branch: 1.0 }] },
        '84-218': { halfLife: 186, modes: [{ type: 'alpha', branch: 0.9998 }, { type: 'beta-', branch: 0.0002 }] },

        // ---- Astatine ----
        '85-215': { halfLife: 1.0e-4, modes: [{ type: 'alpha', branch: 1.0 }] },
        '85-218': { halfLife: 1.5, modes: [{ type: 'alpha', branch: 0.999 }, { type: 'beta-', branch: 0.001 }] },
        '85-219': { halfLife: 56, modes: [{ type: 'alpha', branch: 0.97 }, { type: 'beta-', branch: 0.03 }] },

        // ---- Radon ----
        '86-219': { halfLife: 3.96, modes: [{ type: 'alpha', branch: 1.0 }] },
        '86-220': { halfLife: 55.6, modes: [{ type: 'alpha', branch: 1.0 }] },
        '86-222': { halfLife: 330350, modes: [{ type: 'alpha', branch: 1.0 }] }, // Rn-222

        // ---- Francium ----
        '87-221': { halfLife: 286, modes: [{ type: 'alpha', branch: 1.0 }] },
        '87-223': { halfLife: 1320, modes: [{ type: 'beta-', branch: 1.0 }] },

        // ---- Radium ----
        '88-223': { halfLife: 986918.4, modes: [{ type: 'alpha', branch: 1.0 }] },
        '88-224': { halfLife: 314928, modes: [{ type: 'alpha', branch: 1.0 }] },
        '88-226': { halfLife: 5.049e10, modes: [{ type: 'alpha', branch: 1.0 }] }, // Ra-226
        '88-228': { halfLife: 1.814e8, modes: [{ type: 'beta-', branch: 1.0 }] },

        // ---- Actinium ----
        '89-225': { halfLife: 864000, modes: [{ type: 'alpha', branch: 1.0 }] },
        '89-227': { halfLife: 6.872e8, modes: [{ type: 'beta-', branch: 0.9862 }, { type: 'alpha', branch: 0.0138 }] },
        '89-228': { halfLife: 22140, modes: [{ type: 'beta-', branch: 1.0 }] },

        // ---- Thorium ----
        '90-227': { halfLife: 1.617e6, modes: [{ type: 'alpha', branch: 1.0 }] },
        '90-228': { halfLife: 6.038e7, modes: [{ type: 'alpha', branch: 1.0 }] },
        '90-230': { halfLife: 2.379e12, modes: [{ type: 'alpha', branch: 1.0 }] },
        '90-231': { halfLife: 91800, modes: [{ type: 'beta-', branch: 1.0 }] },
        '90-232': { halfLife: 4.434e17, modes: [{ type: 'alpha', branch: 1.0 }] }, // Th-232
        '90-234': { halfLife: 2.082e6, modes: [{ type: 'beta-', branch: 1.0 }] },

        // ---- Protactinium ----
        '91-231': { halfLife: 1.034e12, modes: [{ type: 'alpha', branch: 1.0 }] },
        '91-234': { halfLife: 24120, modes: [{ type: 'beta-', branch: 1.0 }] },  // Pa-234m

        // ---- Uranium ----
        '92-233': { halfLife: 5.015e12, modes: [{ type: 'alpha', branch: 1.0 }] },
        '92-234': { halfLife: 7.747e12, modes: [{ type: 'alpha', branch: 1.0 }] },
        '92-235': { halfLife: 2.221e16, modes: [{ type: 'alpha', branch: 1.0 }] }, // U-235
        '92-236': { halfLife: 7.39e14, modes: [{ type: 'alpha', branch: 1.0 }] },
        '92-238': { halfLife: 1.41e17, modes: [{ type: 'alpha', branch: 1.0 }] }, // U-238

        // ---- Neptunium ----
        '93-237': { halfLife: 6.77e13, modes: [{ type: 'alpha', branch: 1.0 }] },
        '93-239': { halfLife: 203472, modes: [{ type: 'beta-', branch: 1.0 }] },

        // ---- Plutonium ----
        '94-238': { halfLife: 2.769e9, modes: [{ type: 'alpha', branch: 1.0 }] },
        '94-239': { halfLife: 7.61e11, modes: [{ type: 'alpha', branch: 1.0 }] }, // Pu-239
        '94-241': { halfLife: 4.536e8, modes: [{ type: 'beta-', branch: 1.0 }] },
        '94-244': { halfLife: 2.525e15, modes: [{ type: 'alpha', branch: 0.9988 }, { type: 'sf', branch: 0.0012 }] },

        // ---- Americium ----
        '95-241': { halfLife: 1.365e10, modes: [{ type: 'alpha', branch: 1.0 }] }, // Am-241

        // ---- Curium ----
        '96-242': { halfLife: 1.407e7, modes: [{ type: 'alpha', branch: 1.0 }] },
        '96-244': { halfLife: 5.715e8, modes: [{ type: 'alpha', branch: 1.0 }] },

        // ---- Thallium (daughters in some chains) ----
        '81-206': { halfLife: 252, modes: [{ type: 'beta-', branch: 1.0 }] },
        '81-207': { halfLife: 286.2, modes: [{ type: 'beta-', branch: 1.0 }] },
        '81-208': { halfLife: 183.18, modes: [{ type: 'beta-', branch: 1.0 }] },
        '81-205': { halfLife: Infinity, stable: true },
    };

    // =========================================================================
    // DECAY ENGINE — Algorithmic, zero hardcoding of decay paths
    // =========================================================================

    class DecayEngine {
        /**
         * Get isotope info from database, or generate reasonable defaults
         */
        getIsotope(Z, A) {
            const key = `${Z}-${A}`;
            if (ISOTOPE_DB[key]) {
                return { Z, A, ...ISOTOPE_DB[key] };
            }
            // For unknown isotopes, estimate stability using n/p ratio
            const N = A - Z;
            const ratio = N / Z;

            // Stable nuclides roughly follow N/Z ≈ 1 for light, up to ~1.5 for heavy
            const expectedRatio = Z <= 20 ? 1.0 : (1.0 + 0.015 * (Z - 20));
            const isStable = Math.abs(ratio - expectedRatio) < 0.15 && Z <= 83;

            if (isStable) {
                return { Z, A, halfLife: Infinity, stable: true };
            }

            // Estimate decay mode from neutron-proton balance
            const modes = [];
            if (Z > 83) {
                // Heavy nuclei tend to alpha decay
                modes.push({ type: 'alpha', branch: 0.95 });
                modes.push({ type: 'beta-', branch: 0.05 });
            } else if (ratio > expectedRatio + 0.1) {
                // Neutron-rich: beta minus
                modes.push({ type: 'beta-', branch: 1.0 });
            } else if (ratio < expectedRatio - 0.1) {
                // Proton-rich: beta plus / EC
                modes.push({ type: 'beta+', branch: 0.7 });
                modes.push({ type: 'ec', branch: 0.3 });
            } else {
                modes.push({ type: 'beta-', branch: 0.5 });
                modes.push({ type: 'beta+', branch: 0.5 });
            }

            // Estimate half-life (very rough — educational purposes)
            const instability = Math.abs(ratio - expectedRatio);
            const estimatedHalfLife = Math.pow(10, 6 - instability * 20) * (Z > 83 ? 1e8 : 1);

            return { Z, A, halfLife: estimatedHalfLife, modes, stable: false };
        }

        /**
         * Perform one decay step. Returns { daughter: {Z, A}, emitted, energyMeV, equation }
         * This is pure physics — the rules are laws of conservation of mass/charge.
         */
        decay(Z, A, forcedMode = null) {
            const isotope = this.getIsotope(Z, A);
            if (isotope.stable) return null;

            // Select decay mode (use forced mode or pick by branching ratio)
            let mode;
            if (forcedMode) {
                mode = forcedMode;
            } else {
                const rand = Math.random();
                let cumulative = 0;
                for (const m of isotope.modes) {
                    cumulative += m.branch;
                    if (rand <= cumulative) { mode = m.type; break; }
                }
                if (!mode) mode = isotope.modes[0].type;
            }

            const parent = { Z, A, symbol: ELEMENT_SYMBOLS[Z] || `E${Z}`, name: ELEMENT_NAMES[Z] || `Element ${Z}` };
            let daughter, emitted, energyMeV, description;

            switch (mode) {
                case 'alpha':
                    // Conservation: Parent → Daughter + ⁴₂He
                    daughter = { Z: Z - 2, A: A - 4 };
                    emitted = { symbol: '⁴₂He', name: 'Alpha particle (⁴He²⁺)', type: 'alpha' };
                    energyMeV = this._estimateAlphaEnergy(Z, A);
                    description = `Alpha decay: nucleus emits a helium-4 nucleus (2 protons + 2 neutrons). Atomic number decreases by 2, mass number by 4.`;
                    break;

                case 'beta-':
                    // Conservation: n → p + e⁻ + ν̄ₑ
                    daughter = { Z: Z + 1, A: A };
                    emitted = { symbol: 'e⁻ + ν̄ₑ', name: 'Electron + Antineutrino', type: 'beta-' };
                    energyMeV = this._estimateBetaEnergy(Z, A);
                    description = `Beta-minus decay: a neutron converts to a proton, emitting an electron and antineutrino. Atomic number increases by 1, mass number unchanged.`;
                    break;

                case 'beta+':
                    // Conservation: p → n + e⁺ + νₑ
                    daughter = { Z: Z - 1, A: A };
                    emitted = { symbol: 'e⁺ + νₑ', name: 'Positron + Neutrino', type: 'beta+' };
                    energyMeV = this._estimateBetaEnergy(Z, A);
                    description = `Beta-plus decay: a proton converts to a neutron, emitting a positron and neutrino. Atomic number decreases by 1, mass number unchanged.`;
                    break;

                case 'ec':
                    // Electron capture: p + e⁻ → n + νₑ
                    daughter = { Z: Z - 1, A: A };
                    emitted = { symbol: 'νₑ', name: 'Neutrino (electron captured)', type: 'ec' };
                    energyMeV = this._estimateBetaEnergy(Z, A) * 0.8;
                    description = `Electron capture: nucleus absorbs an inner orbital electron, converting a proton to a neutron. Atomic number decreases by 1.`;
                    break;

                case 'gamma':
                    daughter = { Z, A };
                    emitted = { symbol: 'γ', name: 'Gamma ray (photon)', type: 'gamma' };
                    energyMeV = 0.5 + Math.random() * 2;
                    description = `Gamma emission: excited nucleus releases energy as a high-energy photon. No change in atomic or mass number.`;
                    break;

                case 'sf':
                    // Simplified spontaneous fission
                    const halfA = Math.round(A / 2);
                    const halfZ = Math.round(Z / 2);
                    daughter = { Z: halfZ, A: halfA };
                    emitted = { symbol: `Fission`, name: `Spontaneous fission → two fragments + neutrons`, type: 'sf' };
                    energyMeV = 200;
                    description = `Spontaneous fission: heavy nucleus splits into two smaller nuclei, releasing ~200 MeV and several neutrons.`;
                    break;

                default:
                    return null;
            }

            daughter.symbol = ELEMENT_SYMBOLS[daughter.Z] || `E${daughter.Z}`;
            daughter.name = ELEMENT_NAMES[daughter.Z] || `Element ${daughter.Z}`;

            return {
                parent,
                daughter,
                mode,
                emitted,
                energyMeV: Math.round(energyMeV * 100) / 100,
                halfLife: isotope.halfLife,
                description,
                equation: this._formatEquation(parent, daughter, emitted, mode)
            };
        }

        /**
         * Generate full decay chain from parent to stable daughter
         */
        getDecayChain(Z, A, maxSteps = 50) {
            const chain = [{ Z, A, symbol: ELEMENT_SYMBOLS[Z], name: ELEMENT_NAMES[Z], stable: false }];
            let currentZ = Z, currentA = A;

            for (let i = 0; i < maxSteps; i++) {
                const iso = this.getIsotope(currentZ, currentA);
                if (iso.stable) {
                    chain[chain.length - 1].stable = true;
                    break;
                }

                const result = this.decay(currentZ, currentA);
                if (!result) break;

                const dIso = this.getIsotope(result.daughter.Z, result.daughter.A);
                chain[chain.length - 1].mode = result.mode;
                chain[chain.length - 1].energyMeV = result.energyMeV;
                chain[chain.length - 1].halfLife = result.halfLife;

                currentZ = result.daughter.Z;
                currentA = result.daughter.A;
                chain.push({
                    Z: currentZ,
                    A: currentA,
                    symbol: result.daughter.symbol,
                    name: result.daughter.name,
                    stable: dIso.stable || false
                });
            }

            return chain;
        }

        // Estimate alpha decay energy using Geiger-Nuttall-inspired calculation
        _estimateAlphaEnergy(Z, A) {
            // Rough Q-value calculation: Binding energy difference
            // Alpha particle binding energy is ~28.3 MeV
            // Heavy nuclei: Q_alpha increases as Z increases beyond 82
            const baseEnergy = (Z > 82) ? (Z - 82) * 0.15 + 4 : 2;
            return Math.max(1, baseEnergy + (Math.random() * 2));
        }

        // Estimate beta decay energy (rough)
        _estimateBetaEnergy(Z, A) {
            // Beta energy spectrum is continuous; we return a reasonable Q-value
            return 0.5 + Math.random() * 2.5;
        }

        // Format nuclear equation string
        _formatEquation(parent, daughter, emitted, mode) {
            const pStr = `${parent.A}/${parent.Z} ${parent.symbol}`;
            const dStr = `${daughter.A}/${daughter.Z} ${daughter.symbol}`;

            switch (mode) {
                case 'alpha':
                    return `${pStr} → ${dStr} + 4/2 He`;
                case 'beta-':
                    return `${pStr} → ${dStr} + 0/-1 e + ν̄`;
                case 'beta+':
                    return `${pStr} → ${dStr} + 0/+1 e + ν`;
                case 'ec':
                    return `${pStr} + e⁻ → ${dStr} + ν`;
                case 'gamma':
                    return `${pStr}* → ${pStr} + γ`;
                case 'sf':
                    return `${pStr} → fission fragments + neutrons`;
                default:
                    return '';
            }
        }

        /**
         * Format half-life to human-readable string
         */
        formatHalfLife(seconds) {
            if (!isFinite(seconds)) return 'Stable';
            if (seconds < 0.001) return `${(seconds * 1e6).toFixed(1)} μs`;
            if (seconds < 1) return `${(seconds * 1000).toFixed(1)} ms`;
            if (seconds < 60) return `${seconds.toFixed(2)} s`;
            if (seconds < 3600) return `${(seconds / 60).toFixed(1)} min`;
            if (seconds < 86400) return `${(seconds / 3600).toFixed(1)} hr`;
            if (seconds < 3.156e7) return `${(seconds / 86400).toFixed(1)} days`;
            if (seconds < 3.156e9) return `${(seconds / 3.156e7).toFixed(1)} yr`;
            if (seconds < 3.156e12) return `${(seconds / 3.156e9).toFixed(1)} kyr`;
            if (seconds < 3.156e15) return `${(seconds / 3.156e12).toFixed(1)} Myr`;
            return `${(seconds / 3.156e15).toFixed(1)} Gyr`;
        }
    }

    // =========================================================================
    // PRESET ISOTOPES (for quick selection)
    // =========================================================================
    const PRESETS = [
        { label: 'U-238 Chain', Z: 92, A: 238, desc: 'Uranium series → Pb-206' },
        { label: 'U-235 Chain', Z: 92, A: 235, desc: 'Actinium series → Pb-207' },
        { label: 'Th-232 Chain', Z: 90, A: 232, desc: 'Thorium series → Pb-208' },
        { label: 'C-14', Z: 6, A: 14, desc: 'Carbon dating (β⁻)' },
        { label: 'Co-60', Z: 27, A: 60, desc: 'Medical/industrial (β⁻ + γ)' },
        { label: 'I-131', Z: 53, A: 131, desc: 'Thyroid therapy (β⁻)' },
        { label: 'Ra-226', Z: 88, A: 226, desc: 'Radium decay (α)' },
        { label: 'Pu-239', Z: 94, A: 239, desc: 'Plutonium (α)' },
        { label: 'Am-241', Z: 95, A: 241, desc: 'Smoke detectors (α)' },
        { label: 'K-40', Z: 19, A: 40, desc: 'Potassium dating (β⁻/EC)' },
        { label: 'Sr-90', Z: 38, A: 90, desc: 'Fission product (β⁻)' },
        { label: 'Po-210', Z: 84, A: 210, desc: 'Polonium (α)' },
        { label: 'Rn-222', Z: 86, A: 222, desc: 'Radon gas (α)' },
        { label: 'Cs-137', Z: 55, A: 137, desc: 'Fission product (β⁻)' },
        { label: 'Tritium', Z: 1, A: 3, desc: 'Hydrogen-3 (β⁻)' },
    ];

    // =========================================================================
    // NUCLEUS VISUALIZER — Canvas-based rendering
    // =========================================================================

    class NucleusVisualizer {
        constructor(canvas) {
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            this.animId = null;
            this.particles = []; // emitted particles for animation
            this.nucleons = [];
            this.currentZ = 0;
            this.currentA = 0;
            this.decayAnimating = false;
            this.decayProgress = 0;
            this.lastDecayResult = null;
            this.isStable = false;
            this.stableGlow = 0; // animation counter for stable pulse
            this.resize();
        }

        resize() {
            const rect = this.canvas.parentElement.getBoundingClientRect();
            this.canvas.width = rect.width * (window.devicePixelRatio || 1);
            this.canvas.height = rect.height * (window.devicePixelRatio || 1);
            this.canvas.style.width = rect.width + 'px';
            this.canvas.style.height = rect.height + 'px';
            this.ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
            this.w = rect.width;
            this.h = rect.height;
        }

        /**
         * Build nucleon positions for a nucleus with Z protons and N neutrons
         * Uses a shell-like arrangement
         */
        buildNucleus(Z, A) {
            this.currentZ = Z;
            this.currentA = A;
            const N = A - Z;
            this.nucleons = [];

            const cx = this.w * 0.5;
            const cy = this.h * 0.45;

            // Nucleon visual radius scales with total nucleons
            const baseR = Math.max(2.5, Math.min(6, 120 / Math.sqrt(A)));
            const spacing = baseR * 2.4;

            // Place nucleons in concentric shells
            let placed = 0;
            let shell = 0;

            // Center nucleon
            if (placed < A) {
                this.nucleons.push({
                    x: cx, y: cy, r: baseR,
                    type: placed < Z ? 'proton' : 'neutron',
                    baseX: cx, baseY: cy,
                    vx: 0, vy: 0
                });
                placed++;
            }

            while (placed < A) {
                shell++;
                const shellRadius = shell * spacing;
                const circumference = 2 * Math.PI * shellRadius;
                const count = Math.min(A - placed, Math.max(6, Math.floor(circumference / (spacing))));

                for (let i = 0; i < count && placed < A; i++) {
                    const angle = (i / count) * 2 * Math.PI + shell * 0.3;
                    const jitter = (Math.random() - 0.5) * baseR * 0.4;
                    const nx = cx + Math.cos(angle) * shellRadius + jitter;
                    const ny = cy + Math.sin(angle) * shellRadius + jitter;

                    this.nucleons.push({
                        x: nx, y: ny, r: baseR,
                        type: placed < Z ? 'proton' : 'neutron',
                        baseX: nx, baseY: ny,
                        vx: (Math.random() - 0.5) * 0.3,
                        vy: (Math.random() - 0.5) * 0.3
                    });
                    placed++;
                }
            }

            this.particles = [];
            this.decayAnimating = false;
            // Reset stable glow — the controller sets isStable after build
            this.stableGlow = 0;
            if (this._stableAnimId) {
                cancelAnimationFrame(this._stableAnimId);
                this._stableAnimId = null;
            }
        }

        /**
         * Animate a decay event — particles fly off from nucleus
         */
        animateDecay(decayResult, onComplete) {
            if (!decayResult) return;
            this.lastDecayResult = decayResult;
            this.decayAnimating = true;
            this.decayProgress = 0;

            const cx = this.w * 0.5;
            const cy = this.h * 0.45;
            const angle = -Math.PI / 4 + (Math.random() - 0.5) * 0.5;
            const speed = 3;

            // Create emitted particles based on decay type
            switch (decayResult.mode) {
                case 'alpha': {
                    // 2 protons + 2 neutrons fly out
                    for (let i = 0; i < 4; i++) {
                        const a = angle + (Math.random() - 0.5) * 0.3;
                        this.particles.push({
                            x: cx, y: cy,
                            vx: Math.cos(a) * speed * (1 + Math.random() * 0.5),
                            vy: Math.sin(a) * speed * (1 + Math.random() * 0.5),
                            r: 5,
                            type: i < 2 ? 'proton' : 'neutron',
                            alpha: 1.0,
                            trail: []
                        });
                    }
                    break;
                }
                case 'beta-': {
                    this.particles.push({
                        x: cx, y: cy,
                        vx: Math.cos(angle) * speed * 2,
                        vy: Math.sin(angle) * speed * 2,
                        r: 3,
                        type: 'electron',
                        alpha: 1.0,
                        trail: []
                    });
                    // Antineutrino
                    this.particles.push({
                        x: cx, y: cy,
                        vx: Math.cos(angle + Math.PI * 0.6) * speed * 2.5,
                        vy: Math.sin(angle + Math.PI * 0.6) * speed * 2.5,
                        r: 2,
                        type: 'neutrino',
                        alpha: 1.0,
                        trail: []
                    });
                    break;
                }
                case 'beta+': {
                    this.particles.push({
                        x: cx, y: cy,
                        vx: Math.cos(angle) * speed * 2,
                        vy: Math.sin(angle) * speed * 2,
                        r: 3,
                        type: 'positron',
                        alpha: 1.0,
                        trail: []
                    });
                    this.particles.push({
                        x: cx, y: cy,
                        vx: Math.cos(angle + Math.PI * 0.6) * speed * 2.5,
                        vy: Math.sin(angle + Math.PI * 0.6) * speed * 2.5,
                        r: 2,
                        type: 'neutrino',
                        alpha: 1.0,
                        trail: []
                    });
                    break;
                }
                case 'ec': {
                    // Electron spirals inward (reverse), neutrino flies out
                    this.particles.push({
                        x: cx + 100, y: cy - 80,
                        vx: -speed * 1.5,
                        vy: speed * 0.5,
                        r: 3,
                        type: 'electron-capture',
                        alpha: 1.0,
                        trail: []
                    });
                    this.particles.push({
                        x: cx, y: cy,
                        vx: Math.cos(angle) * speed * 2.5,
                        vy: Math.sin(angle) * speed * 2.5,
                        r: 2,
                        type: 'neutrino',
                        alpha: 1.0,
                        trail: []
                    });
                    break;
                }
                case 'gamma': {
                    // Wavy photon
                    for (let i = 0; i < 3; i++) {
                        const a = angle + i * Math.PI * 0.6;
                        this.particles.push({
                            x: cx, y: cy,
                            vx: Math.cos(a) * speed * 3,
                            vy: Math.sin(a) * speed * 3,
                            r: 2,
                            type: 'gamma',
                            alpha: 1.0,
                            phase: Math.random() * Math.PI * 2,
                            trail: []
                        });
                    }
                    break;
                }
            }

            // Animate for 60 frames then rebuild nucleus as daughter
            let frame = 0;
            const totalFrames = 60;

            const animStep = () => {
                frame++;
                this.decayProgress = frame / totalFrames;

                // Update emitted particles
                for (const p of this.particles) {
                    p.trail.push({ x: p.x, y: p.y });
                    if (p.trail.length > 12) p.trail.shift();
                    p.x += p.vx;
                    p.y += p.vy;
                    p.alpha = Math.max(0, 1 - frame / totalFrames);
                }

                // Jiggle remaining nucleons
                for (const n of this.nucleons) {
                    n.x = n.baseX + (Math.random() - 0.5) * 2 * (1 - this.decayProgress);
                    n.y = n.baseY + (Math.random() - 0.5) * 2 * (1 - this.decayProgress);
                }

                this.render();

                if (frame < totalFrames) {
                    this.animId = requestAnimationFrame(animStep);
                } else {
                    this.decayAnimating = false;
                    this.particles = [];
                    this.buildNucleus(decayResult.daughter.Z, decayResult.daughter.A);
                    this.render();
                    if (onComplete) onComplete();
                }
            };

            animStep();
        }

        /**
         * Render the nucleus and any emitted particles
         */
        render() {
            const ctx = this.ctx;
            ctx.save();
            ctx.setTransform(window.devicePixelRatio || 1, 0, 0, window.devicePixelRatio || 1, 0, 0);
            ctx.clearRect(0, 0, this.w, this.h);

            // Background subtle grid
            ctx.strokeStyle = 'rgba(100,116,139,0.06)';
            ctx.lineWidth = 1;
            for (let x = 0; x < this.w; x += 40) {
                ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, this.h); ctx.stroke();
            }
            for (let y = 0; y < this.h; y += 40) {
                ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(this.w, y); ctx.stroke();
            }

            // Draw nucleus glow
            if (this.nucleons.length > 0) {
                const cx = this.w * 0.5;
                const cy = this.h * 0.45;
                const glowR = Math.sqrt(this.currentA) * 10 + 20;
                const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowR);
                glow.addColorStop(0, 'rgba(99,102,241,0.12)');
                glow.addColorStop(1, 'rgba(99,102,241,0)');
                ctx.fillStyle = glow;
                ctx.beginPath();
                ctx.arc(cx, cy, glowR, 0, Math.PI * 2);
                ctx.fill();
            }

            // Draw nucleons
            for (const n of this.nucleons) {
                ctx.beginPath();
                ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
                if (n.type === 'proton') {
                    ctx.fillStyle = '#f87171'; // Red for protons
                } else {
                    ctx.fillStyle = '#60a5fa'; // Blue for neutrons
                }
                ctx.fill();
                ctx.strokeStyle = 'rgba(255,255,255,0.15)';
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }

            // Draw emitted particles with trails
            for (const p of this.particles) {
                // Trail
                if (p.trail.length > 1) {
                    ctx.beginPath();
                    ctx.moveTo(p.trail[0].x, p.trail[0].y);
                    for (let i = 1; i < p.trail.length; i++) {
                        ctx.lineTo(p.trail[i].x, p.trail[i].y);
                    }
                    ctx.lineTo(p.x, p.y);
                    ctx.strokeStyle = this._particleColor(p.type, p.alpha * 0.4);
                    ctx.lineWidth = p.r * 0.8;
                    ctx.lineCap = 'round';
                    ctx.stroke();
                }

                // Particle
                ctx.beginPath();
                if (p.type === 'gamma') {
                    // Draw as wavy line
                    const waveAmp = 5;
                    const phase = (p.phase || 0) + Date.now() * 0.01;
                    ctx.beginPath();
                    ctx.arc(p.x + Math.sin(phase) * waveAmp, p.y + Math.cos(phase) * waveAmp, p.r, 0, Math.PI * 2);
                } else {
                    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                }
                ctx.fillStyle = this._particleColor(p.type, p.alpha);
                ctx.fill();

                // Labels on particles
                if (p.alpha > 0.3) {
                    ctx.fillStyle = `rgba(255,255,255,${p.alpha * 0.8})`;
                    ctx.font = '9px Inter, sans-serif';
                    ctx.textAlign = 'center';
                    const label = p.type === 'proton' ? 'p' : p.type === 'neutron' ? 'n' :
                        p.type === 'electron' ? 'e⁻' : p.type === 'positron' ? 'e⁺' :
                        p.type === 'neutrino' ? 'ν' : p.type === 'gamma' ? 'γ' :
                        p.type === 'electron-capture' ? 'e⁻' : '';
                    ctx.fillText(label, p.x, p.y - p.r - 4);
                }
            }

            // Legend
            const lx = 16, ly = this.h - 50;
            ctx.font = '10px Inter, sans-serif';
            ctx.fillStyle = '#94a3b8';
            ctx.textAlign = 'left';

            // Proton legend
            ctx.beginPath(); ctx.arc(lx + 5, ly, 5, 0, Math.PI * 2);
            ctx.fillStyle = '#f87171'; ctx.fill();
            ctx.fillStyle = '#94a3b8';
            ctx.fillText('Proton', lx + 14, ly + 3);

            // Neutron legend
            ctx.beginPath(); ctx.arc(lx + 75, ly, 5, 0, Math.PI * 2);
            ctx.fillStyle = '#60a5fa'; ctx.fill();
            ctx.fillStyle = '#94a3b8';
            ctx.fillText('Neutron', lx + 84, ly + 3);

            // Isotope label — nuclear notation: mass number as superscript-left of symbol
            if (this.currentZ > 0) {
                const sym = ELEMENT_SYMBOLS[this.currentZ] || `E${this.currentZ}`;
                const name = ELEMENT_NAMES[this.currentZ] || '';
                const labelY = this.h * 0.45 + Math.sqrt(this.currentA) * 10 + 55;

                // Measure symbol width to position mass number precisely
                ctx.font = 'bold 36px Inter, sans-serif';
                const symWidth = ctx.measureText(sym).width;

                // Draw element symbol centered
                ctx.textAlign = 'center';
                ctx.fillStyle = '#e2e8f0';
                ctx.fillText(sym, this.w * 0.5 + 10, labelY);

                // Draw mass number as superscript to upper-left of symbol
                ctx.font = 'bold 18px Inter, sans-serif';
                ctx.textAlign = 'right';
                ctx.fillStyle = '#94a3b8';
                ctx.fillText(`${this.currentA}`, this.w * 0.5 + 10 - symWidth / 2 - 4, labelY - 16);

                // Name label below
                ctx.textAlign = 'center';
                ctx.font = '12px Inter, sans-serif';
                ctx.fillStyle = '#64748b';
                ctx.fillText(`${name}-${this.currentA}`, this.w * 0.5, labelY + 18);
                ctx.fillText(`Z=${this.currentZ}  N=${this.currentA - this.currentZ}  A=${this.currentA}`, this.w * 0.5, labelY + 34);

                // STABLE indicator — glowing green badge on the canvas
                if (this.isStable) {
                    this.stableGlow = (this.stableGlow || 0) + 0.03;
                    const pulse = 0.7 + Math.sin(this.stableGlow) * 0.3;

                    // Green glow behind badge
                    const badgeY = labelY - 42;
                    const grd = ctx.createRadialGradient(this.w * 0.5, badgeY, 0, this.w * 0.5, badgeY, 60);
                    grd.addColorStop(0, `rgba(52,211,153,${0.15 * pulse})`);
                    grd.addColorStop(1, 'rgba(52,211,153,0)');
                    ctx.fillStyle = grd;
                    ctx.beginPath();
                    ctx.arc(this.w * 0.5, badgeY, 60, 0, Math.PI * 2);
                    ctx.fill();

                    // Badge pill
                    const badgeW = 80, badgeH = 24;
                    const bx = this.w * 0.5 - badgeW / 2;
                    const by = badgeY - badgeH / 2;
                    ctx.fillStyle = `rgba(16,185,129,${0.2 * pulse})`;
                    ctx.strokeStyle = `rgba(52,211,153,${0.6 * pulse})`;
                    ctx.lineWidth = 1.5;
                    ctx.beginPath();
                    ctx.roundRect(bx, by, badgeW, badgeH, 12);
                    ctx.fill();
                    ctx.stroke();

                    ctx.font = 'bold 11px Inter, sans-serif';
                    ctx.fillStyle = `rgba(52,211,153,${pulse})`;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText('✓ STABLE', this.w * 0.5, badgeY);
                    ctx.textBaseline = 'alphabetic';

                    // Keep animating the pulse
                    if (!this._stableAnimId) {
                        const pulseLoop = () => {
                            if (!this.isStable) { this._stableAnimId = null; return; }
                            this.render();
                            this._stableAnimId = requestAnimationFrame(pulseLoop);
                        };
                        this._stableAnimId = requestAnimationFrame(pulseLoop);
                    }
                }
            }

            ctx.restore();
        }

        _particleColor(type, alpha) {
            switch (type) {
                case 'proton': return `rgba(248,113,113,${alpha})`;
                case 'neutron': return `rgba(96,165,250,${alpha})`;
                case 'electron': return `rgba(52,211,153,${alpha})`;
                case 'positron': return `rgba(251,146,60,${alpha})`;
                case 'neutrino': return `rgba(167,139,250,${alpha * 0.6})`;
                case 'gamma': return `rgba(250,204,21,${alpha})`;
                case 'electron-capture': return `rgba(52,211,153,${alpha})`;
                default: return `rgba(255,255,255,${alpha})`;
            }
        }

        stop() {
            if (this.animId) cancelAnimationFrame(this.animId);
            if (this._stableAnimId) cancelAnimationFrame(this._stableAnimId);
            this._stableAnimId = null;
        }
    }

    // =========================================================================
    // DECAY CHAIN RENDERER — draws the chain in a side panel or below
    // =========================================================================

    function renderDecayChain(chain, container, currentIndex) {
        container.innerHTML = '';

        const wrapper = document.createElement('div');
        wrapper.className = 'space-y-1';

        chain.forEach((step, i) => {
            const isActive = i === currentIndex;
            const isPast = i < currentIndex;

            // Isotope box
            const box = document.createElement('div');
            box.className = `flex items-center gap-2 px-2 py-1.5 rounded-lg transition-all text-xs ${
                isActive ? 'bg-indigo-500/20 border border-indigo-500/40 ring-1 ring-indigo-500/20' :
                isPast ? 'bg-slate-800/30 opacity-60' :
                'bg-slate-800/20 opacity-40'
            }`;

            const symbol = step.symbol || ELEMENT_SYMBOLS[step.Z] || '?';
            const name = step.name || ELEMENT_NAMES[step.Z] || '?';

            box.innerHTML = `
                <div class="flex-shrink-0 w-10 h-10 rounded-lg ${isActive ? 'bg-indigo-500/30' : 'bg-slate-700/30'} flex flex-col items-center justify-center">
                    <span class="text-[8px] text-slate-400">${step.A}</span>
                    <span class="font-black text-sm ${isActive ? 'text-indigo-300' : 'text-slate-300'}">${symbol}</span>
                </div>
                <div class="flex-1 min-w-0">
                    <div class="font-bold ${isActive ? 'text-white' : 'text-slate-400'} truncate">${name}-${step.A}</div>
                    <div class="text-[9px] text-slate-500">Z=${step.Z} N=${step.A - step.Z}</div>
                </div>
                ${step.stable ? '<span class="text-[8px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">STABLE</span>' : ''}
            `;
            wrapper.appendChild(box);

            // Arrow + decay mode between steps
            if (!step.stable && step.mode && i < chain.length - 1) {
                const arrow = document.createElement('div');
                arrow.className = 'flex items-center gap-1.5 pl-4 py-0.5';

                const modeColor = step.mode === 'alpha' ? 'text-red-400' :
                    step.mode === 'beta-' ? 'text-green-400' :
                    step.mode === 'beta+' ? 'text-orange-400' :
                    step.mode === 'ec' ? 'text-purple-400' :
                    step.mode === 'gamma' ? 'text-yellow-400' : 'text-slate-400';

                const modeLabel = step.mode === 'alpha' ? 'α' :
                    step.mode === 'beta-' ? 'β⁻' :
                    step.mode === 'beta+' ? 'β⁺' :
                    step.mode === 'ec' ? 'EC' :
                    step.mode === 'gamma' ? 'γ' : step.mode;

                const engine = new DecayEngine();

                arrow.innerHTML = `
                    <span class="material-icons-round text-slate-600 text-sm">south</span>
                    <span class="${modeColor} font-black text-[10px]">${modeLabel}</span>
                    <span class="text-[8px] text-slate-600">${step.energyMeV ? step.energyMeV + ' MeV' : ''}</span>
                    <span class="text-[8px] text-slate-600">${step.halfLife ? 't½ ' + engine.formatHalfLife(step.halfLife) : ''}</span>
                `;
                wrapper.appendChild(arrow);
            }
        });

        container.appendChild(wrapper);

        // Auto-scroll to active element
        const activeEl = container.querySelector('.ring-1');
        if (activeEl) {
            activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    // =========================================================================
    // EQUATION RENDERER — visual nuclear equation
    // =========================================================================

    function renderEquation(decayResult, container) {
        if (!decayResult) {
            container.innerHTML = '<div class="text-slate-600 text-xs text-center py-4 italic">Perform a decay to see the equation</div>';
            return;
        }

        const { parent, daughter, mode, emitted, energyMeV } = decayResult;

        const modeLabel = mode === 'alpha' ? 'Alpha Decay (α)' :
            mode === 'beta-' ? 'Beta-Minus Decay (β⁻)' :
            mode === 'beta+' ? 'Beta-Plus Decay (β⁺)' :
            mode === 'ec' ? 'Electron Capture (EC)' :
            mode === 'gamma' ? 'Gamma Emission (γ)' : mode;

        const modeColor = mode === 'alpha' ? 'text-red-400 border-red-500/30 bg-red-500/5' :
            mode === 'beta-' ? 'text-green-400 border-green-500/30 bg-green-500/5' :
            mode === 'beta+' ? 'text-orange-400 border-orange-500/30 bg-orange-500/5' :
            mode === 'ec' ? 'text-purple-400 border-purple-500/30 bg-purple-500/5' :
            mode === 'gamma' ? 'text-yellow-400 border-yellow-500/30 bg-yellow-500/5' : '';

        container.innerHTML = `
            <div class="space-y-3">
                <div class="flex items-center gap-2">
                    <span class="text-[9px] font-black ${modeColor} uppercase tracking-widest px-2 py-0.5 rounded border">${modeLabel}</span>
                    <span class="text-[9px] text-slate-500">${energyMeV} MeV released</span>
                </div>

                <!-- Nuclear Equation -->
                <div class="flex items-center gap-3 justify-center py-3 bg-slate-800/30 rounded-xl border border-slate-700/30 px-4 overflow-x-auto">
                    <!-- Parent -->
                    <div class="flex items-start gap-0.5 flex-shrink-0">
                        <div class="flex flex-col items-end text-[10px] leading-tight font-mono text-slate-400 mr-0.5">
                            <span>${parent.A}</span>
                            <span>${parent.Z}</span>
                        </div>
                        <span class="text-xl font-black text-white">${parent.symbol}</span>
                    </div>

                    <span class="text-slate-500 text-lg font-light flex-shrink-0">→</span>

                    <!-- Daughter -->
                    <div class="flex items-start gap-0.5 flex-shrink-0">
                        <div class="flex flex-col items-end text-[10px] leading-tight font-mono text-slate-400 mr-0.5">
                            <span>${daughter.A}</span>
                            <span>${daughter.Z}</span>
                        </div>
                        <span class="text-xl font-black text-indigo-300">${daughter.symbol}</span>
                    </div>

                    <span class="text-slate-500 text-lg font-light flex-shrink-0">+</span>

                    <!-- Emitted particle(s) -->
                    ${mode === 'alpha' ? `
                        <div class="flex items-start gap-0.5 flex-shrink-0">
                            <div class="flex flex-col items-end text-[10px] leading-tight font-mono text-red-400/80 mr-0.5">
                                <span>4</span><span>2</span>
                            </div>
                            <span class="text-xl font-black text-red-400">He</span>
                        </div>
                    ` : mode === 'beta-' ? `
                        <div class="flex items-start gap-0.5 flex-shrink-0">
                            <div class="flex flex-col items-end text-[10px] leading-tight font-mono text-green-400/80 mr-0.5">
                                <span>0</span><span>-1</span>
                            </div>
                            <span class="text-xl font-black text-green-400">e</span>
                        </div>
                        <span class="text-slate-500 text-lg font-light flex-shrink-0">+</span>
                        <span class="text-lg text-purple-400/60 flex-shrink-0">ν̄ₑ</span>
                    ` : mode === 'beta+' ? `
                        <div class="flex items-start gap-0.5 flex-shrink-0">
                            <div class="flex flex-col items-end text-[10px] leading-tight font-mono text-orange-400/80 mr-0.5">
                                <span>0</span><span>+1</span>
                            </div>
                            <span class="text-xl font-black text-orange-400">e</span>
                        </div>
                        <span class="text-slate-500 text-lg font-light flex-shrink-0">+</span>
                        <span class="text-lg text-purple-400/60 flex-shrink-0">νₑ</span>
                    ` : mode === 'ec' ? `
                        <span class="text-lg text-purple-400/60 flex-shrink-0">νₑ</span>
                    ` : mode === 'gamma' ? `
                        <span class="text-xl font-black text-yellow-400 flex-shrink-0">γ</span>
                    ` : ''}
                </div>

                <!-- Description -->
                <div class="text-[10px] text-slate-400 leading-relaxed">${decayResult.description}</div>
            </div>
        `;
    }

    // =========================================================================
    // PAGE CONTROLLER
    // =========================================================================

    class NuclearDecayPage {
        constructor() {
            this.engine = new DecayEngine();
            this.visualizer = null;
            this.currentZ = 92;
            this.currentA = 238;
            this.chain = [];
            this.chainIndex = 0;
            this.autoPlaying = false;
            this.autoTimer = null;
            this.initialized = false;
        }

        init() {
            if (this.initialized) {
                // Just resize and re-render on re-entry
                if (this.visualizer) {
                    this.visualizer.resize();
                    this.visualizer.render();
                }
                return;
            }

            const canvas = document.getElementById('nd-canvas');
            if (!canvas) return;

            this.visualizer = new NucleusVisualizer(canvas);
            this.bindEvents();
            this.loadIsotope(this.currentZ, this.currentA);
            this.renderPresets();
            this.initialized = true;
        }

        bindEvents() {
            // Decay step button
            document.getElementById('nd-step-btn')?.addEventListener('click', () => this.stepDecay());

            // Auto-play button
            document.getElementById('nd-auto-btn')?.addEventListener('click', () => this.toggleAutoPlay());

            // Reset button
            document.getElementById('nd-reset-btn')?.addEventListener('click', () => this.reset());

            // Custom isotope inputs
            document.getElementById('nd-z-input')?.addEventListener('change', () => this.loadFromInputs());
            document.getElementById('nd-a-input')?.addEventListener('change', () => this.loadFromInputs());
            document.getElementById('nd-load-btn')?.addEventListener('click', () => this.loadFromInputs());

            // Resize
            window.addEventListener('resize', () => {
                if (this.visualizer && !document.getElementById('nuclear-page')?.classList.contains('hidden')) {
                    this.visualizer.resize();
                    this.visualizer.render();
                }
            });
        }

        renderPresets() {
            const container = document.getElementById('nd-presets');
            if (!container) return;
            container.innerHTML = '';

            PRESETS.forEach(p => {
                const btn = document.createElement('button');
                btn.className = `text-left px-2 py-1.5 rounded-lg border transition-all text-xs hover:bg-slate-700/50 ${
                    this.currentZ === p.Z && this.currentA === p.A
                        ? 'border-indigo-500/50 bg-indigo-500/10 text-indigo-300'
                        : 'border-slate-700/30 bg-slate-800/30 text-slate-400 hover:text-slate-200'
                }`;
                btn.innerHTML = `<span class="font-bold">${p.label}</span><br><span class="text-[8px] text-slate-500">${p.desc}</span>`;
                btn.onclick = () => {
                    this.stopAutoPlay();
                    this.loadIsotope(p.Z, p.A);
                    this.renderPresets();
                };
                container.appendChild(btn);
            });
        }

        loadIsotope(Z, A) {
            this.currentZ = Z;
            this.currentA = A;
            this.chain = this.engine.getDecayChain(Z, A);
            this.chainIndex = 0;

            // Update inputs
            const zInput = document.getElementById('nd-z-input');
            const aInput = document.getElementById('nd-a-input');
            if (zInput) zInput.value = Z;
            if (aInput) aInput.value = A;

            // Build nucleus and check stability
            const iso = this.engine.getIsotope(Z, A);
            this.visualizer.buildNucleus(Z, A);
            this.visualizer.isStable = !!iso.stable;
            this.visualizer.render();

            // Update chain display
            const chainContainer = document.getElementById('nd-chain');
            if (chainContainer) renderDecayChain(this.chain, chainContainer, 0);

            // Clear equation
            const eqContainer = document.getElementById('nd-equation');
            if (eqContainer) renderEquation(null, eqContainer);

            // Update status
            this.updateStatus();
        }

        loadFromInputs() {
            const Z = parseInt(document.getElementById('nd-z-input')?.value || '92');
            const A = parseInt(document.getElementById('nd-a-input')?.value || '238');

            if (Z < 1 || Z > 118 || A < Z || A > Z * 3 + 2) {
                // Invalid input
                return;
            }

            this.stopAutoPlay();
            this.loadIsotope(Z, A);
            this.renderPresets();
        }

        stepDecay() {
            const iso = this.engine.getIsotope(this.currentZ, this.currentA);
            if (iso.stable) return;

            if (this.visualizer.decayAnimating) return;

            const result = this.engine.decay(this.currentZ, this.currentA);
            if (!result) return;

            // Animate
            this.visualizer.animateDecay(result, () => {
                this.currentZ = result.daughter.Z;
                this.currentA = result.daughter.A;
                this.chainIndex++;

                // Check if daughter is stable and set visual indicator
                const dIso = this.engine.getIsotope(this.currentZ, this.currentA);
                this.visualizer.isStable = !!dIso.stable;
                this.visualizer.render();

                // Update chain display
                const chainContainer = document.getElementById('nd-chain');
                if (chainContainer) renderDecayChain(this.chain, chainContainer, this.chainIndex);

                this.updateStatus();

                // If auto-playing, schedule next step
                if (this.autoPlaying) {
                    if (dIso.stable) {
                        this.stopAutoPlay();
                    } else {
                        this.autoTimer = setTimeout(() => this.stepDecay(), 1200);
                    }
                }
            });

            // Update equation
            const eqContainer = document.getElementById('nd-equation');
            if (eqContainer) renderEquation(result, eqContainer);
        }

        toggleAutoPlay() {
            if (this.autoPlaying) {
                this.stopAutoPlay();
            } else {
                this.autoPlaying = true;
                const btn = document.getElementById('nd-auto-btn');
                if (btn) {
                    btn.innerHTML = '<span class="material-icons-round text-sm">pause</span> Pause';
                    btn.classList.remove('bg-emerald-600/80');
                    btn.classList.add('bg-amber-600/80');
                }
                this.stepDecay();
            }
        }

        stopAutoPlay() {
            this.autoPlaying = false;
            if (this.autoTimer) clearTimeout(this.autoTimer);
            this.autoTimer = null;
            const btn = document.getElementById('nd-auto-btn');
            if (btn) {
                btn.innerHTML = '<span class="material-icons-round text-sm">fast_forward</span> Auto-Play';
                btn.classList.remove('bg-amber-600/80');
                btn.classList.add('bg-emerald-600/80');
            }
        }

        reset() {
            this.stopAutoPlay();
            this.loadIsotope(this.currentZ === this.chain[0]?.Z ? this.currentZ : this.chain[0]?.Z || 92,
                            this.currentA === this.chain[0]?.A ? this.currentA : this.chain[0]?.A || 238);

            // If we're mid-chain, reset to original
            if (this.chain.length > 0) {
                this.loadIsotope(this.chain[0].Z, this.chain[0].A);
            }
        }

        updateStatus() {
            const iso = this.engine.getIsotope(this.currentZ, this.currentA);
            const sym = ELEMENT_SYMBOLS[this.currentZ] || '?';

            // Update HUD stats
            const elZ = document.getElementById('nd-stat-z');
            const elN = document.getElementById('nd-stat-n');
            const elA = document.getElementById('nd-stat-a');
            const elHL = document.getElementById('nd-stat-halflife');

            if (elZ) elZ.textContent = this.currentZ;
            if (elN) elN.textContent = this.currentA - this.currentZ;
            if (elA) elA.textContent = this.currentA;
            if (elHL) elHL.textContent = this.engine.formatHalfLife(iso.halfLife);

            // Update step button state
            const stepBtn = document.getElementById('nd-step-btn');
            if (stepBtn) {
                if (iso.stable) {
                    stepBtn.disabled = true;
                    stepBtn.classList.add('opacity-40');
                    stepBtn.innerHTML = '<span class="material-icons-round text-sm">check_circle</span> Stable';
                } else {
                    stepBtn.disabled = false;
                    stepBtn.classList.remove('opacity-40');
                    stepBtn.innerHTML = '<span class="material-icons-round text-sm">play_arrow</span> Decay Step';
                }
            }
        }

        stop() {
            this.stopAutoPlay();
            if (this.visualizer) this.visualizer.stop();
        }
    }

    // =========================================================================
    // EXPOSE GLOBAL INIT
    // =========================================================================

    const ndPage = new NuclearDecayPage();
    window.ndPage = ndPage;
    window.initNuclearDecay = function() {
        ndPage.init();
    };

})();
