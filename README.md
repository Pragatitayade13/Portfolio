# Portfolio — React Migration Project

**Owner:** Pragati Tayade  
**Migration Wave:** 0 (Audit & Backup complete)  
**Live Portfolio:** https://pragatitayade13.github.io/Pragati_portfolio/  
**Original Repo:** https://github.com/Pragatitayade13/Pragati_portfolio  

---

## Project Overview

This repository is the **new React migration project** for Pragati Tayade's portfolio.

The original portfolio is a monolithic static HTML site. This project migrates it into a modern **React + Vite** application with Firebase integration and an admin dashboard.

## Structure

```
/
├── docs/                        ← Migration documentation (Wave 0)
│   ├── MIGRATION_AUDIT.md       ← Full technical audit of original portfolio
│   ├── CONTENT_INVENTORY.md     ← Inventory of all existing content & assets
│   └── MIGRATION_CHECKLIST.md   ← Checklist across all migration waves
│
├── legacy-portfolio/            ← Read-only backup of original static site
│   ├── index.html
│   ├── pragati_portfolio.html   ← Full 97KB monolithic portfolio
│   ├── pragati.png
│   ├── Pragati_Tayade_Resume.pdf
│   └── ... (all original assets)
│
└── README.md                    ← This file
```

## Migration Waves

| Wave | Description | Status |
|------|-------------|--------|
| Wave 0 | Audit & Backup | ✅ Complete |
| Wave 1 | React + Vite Project Init | 🔜 Next |
| Wave 2 | Content & Data Migration | ⏳ Pending |
| Wave 3 | Asset Migration & Optimization | ⏳ Pending |
| Wave 4 | Link Preservation | ⏳ Pending |
| Wave 5 | Theme System | ⏳ Pending |
| Wave 6 | Responsive Behaviour | ⏳ Pending |
| Wave 7 | SEO | ⏳ Pending |
| Wave 8 | React Component Conversion | ⏳ Pending |
| Wave 9 | Firebase Integration | ⏳ Pending |
| Wave 10 | Admin Dashboard | ⏳ Pending |
| Wave 11 | Security | ⏳ Pending |
| Wave 12 | Testing | ⏳ Pending |
| Wave 13 | Deployment | ⏳ Pending |

## Tech Stack (Planned)

- **Framework:** React 18 + Vite
- **Routing:** React Router v6
- **Styling:** CSS Modules (preserving existing design system)
- **Forms:** react-hook-form
- **Animations:** react-intersection-observer + existing CSS animations
- **SEO:** react-helmet-async
- **Backend/DB:** Firebase (Auth, Firestore, Hosting)
- **Deployment:** Firebase Hosting / GitHub Pages via GitHub Actions

---

> ⚠️ **DO NOT modify files inside `legacy-portfolio/`.** It is a read-only backup of the original site.
