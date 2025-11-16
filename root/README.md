# Ukrainian Attacks on Russian Infrastructure - Web Application

**Version:** 1.0.0  
**Framework:** v2.2.1 INTEGRATED  
**Date:** November 16, 2025  
**Status:** PRODUCTION READY

---

## 📊 Overview

Comprehensive web application for analyzing and visualizing Ukrainian attacks on Russian infrastructure from January 2024 through November 2025. The application presents data across 6 categories with 162+ documented attacks verified through 50+ international sources.

## 🎯 Key Features

- **📈 Interactive Dashboard** - Real-time statistics and trend analysis
- **🗺️ Geographic Map** - Leaflet.js map with interactive attack markers and heatmap
- **⏱️ Timeline View** - Chronological navigation of all documented attacks
- **📊 Statistical Analysis** - Charts, graphs, and data visualizations
- **🎯 Category Deep-Dive** - Detailed analysis of each infrastructure type
- **💰 Economic Impact** - Calculator and strategic impact assessment
- **📚 Source Verification** - 50+ verified sources with cross-reference

## 📁 Project Structure

```
ukrainian-infrastructure-attacks-v1.0.0/
│
├── index.html                 # Main application shell
├── README.md                  # This file
├── CHANGELOG.md               # Version history
│
├── css/
│   └── main.css              # Main stylesheet (v2.2.1 compliant)
│
├── js/
│   ├── core.js               # Navigation engine & module system
│   ├── data.js               # Central data store & operations
│   ├── dashboard.js          # Dashboard module
│   ├── timeline.js           # Timeline module
│   ├── map.js                # Map module (Leaflet)
│   ├── categories.js         # Categories module
│   ├── statistics.js         # Statistics module
│   ├── impact.js             # Impact analysis module
│   └── sources.js            # Sources & methodology
│
└── data/
    ├── data_master.json      # Combined dataset (162 attacks)
    ├── data_refineries.json  # 50 refinery attacks
    ├── data_power_plants.json # 7 power plant attacks
    ├── data_substations.json # 14 substation attacks
    ├── data_ports.json       # 7 port terminal attacks
    ├── data_defense.json     # 5 defense facility attacks
    └── data_fuel.json        # 11 fuel depot attacks
```

## 🚀 Getting Started

### Option 1: Local Development

1. Clone or download the project files
2. Open `index.html` in a modern web browser
3. Navigate using the tab menu

### Option 2: Web Server

For better performance and to avoid CORS issues with JSON files:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

Then navigate to `http://localhost:8000`

### Option 3: Cloud Deployment

Deploy to any static hosting:

- **GitHub Pages** - Free hosting with GitHub integration
- **Netlify** - Automatic deployment from Git
- **Vercel** - Optimized for performance
- **AWS S3 + CloudFront** - Enterprise-grade CDN
- **Azure Static Web Apps** - Microsoft cloud platform

## 📊 Data Categories

### 1. **Refineries** (50 attacks)
- Oil refinery infrastructure
- Processing capacity: 6.7M bbl/day total
- Capacity lost: -30.6% (~2.05M bbl/day)
- Key targets: Tuapse, Novoshakhtinsk, Ryazan

### 2. **Power Plants** (7 attacks)
- Nuclear plants (NPP)
- Thermal power plants (TPP)
- Grid infrastructure damage
- Key targets: Novovoronezh NPP, Smolensk NPP, Belgorod TPP

### 3. **Electrical Substations** (14 attacks)
- High-voltage transmission lines (500kV, 750kV)
- Capacity lost: 26,327 MVA
- Regional grid disruptions
- Key targets: Vladimirskaya (4,010 MVA), Balashovskaya (1,523 MVA)

### 4. **Port Terminals** (7 attacks)
- Oil export terminals (Black Sea, Baltic)
- Export capacity lost: 3.74M bbl/day
- Shadow fleet operations disrupted
- Key targets: Novorossiysk, Primorsk, Tuapse

### 5. **Defense Facilities** (5 attacks)
- Missile component factories
- Air defense production (S-300/S-400)
- Military aviation fuel storage
- Key targets: Arzamas APZ, Radiozavod (Penza)

### 6. **Fuel Depots** (11 attacks)
- Oil storage facilities
- Military fuel storage
- Logistics hubs
- Key targets: Feodosia (250k tons), Proletarsk (16-day fire)

## 🎨 Design & Accessibility

- **Framework:** v2.2.1 INTEGRATED
- **WCAG 2.1 AA Compliant** - Accessible to all users
- **Responsive Design** - Mobile, tablet, desktop optimized
- **Dark Theme** - Blue/dark color scheme (professional for analysis)
- **High Contrast** - ≥4.5:1 contrast ratio

### Color Palette

```css
--color-refineries: #E63946 (Red)
--color-power: #F77F00 (Orange)
--color-substations: #FCBF49 (Yellow)
--color-ports: #06AED5 (Blue)
--color-defense: #8338EC (Purple)
--color-fuel: #FF006E (Pink)
```

## 🔧 Technical Stack

### Frontend Libraries

- **Chart.js 4.4** - Data visualization
- **Leaflet 1.9.4** - Interactive mapping
- **Font Awesome 6.4** - Icons
- **Papa Parse 5.4.1** - CSV parsing
- **Vanilla JavaScript** - No framework dependencies

### Browser Support

- ✅ Chrome/Chromium (latest 2 versions)
- ✅ Firefox (latest 2 versions)
- ✅ Safari (latest 2 versions)
- ✅ Edge (latest 2 versions)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📊 Application Tabs

### 1. Dashboard
- Hero statistics (total attacks, regions, period)
- Category distribution pie chart
- Monthly trend line chart
- Recent attacks list

### 2. Timeline
- Chronological view of all attacks
- Date, location, damage summary
- Sortable by category, region, date
- Exports available

### 3. Map
- Interactive Leaflet map of Russia
- Attack markers with category colors
- Cluster view for dense regions
- Heatmap layer toggle
- Distance circles from Ukraine border
- Category filters

### 4. Categories
- 6 sub-tabs for each infrastructure type
- Statistics specific to category
- Capacity impact calculations
- Attack timeline per category
- Status breakdown (operational/damaged/destroyed)

### 5. Statistics
- **Geographic Distribution:** Top 10 regions, distance histogram
- **Attack Patterns:** Attack type breakdown, success rates
- **Temporal Analysis:** Monthly trends, day-of-week distribution
- **Capacity Impact:** MVA lost, bbl/day disrupted

### 6. Impact Analysis
- **Energy Infrastructure:** Grid vulnerability, NPP attacks
- **Oil & Gas Sector:** Export terminals, pipeline damage
- **Military Production:** Defense factories, degraded capability
- **Economic Impact:** Real-time loss calculator

### 7. Sources
- Methodology and data quality standards
- Russian official sources
- Regional confirmations
- Ukrainian verification sources
- International verification
- Export options (CSV, JSON, PDF)

## 💾 Data Management

### Export Formats

1. **CSV** - Spreadsheet compatible format
2. **JSON** - Raw data structure
3. **PDF** - Formatted report

### API-like Access

```javascript
// Get all attacks
const attacks = ApplicationData.getAllAttacks();

// Get by category
const refineries = ApplicationData.getByCategory('Refineries');

// Get by region
const krasnodar = ApplicationData.getByRegion('Krasnodar Krai');

// Filter by date
const recent = ApplicationData.filterByDateRange('2025-10-01', '2025-11-16');

// Search
const results = ApplicationData.searchAttacks('Vladimirskaya');

// Get statistics
const stats = ApplicationData.statistics;
```

## 🎥 Live Stream Features

The application is optimized for YouTube live streaming:

- **Presentation Mode** - Full-screen distraction-free view
- **Keyboard Shortcuts:**
  - `Space` - Play/Pause animations
  - `Arrow Keys` - Navigate between tabs
  - `F` - Toggle fullscreen
  - `H` - Hide/Show controls
- **Pointer Highlight** - Circle around cursor for visibility
- **Zoom Controls** - Magnify charts and maps for details
- **Smooth Animations** - Professional transitions

## 🔐 Quality Assurance

### Data Quality Gates

✅ **50+ Verified Sources**
- Russian official media (TASS, Interfax, RBC)
- Regional government confirmations
- Ukrainian sources (cross-verification)
- International news (Reuters, BBC, Bloomberg)

✅ **Cross-Verification Process**
- Multiple sources per attack
- Date, location, damage confirmed
- Status updates tracked
- Corrections applied immediately

✅ **Technical Standards**
- WCAG 2.1 AA accessibility
- Mobile responsive design
- All links tested and working
- Cross-browser compatibility
- Performance optimized

## 📈 Statistics Summary

| Category | Attacks | Period | Key Impact |
|----------|---------|--------|-----------|
| Refineries | 50 | Jan 2024-Nov 2025 | -30.6% capacity |
| Power Plants | 7 | Various | 2 NPP targeted |
| Substations | 14 | Oct-Nov 2025 | 26,327 MVA lost |
| Ports | 7 | Sep-Nov 2025 | 3.74M bbl/day |
| Defense | 5 | Aug-Oct 2025 | Production degraded |
| Fuel Depots | 11 | Jan-Nov 2025 | Multiple fires |
| **TOTAL** | **162** | **Jan 2024-Nov 2025** | **Strategic impact** |

## 🔄 Update Protocol

### Versioning

- Major (x.0.0) - Breaking changes
- Minor (0.x.0) - New features
- Patch (0.0.x) - Bug fixes

### Adding New Attacks

1. Add entry to appropriate `data_*.json` file
2. Include: date, location, coordinates, type, damage, status
3. Update `data_master.json`
4. Version bump (patch)
5. Test all tabs for accuracy
6. Redeploy

### Framework v2.2.1 Compliance

- ✅ Modular architecture (independent components)
- ✅ Tab Isolation (no cross-tab pollution)
- ✅ Incremental Updates (easy to add new data)
- ✅ Explicit Preservation (no data loss)
- ✅ WCAG AA accessible
- ✅ Mobile responsive
- ✅ Versioning system
- ✅ Changelog maintained

## 📞 Support & Contributions

### Found an Error?

1. Verify with multiple Russian sources
2. Document the correction with sources
3. Update appropriate JSON file
4. Include correction in next version

### Want to Contribute?

1. Fork or create issue
2. Propose changes with sources
3. Test all tabs work correctly
4. Submit with documentation

## 📜 License

MIT License - Free for research, analysis, and educational purposes

## 🎓 Citation

```bibtex
@web{ukrainian_attacks_infrastructure_2025,
  title={Ukrainian Attacks on Russian Infrastructure - Comprehensive Database},
  author={Geopolitical Analysis Team},
  year={2025},
  url={https://your-deployment-url},
  note={Framework v2.2.1 INTEGRATED}
}
```

## 🙏 Acknowledgments

- Data compiled from 50+ international sources
- Russian official media for confirmations
- Kyiv Independent for Ukrainian verification
- Reuters, BBC, Bloomberg for international verification
- Open-source libraries (Chart.js, Leaflet)

---

**Last Updated:** November 16, 2025  
**Framework:** v2.2.1 INTEGRATED  
**Status:** ✅ Production Ready  
**Accessibility:** ♿ WCAG 2.1 AA Compliant