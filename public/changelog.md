# Atomency - Changelog

## Version 1.1 - Enhanced Edition (February 2026)

### ✨ New Features

#### Help System
- **Help Modal** - Added comprehensive help button (? icon) in navigation
- **Interactive Guide** - Includes instructions for both Periodic Table and Molecular Builder
- **Keyboard Shortcuts Reference** - Visual guide showing all available shortcuts
- **Tips Section** - Educational tips for building molecules and exploring trends

#### Keyboard Shortcuts
- **? Key** - Show help modal
- **Escape** - Close all modals and overlays
- **Space** - Reset camera view (in Lab mode)
- **Delete/Backspace** - Remove selected atom (in Lab mode)

#### Local Storage
- **Preference Persistence** - Saves your trend toggle preferences (EN, Radius, Ionization, Ions)
- **Auto-restore** - Preferences automatically reload when you return to the app

#### Export Functionality
- **JSON Export** - Export your molecular structures as JSON files
- **Includes metadata** - Saves atom positions, charges, temperature, and pressure
- **Available globally** - Call `exportMoleculeAsJSON()` from browser console

### 🎨 UI/UX Improvements

#### Enhanced Metadata
- **Better SEO** - Added meta description and keywords for search engines
- **Open Graph tags** - Improved social media sharing previews
- **Custom Favicon** - Added blue "C" icon for browser tab

#### Better Footer
- **Extended credits** - "Made By Ky'lin Spears • 118 Elements • 110M+ Molecules"
- **More informative** - Shows scope of the application at a glance

#### Accessibility
- **Better title attributes** - Improved tooltips throughout the app
- **Semantic HTML** - Proper heading hierarchy and landmarks
- **Keyboard navigation** - Full keyboard support for all major functions

### ⚡ Performance Improvements

#### Search Optimization
- **Debounced search** - 150ms debounce prevents excessive re-renders
- **Smoother typing** - No lag when quickly typing in search box

#### Better Console Logging
- **Startup message** - Shows version and keyboard shortcut hint
- **Export feedback** - Confirms when molecules are exported

### 📚 Documentation

#### README.md
- **Complete setup guide** - How to open and use the app
- **Feature documentation** - Detailed explanation of all features
- **Keyboard shortcuts** - Listed in documentation
- **Technical details** - File structure, browser compatibility, customization guide
- **Educational use cases** - How teachers can use it in curriculum

#### CHANGELOG.md (This File)
- **Version history** - Track improvements over time
- **Migration guides** - Help users understand new features

### 🐛 Bug Fixes
- **Input focus detection** - Keyboard shortcuts don't fire when typing in search boxes
- **Modal layering** - Proper z-index ensures modals appear above all content
- **Local storage errors** - Graceful error handling if localStorage is disabled

### 🔧 Code Quality

#### Better Organization
- **Separate enhancements.js** - New features in dedicated file
- **Modular functions** - Each feature is independently testable
- **Global exports** - Key functions available via window object

#### Best Practices
- **Error handling** - Try/catch blocks around localStorage operations
- **Null safety** - Optional chaining (?.) prevents crashes
- **Console warnings** - Helpful messages when things go wrong

---

## Version 1.0 - Original Release

### Features
- Interactive Periodic Table with 118 elements
- Molecular Builder (Alchemist Lab) with physics engine
- Temperature and pressure controls
- Element search and filtering
- Property visualization (electronegativity, radius, ionization energy, ions)
- Real-time bonding simulation
- Element detail modals
- Responsive design

---

## Future Roadmap

### Planned Features
- [ ] **Save/Load System** - Save molecules to browser and reload them
- [ ] **Image Export** - Export canvas as PNG/SVG
- [ ] **3D Visualization** - Toggle between 2D and 3D molecular views
- [ ] **Chemical Equation Balancer** - Balance chemical equations automatically
- [ ] **Reaction Predictor** - Predict products of chemical reactions
- [ ] **Multi-language Support** - Translate UI to Spanish, French, Mandarin
- [ ] **Dark/Light Theme** - Toggle between color schemes
- [ ] **Accessibility Mode** - High contrast, larger text, screen reader optimization
- [ ] **Mobile Optimization** - Touch controls for tablets
- [ ] **Electron App** - Desktop application version
- [ ] **API Integration** - Connect to PubChem or other chemistry databases
- [ ] **Lesson Plans** - Built-in chemistry lessons for teachers

### Community Requests
Have a feature idea? Open an issue or contact the developer!

---

**Made with ❤️ by Ky'lin Spears**
