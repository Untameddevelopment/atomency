/**
 * Analysis Page Module
 * Handles the molecular analysis page functionality
 */

(function() {
    'use strict';

    /**
     * Initialize the analysis page
     */
    function initAnalysisPage() {
        // Auto-refresh when analysis page is shown
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.target.id === 'analysis-page') {
                    const analysisPage = document.getElementById('analysis-page');
                    if (analysisPage && !analysisPage.classList.contains('hidden')) {
                        refreshAnalysis();
                    }
                }
            });
        });

        const analysisPage = document.getElementById('analysis-page');
        if (analysisPage) {
            observer.observe(analysisPage, { attributes: true, attributeFilter: ['class'] });
        }
    }

    /**
     * Refresh the analysis page with current engine data
     */
    function refreshAnalysis() {
        // Check if engine exists and is initialized
        if (typeof engine === 'undefined' || !engine) {
            console.warn('Chemistry engine not initialized');
            showAnalysisError('Chemistry engine not available. Please build some molecules in the Lab first.');
            return;
        }

        try {
            const atoms = engine.atoms || [];
            const bonds = engine.bonds || [];
            const molecules = engine.molecules || [];

            // Update summary stats
            updateSummaryStats(atoms, bonds, molecules);

            // Update molecules list
            updateMoleculesList(molecules, atoms);

            // Update element composition
            updateElementComposition(atoms);

            // Update bond distribution
            updateBondDistribution(bonds);

            // Update environment info
            updateEnvironmentInfo();
        } catch (error) {
            console.error('Error refreshing analysis:', error);
            showAnalysisError('Error analyzing data: ' + error.message);
        }
    }

    /**
     * Update summary statistics
     */
    function updateSummaryStats(atoms, bonds, molecules) {
        // Count multi-atom molecules
        const multiAtomMolecules = molecules.filter(m => m.atomIds && m.atomIds.length > 1);

        // Calculate total mass
        const totalMass = atoms.reduce((sum, atom) => {
            const atomicMass = atom.element?.atomicMass || atom.element?.atomic_mass || 0;
            return sum + atomicMass;
        }, 0);

        // Update DOM elements
        safeSetText('analysis-total-atoms', atoms.length);
        safeSetText('analysis-total-bonds', bonds.length);
        safeSetText('analysis-total-molecules', multiAtomMolecules.length);
        safeSetText('analysis-total-mass', totalMass.toFixed(2));
    }

    /**
     * Update molecules list
     */
    function updateMoleculesList(molecules, atoms) {
        const container = document.getElementById('analysis-molecules-list');
        if (!container) return;

        const multiAtomMols = molecules.filter(m => m.atomIds && m.atomIds.length > 1);

        if (multiAtomMols.length === 0) {
            container.innerHTML = `
                <div class="flex flex-col items-center justify-center py-12 text-center">
                    <div class="bg-slate-800/50 p-4 rounded-full mb-4">
                        <span class="material-icons-round text-4xl text-slate-600">science</span>
                    </div>
                    <div class="text-sm text-slate-500 italic max-w-md">
                        No molecules on canvas. Build molecules in the Lab to see analysis here.
                    </div>
                </div>
            `;
            return;
        }

        container.innerHTML = multiAtomMols.map(mol => {
            const molAtoms = mol.atomIds
                .map(id => atoms.find(a => a.id === id))
                .filter(Boolean);

            const mass = molAtoms.reduce((sum, atom) => {
                return sum + (atom.element?.atomicMass || 0);
            }, 0);

            // Determine colors based on properties
            const stability = mol.stability || 50;
            const stabilityColor = stability >= 70 ? 'text-emerald-400' :
                                  stability >= 40 ? 'text-amber-400' : 'text-rose-400';
            const stabilityBarColor = stability >= 70 ? 'bg-emerald-500' :
                                       stability >= 40 ? 'bg-amber-500' : 'bg-rose-500';

            const stateOfMatter = mol.stateOfMatter || 'Unknown';
            const stateColor = stateOfMatter === 'Gas' ? 'text-emerald-400' :
                             stateOfMatter === 'Liquid' ? 'text-blue-400' :
                             stateOfMatter === 'Solid' ? 'text-slate-300' : 'text-slate-400';

            const netCharge = mol.netCharge || 0;
            const chargeColor = netCharge !== 0 ? 'text-blue-400' : 'text-white';

            return `
                <div class="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4 hover:border-slate-600/50 transition-colors">
                    <div class="flex items-center justify-between mb-3">
                        <div class="flex items-center gap-2">
                            <span class="text-xl font-mono font-black text-white">${escapeHtml(mol.formula || 'Unknown')}</span>
                            ${mol.commonName ? `<span class="text-xs text-slate-400">${escapeHtml(mol.commonName)}</span>` : ''}
                        </div>
                        <div class="flex items-center gap-2">
                            ${stateOfMatter !== 'Unknown' ? `
                                <span class="text-[9px] px-2 py-1 rounded-full bg-slate-700/50 ${stateColor} font-black uppercase tracking-wider">
                                    ${escapeHtml(stateOfMatter)}
                                </span>
                            ` : ''}
                            <span class="text-[9px] px-2 py-1 rounded-full bg-slate-700/50 ${stabilityColor} font-black uppercase tracking-wider">
                                ${Math.round(stability)}% stable
                            </span>
                        </div>
                    </div>
                    <div class="grid grid-cols-4 gap-3 text-center">
                        <div class="bg-slate-900/30 rounded-lg p-2">
                            <div class="text-[8px] text-slate-500 uppercase font-black tracking-wider">Atoms</div>
                            <div class="text-sm font-bold text-white">${mol.atomIds.length}</div>
                        </div>
                        <div class="bg-slate-900/30 rounded-lg p-2">
                            <div class="text-[8px] text-slate-500 uppercase font-black tracking-wider">Mass</div>
                            <div class="text-sm font-bold text-white">${mass.toFixed(2)} amu</div>
                        </div>
                        <div class="bg-slate-900/30 rounded-lg p-2">
                            <div class="text-[8px] text-slate-500 uppercase font-black tracking-wider">Electrons</div>
                            <div class="text-sm font-bold text-white">${mol.totalElectrons || 0}</div>
                        </div>
                        <div class="bg-slate-900/30 rounded-lg p-2">
                            <div class="text-[8px] text-slate-500 uppercase font-black tracking-wider">Charge</div>
                            <div class="text-sm font-bold ${chargeColor}">
                                ${netCharge > 0 ? '+' : ''}${netCharge}
                            </div>
                        </div>
                    </div>
                    <div class="mt-3">
                        <div class="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                            <div class="h-full ${stabilityBarColor} transition-all duration-300" style="width: ${Math.max(5, stability)}%"></div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    /**
     * Update element composition
     */
    function updateElementComposition(atoms) {
        const container = document.getElementById('analysis-element-bars');
        if (!container) return;

        if (atoms.length === 0) {
            container.innerHTML = `
                <div class="flex flex-col items-center justify-center py-12 text-center">
                    <div class="bg-slate-800/50 p-4 rounded-full mb-4">
                        <span class="material-icons-round text-4xl text-slate-600">category</span>
                    </div>
                    <div class="text-sm text-slate-500 italic">
                        No atoms on canvas.
                    </div>
                </div>
            `;
            return;
        }

        // Count elements
        const elemCounts = {};
        atoms.forEach(atom => {
            const sym = atom.element?.symbol || '?';
            const name = atom.element?.name || sym;
            const color = atom.element?.color || '#6366f1';

            if (!elemCounts[sym]) {
                elemCounts[sym] = { count: 0, name, color };
            }
            elemCounts[sym].count++;
        });

        // Sort by count (descending)
        const sortedElems = Object.entries(elemCounts)
            .sort(([, a], [, b]) => b.count - a.count);

        const maxCount = sortedElems[0][1].count;

        container.innerHTML = sortedElems.map(([sym, data]) => {
            const pct = (data.count / maxCount * 100).toFixed(0);

            return `
                <div class="flex items-center gap-3 group">
                    <div class="w-10 text-right">
                        <span class="font-mono font-bold text-white text-sm">${escapeHtml(sym)}</span>
                    </div>
                    <div class="flex-1">
                        <div class="flex items-center justify-between mb-1">
                            <span class="text-[10px] text-slate-400">${escapeHtml(data.name)}</span>
                            <span class="text-[10px] font-bold text-slate-300">${data.count}</span>
                        </div>
                        <div class="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div class="h-full rounded-full transition-all duration-300 hover:brightness-110"
                                 style="width: ${pct}%; background-color: ${data.color};">
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    /**
     * Update bond distribution
     */
    function updateBondDistribution(bonds) {
        const container = document.getElementById('analysis-bond-bars');
        if (!container) return;

        if (bonds.length === 0) {
            container.innerHTML = `
                <div class="flex flex-col items-center justify-center py-12 text-center">
                    <div class="bg-slate-800/50 p-4 rounded-full mb-4">
                        <span class="material-icons-round text-4xl text-slate-600">link</span>
                    </div>
                    <div class="text-sm text-slate-500 italic">
                        No bonds on canvas.
                    </div>
                </div>
            `;
            return;
        }

        // Count bond types
        const bondCounts = { single: 0, double: 0, triple: 0 };
        bonds.forEach(bond => {
            const order = bond.order || 1;
            if (order >= 3) bondCounts.triple++;
            else if (order >= 2) bondCounts.double++;
            else bondCounts.single++;
        });

        const maxBond = Math.max(bondCounts.single, bondCounts.double, bondCounts.triple, 1);

        const bondTypes = [
            { label: 'Single', count: bondCounts.single, color: 'bg-slate-400' },
            { label: 'Double', count: bondCounts.double, color: 'bg-blue-400' },
            { label: 'Triple', count: bondCounts.triple, color: 'bg-purple-400' }
        ];

        container.innerHTML = bondTypes.map(bt => {
            const pct = maxBond > 0 ? (bt.count / maxBond * 100).toFixed(0) : 0;
            const bondPct = bonds.length > 0 ? (bt.count / bonds.length * 100).toFixed(0) : 0;

            return `
                <div class="flex items-center gap-3">
                    <div class="w-14 text-right">
                        <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">${bt.label}</span>
                    </div>
                    <div class="flex-1">
                        <div class="flex items-center justify-between mb-1">
                            <span class="text-[10px] text-slate-500">${bt.count} bond${bt.count !== 1 ? 's' : ''}</span>
                            <span class="text-[10px] font-bold text-slate-300">${bondPct}%</span>
                        </div>
                        <div class="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div class="h-full rounded-full ${bt.color} transition-all duration-300" style="width: ${pct}%"></div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    /**
     * Update environment info
     */
    function updateEnvironmentInfo() {
        if (typeof engine === 'undefined' || !engine) return;

        const tempEl = document.getElementById('analysis-temperature');
        const pressEl = document.getElementById('analysis-pressure');

        if (tempEl) {
            tempEl.textContent = (engine.temperature || 298) + ' K';
        }

        if (pressEl) {
            pressEl.textContent = (engine.pressure || 1.0).toFixed(1) + ' atm';
        }
    }

    /**
     * Show an error message in the analysis page
     */
    function showAnalysisError(message) {
        const summaryEl = document.getElementById('analysis-summary');
        if (summaryEl) {
            summaryEl.innerHTML = `
                <div class="col-span-4 bg-red-900/20 border border-red-800/50 rounded-2xl p-6 text-center">
                    <span class="material-icons-round text-4xl text-red-400 mb-3">error_outline</span>
                    <div class="text-sm text-red-300">${escapeHtml(message)}</div>
                </div>
            `;
        }
    }

    /**
     * Safely set text content of an element
     */
    function safeSetText(id, text) {
        const el = document.getElementById(id);
        if (el) {
            el.textContent = text;
        }
    }

    /**
     * Escape HTML to prevent XSS
     */
    function escapeHtml(text) {
        if (typeof text !== 'string') return text;
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Export functions to global scope
    window.refreshAnalysis = refreshAnalysis;

    // Initialize on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAnalysisPage);
    } else {
        initAnalysisPage();
    }

})();
