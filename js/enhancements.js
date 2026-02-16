// ===================
// ATOMENCY ENHANCEMENTS v1.1
// ===================

// ===================
// HELP MODAL FUNCTIONS
// ===================
function showHelpModal() {
    document.getElementById('help-modal').classList.remove('hidden');
}

function closeHelpModal() {
    document.getElementById('help-modal').classList.add('hidden');
}

// ===================
// KEYBOARD SHORTCUTS
// ===================
document.addEventListener('keydown', function(e) {
    // Show help on '?'
    if (e.key === '?' && !isInputFocused()) {
        e.preventDefault();
        showHelpModal();
    }

    // Close modals on Escape
    if (e.key === 'Escape') {
        closeModal();
        closeHelpModal();
        const ptOverlay = document.getElementById('pt-overlay');
        if (ptOverlay && !ptOverlay.classList.contains('hidden')) {
            ptOverlay.classList.add('hidden');
        }
    }

    // Reset camera on Space (only in lab mode)
    if (e.key === ' ' && !isInputFocused() && document.getElementById('simulator-page').classList.contains('hidden') === false) {
        e.preventDefault();
        if (typeof window.resetCamera === 'function') {
            window.resetCamera();
        }
    }

    // Delete selected atom on Delete/Backspace
    if ((e.key === 'Delete' || e.key === 'Backspace') && !isInputFocused()) {
        e.preventDefault();
        if (typeof window.deleteSelectedAtom === 'function') {
            window.deleteSelectedAtom();
        }
    }
});

function isInputFocused() {
    const active = document.activeElement;
    return active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.tagName === 'SELECT');
}

// ===================
// LOCAL STORAGE FOR PREFERENCES
// ===================
function loadPreferences() {
    try {
        const saved = localStorage.getItem('atomency-preferences');
        if (saved) {
            const prefs = JSON.parse(saved);

            // Restore trend toggles
            if (prefs.toggles) {
                if (prefs.toggles.en && document.getElementById('toggle-en')) {
                    document.getElementById('toggle-en').checked = true;
                }
                if (prefs.toggles.radius && document.getElementById('toggle-radius')) {
                    document.getElementById('toggle-radius').checked = true;
                }
                if (prefs.toggles.ionization && document.getElementById('toggle-ionization')) {
                    document.getElementById('toggle-ionization').checked = true;
                }
                if (prefs.toggles.ionCharge && document.getElementById('toggle-ion-charge')) {
                    document.getElementById('toggle-ion-charge').checked = true;
                }
            }
        }
    } catch (e) {
        console.warn('Could not load preferences:', e);
    }
}

function savePreferences() {
    try {
        const prefs = {
            toggles: {
                en: document.getElementById('toggle-en')?.checked || false,
                radius: document.getElementById('toggle-radius')?.checked || false,
                ionization: document.getElementById('toggle-ionization')?.checked || false,
                ionCharge: document.getElementById('toggle-ion-charge')?.checked || false
            },
            lastSaved: new Date().toISOString()
        };
        localStorage.setItem('atomency-preferences', JSON.stringify(prefs));
    } catch (e) {
        console.warn('Could not save preferences:', e);
    }
}

// Save preferences when toggles change
document.addEventListener('DOMContentLoaded', function() {
    loadPreferences();

    ['toggle-en', 'toggle-radius', 'toggle-ionization', 'toggle-ion-charge'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('change', savePreferences);
        }
    });
});

// ===================
// EXPORT FUNCTIONALITY
// ===================
function exportMoleculeAsJSON() {
    if (typeof engine === 'undefined') {
        alert('No molecule to export. Build something in the Lab first!');
        return;
    }

    if (!engine.atoms || engine.atoms.length === 0) {
        alert('No atoms to export. Add elements to the Lab canvas first!');
        return;
    }

    const data = {
        atoms: engine.atoms.map(a => ({
            element: a.element.symbol,
            name: a.element.name,
            x: a.x,
            y: a.y,
            charge: a.charge || 0
        })),
        temperature: engine.temperature || 298,
        pressure: engine.pressure || 1.0,
        exportedAt: new Date().toISOString(),
        version: '1.1'
    };

    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'molecule-' + Date.now() + '.json';
    a.click();
    URL.revokeObjectURL(url);

    console.log('Exported molecule with ' + engine.atoms.length + ' atoms');
}

// Make export function globally available
window.exportMoleculeAsJSON = exportMoleculeAsJSON;
window.showHelpModal = showHelpModal;
window.closeHelpModal = closeHelpModal;

console.log('✨ Atomency Enhanced - v1.1');
console.log('Made by Ky\'lin Spears');
console.log('Press ? for keyboard shortcuts');
