# Alchemist Engine - Quantum Molecular Lab

## Overview

Alchemist Engine is an interactive chemistry simulation application that allows users to create and visualize molecular structures. The application provides a drag-and-drop interface for placing atoms on a canvas, automatically calculating chemical bonds based on valence electron rules, and identifying resulting molecules with their proper chemical formulas and names.

The core functionality includes:
- Interactive periodic table for element selection
- Real-time molecular bond calculation using valence electron chemistry rules
- Visual representation of atoms with electron shells and bonds
- Molecule identification and naming system
- Support for various bond types (single, double, triple) and expanded octets

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend-Only Architecture
The application is built as a purely client-side web application with no backend server. All processing happens in the browser using vanilla JavaScript.

**Rationale**: Chemistry simulations are computationally light enough to run client-side, and this approach eliminates server costs and latency for real-time interactions.

### Component Structure

| Component | File | Purpose |
|-----------|------|---------|
| Chemistry Engine | `js/engine.js` | Core chemistry logic - valence calculation, bond resolution, molecule identification |
| Application Controller | `js/app.js` | UI interactions, canvas rendering, drag-and-drop handling |
| Validator | `js/validator.js` | Test suite for verifying molecule identification accuracy |
| Styles | `css/style.css` | Custom animations and scrollbar styling |
| Entry Point | `index.html` | Main HTML structure with embedded Tailwind CSS |

### Rendering Approach
The application uses SVG for all canvas rendering, with separate layers for bonds and atoms. This enables:
- Smooth scaling and zooming
- CSS-based animations for electron orbits
- Easy hit detection for drag-and-drop

### Chemistry Resolution System
The `ChemistryEngine.resolve()` method implements a bond-finding algorithm that:
1. Calculates valence electrons for each atom
2. Determines maximum bonding capacity (octet rule with exceptions)
3. Handles expanded octets for period 3+ elements
4. Supports transition metal variable valency
5. Identifies molecules and generates chemical formulas

## External Dependencies

### CDN Dependencies
| Dependency | Source | Purpose |
|------------|--------|---------|
| Tailwind CSS | `cdn.tailwindcss.com` | Utility-first CSS framework for styling |

### External APIs
| API | URL | Purpose |
|-----|-----|---------|
| Periodic Table JSON | `raw.githubusercontent.com/Bowserinator/Periodic-Table-JSON` | Complete periodic table data including element properties, electron shells, and categories |

### Data Requirements
The application fetches periodic table data at initialization. This includes:
- Element symbols, names, and atomic numbers
- Electron shell configurations
- Element categories (for special bonding rules)
- Additional properties for the inspector panel

**Note**: The application currently has no database or persistent storage. All state exists only in memory during the browser session.