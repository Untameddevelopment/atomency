/**
 * Atomency Analytics
 * Privacy-friendly, server-side analytics for K-12 education
 */

const Analytics = {
  sessionStart: Date.now(),
  lastActivity: Date.now(),

  /**
   * Track an analytics event
   * @param {string} eventType - Type of event (periodic_table_view, molecule_built, etc.)
   * @param {object} eventData - Additional event metadata
   */
  async track(eventType, eventData = {}) {
    try {
      await fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event_type: eventType,
          event_data: eventData
        })
      });
    } catch (err) {
      // Silent fail - don't disrupt user experience
      console.debug('Analytics tracking failed:', err.message);
    }
  },

  /**
   * Track periodic table interaction
   */
  trackPeriodicTableView() {
    this.track('periodic_table_view', {
      timestamp: Date.now()
    });
  },

  /**
   * Track molecule building
   * @param {object} molecule - Molecule data
   */
  trackMoleculeBuilt(molecule) {
    this.track('molecule_built', {
      timestamp: Date.now(),
      atom_count: molecule.atoms?.length || 0,
      bond_count: molecule.bonds?.length || 0
    });
  },

  /**
   * Track VSEPR calculation
   * @param {string} geometry - VSEPR geometry type
   */
  trackVSEPRCalculated(geometry) {
    this.track('vsepr_calculated', {
      timestamp: Date.now(),
      geometry: geometry
    });
  },

  /**
   * Track element click in periodic table
   * @param {string} symbol - Element symbol
   */
  trackElementClicked(symbol) {
    this.track('element_clicked', {
      timestamp: Date.now(),
      element: symbol
    });
  },

  /**
   * Track page visibility changes (for session tracking)
   */
  trackVisibilityChange() {
    if (document.visibilityState === 'visible') {
      this.lastActivity = Date.now();
    }
  },

  /**
   * Initialize analytics tracking
   */
  init() {
    // Track session start
    this.track('session_start', {
      timestamp: this.sessionStart,
      page: window.location.pathname
    });

    // Track activity
    ['click', 'scroll', 'keypress', 'mousemove'].forEach(event => {
      document.addEventListener(event, () => {
        this.lastActivity = Date.now();
      }, { passive: true });
    });

    // Track visibility changes
    document.addEventListener('visibilitychange', () => {
      this.trackVisibilityChange();
    });

    // Track session end on page unload
    window.addEventListener('beforeunload', () => {
      const sessionDuration = Math.round((this.lastActivity - this.sessionStart) / 1000);
      // Use sendBeacon for reliable tracking on page unload
      const data = JSON.stringify({
        event_type: 'session_end',
        event_data: {
          timestamp: Date.now(),
          duration_seconds: sessionDuration
        }
      });
      navigator.sendBeacon('/api/track', data);
    });

    console.log('Atomency Analytics initialized');
  }
};

// Auto-initialize on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => Analytics.init());
} else {
  Analytics.init();
}

// Make available globally for integration with existing code
window.Analytics = Analytics;
