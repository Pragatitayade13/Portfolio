# React + Vite Foundation Project Guide

This document outlines the React.js and Vite foundation established in Wave 1 of the portfolio migration.

---

## 1. Setup & Tools

- **Framework:** React 19.x (JavaScript template)
- **Build Tool:** Vite 8.x
- **CSS Preprocessing:** Pure Vanilla CSS (preserving custom properties design system)
- **Icons Library:** Lucide React (`lucide-react`)
- **Routing:** React Router v7 (`react-router-dom`)

---

## 2. Folder Structure

The repository is organized as follows:

```
new portfolio/
├── docs/                        ← Migration plans & documentation
│   ├── MIGRATION_AUDIT.md       ← Original portfolio audit report
│   ├── CONTENT_INVENTORY.md     ← Inventory of original content and files
│   ├── MIGRATION_CHECKLIST.md   ← Checklist tracker for all waves
│   └── REACT_FOUNDATION.md      ← This document
│
├── legacy-portfolio/            ← SAFE READ-ONLY BACKUP (Do not touch)
│   ├── index.html               ← Original redirect file
│   ├── pragati_portfolio.html   ← Original full portfolio static code
│   └── ... (original images and PDFs)
│
├── public/                      ← Static assets (served directly)
│
├── src/                         ← Source code
│   ├── assets/                  ← Imported assets compiled by Vite
│   │   ├── images/              ← Profile photos, screen banners
│   │   ├── documents/           ← PDFs (resume, publications)
│   │   └── certificates/        ← Certificate images
│   │
│   ├── components/              ← Reusable React components
│   │   ├── common/              ← Reusable buttons, cards, wrappers
│   │   ├── layout/              ← Main Layout shell (Header, Footer, AppLayout, etc.)
│   │   └── sections/            ← Specific page sections
│   │
│   ├── pages/                   ← Main page components (Home, Projects, Contact, NotFound)
│   ├── routes/                  ← Route configuration details
│   ├── data/                    ← JSON/Object structured portfolio content files
│   ├── hooks/                   ← Custom React hooks
│   ├── context/                 ← React Context providers (ThemeContext)
│   ├── services/                ← API or third-party connections
│   ├── styles/                  ← Global styles & CSS modules
│   │   └── global.css           ← Root design tokens & body resetting
│   │
│   ├── App.jsx                  ← Main Application router and theme wrapper
│   └── main.jsx                 ← Mounting application root
│
├── index.html                   ← Root HTML entry for Vite
├── package.json                 ← Dependencies & build commands
├── vite.config.js               ← Vite compilation configurations
└── .gitignore                   ← Excluded files/folders for git commits
```

---

## 3. Configuration Details

### GitHub Pages Base Config
Inside [vite.config.js](file:///d:/new%20portfolio/vite.config.js):
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/Pragati_portfolio/'
})
```
This ensures build outputs correctly prefix relative assets with `/Pragati_portfolio/` for GitHub Pages hosting.

### Routing Configuration
Inside [App.jsx](file:///d:/new%20portfolio/src/App.jsx), we use `HashRouter` to prevent 404 errors on browser page reloads under GitHub Pages:
- `/` maps to Home landing elements (`HomePage`)
- `#/projects` maps to Projects elements (`ProjectsPage`)
- `#/contact` maps to Contact form elements (`ContactPage`)
- `*` maps to `NotFoundPage` (404 fallback page)

### Theme Persistence & Systems
Theme is configured via `ThemeContext.jsx` using:
- **Default:** Dark theme
- **Detections:** Looks up `localStorage.getItem('theme')` first. Falling back, it automatically queries the browser's system preference `(prefers-color-scheme: light)`.
- **Class Toggle:** Applying `theme-light` CSS variables class dynamically to the `<body>` element.

---

## 4. Commands

### Run Development Server
To launch the hot-reloading development server locally:
```bash
npm run dev
```

### Build Production Bundle
To compile production-optimized assets inside the `dist/` folder:
```bash
npm run build
```

### Preview Production Build
To spin up a local server hosting the compiled production bundle:
```bash
npm run preview
```
