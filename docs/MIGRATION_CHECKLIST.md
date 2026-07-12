# MIGRATION CHECKLIST — Wave 0
## Pragati Tayade Portfolio → React Migration

**Created:** 2026-07-13  
**Status:** Wave 0 — Audit & Backup Phase  

---

> **Instructions:** Each checkbox must be manually verified and ticked off during the appropriate migration wave. Do not mark items complete without full verification.

---

## WAVE 0: Audit & Backup ✅

- [x] Repository fully analyzed and structure documented
- [x] All files inventoried with sizes and purposes
- [x] `docs/MIGRATION_AUDIT.md` created
- [x] `docs/CONTENT_INVENTORY.md` created
- [x] `docs/MIGRATION_CHECKLIST.md` created (this file)
- [x] `legacy-portfolio/` backup folder created
- [x] All source files backed up to `legacy-portfolio/`
- [x] Broken items documented
- [x] Risks documented
- [ ] Confirm exact contact info (email, phone, location) from full HTML read
- [ ] Confirm Formspree form ID is active/registered
- [ ] Confirm all project card data (titles, URLs, categories)
- [ ] Confirm complete skills, experience, and education data
- [ ] Confirm all publication details

---

## WAVE 1: React Project Initialization ✅

- [x] Choose hosting target: **GitHub Pages** (Vite config base set to `/Pragati_portfolio/`)
- [x] Choose routing strategy: `HashRouter` to prevent GitHub Pages refresh 404s
- [x] Initialize Vite + React project in workspace root
- [x] Configure `vite.config.js` with correct `base` path `/Pragati_portfolio/`
- [x] Install all required packages:
  - [x] `react` (v19)
  - [x] `react-dom` (v19)
  - [x] `react-router-dom` (v7)
  - [x] `lucide-react`
- [x] Set up project folder structure (scaffolded directories under `src/` with `.gitkeep` placekeepers)
- [ ] Configure path aliases in `vite.config.js` (left for future config when absolute paths are needed)
- [x] Verify development server runs without errors (`npm run dev` starts successfully)
- [x] Create initial layout components and routing structure
- [x] Create system-aware context for theme toggler
- [x] Create project guide `docs/REACT_FOUNDATION.md`


---

## WAVE 2: Content Preservation

- [ ] All personal details migrated to data files
- [ ] Hero content (`name`, `roles`, `stats`, `description`) migrated to `data/hero.js`
- [ ] Skills data migrated to `data/skills.js` — all categories, emojis, labels preserved
- [ ] Experience data migrated to `data/experience.js` — all entries preserved
- [ ] Projects data migrated to `data/projects.js` — all cards, categories, links preserved
- [ ] Education data migrated to `data/education.js` — all entries preserved
- [ ] Certificates data migrated to `data/certificates.js` — all names, filenames preserved
- [ ] Publications data migrated to `data/publications.js` — all fields preserved
- [ ] Contact info migrated to `data/contact.js` — email, phone, location preserved
- [ ] Social links migrated to `data/social.js` — all platforms and URLs preserved
- [ ] Role rotation array preserved exactly as-is
- [ ] All stat bar values preserved

---

## WAVE 3: Asset Preservation

- [ ] `pragati.png` migrated to `src/assets/images/`
- [ ] `pragati.png` optimized/compressed (target: <150 KB, currently 985 KB)
- [ ] `publication.png` migrated to `src/assets/images/`
- [ ] All 5 certificate images migrated to `src/assets/certificates/`
- [ ] All 5 project screenshots migrated to `src/assets/projects/`
- [ ] Project screenshot files renamed to URL-safe descriptive names (remove spaces and timestamps)
- [ ] `Pragati_Tayade_Resume.pdf` migrated to `public/` folder (accessible as static file)
- [ ] `Published paper.pdf` migrated to `public/` folder
- [ ] Verify all image imports work correctly in React components
- [ ] Verify all PDF download links work after migration
- [ ] Verify certificate download buttons work after migration

---

## WAVE 4: Link Preservation

- [ ] Navbar links (`#home`, `#about`, `#skills`, `#experience`, `#projects`, `#education`, `#certificates`, `#publications`, `#contact`) all work
- [ ] "View My Work" CTA scrolls to `#projects`
- [ ] "Download Resume" button triggers PDF download
- [ ] "Hire Me" button scrolls to `#contact`
- [ ] "View Projects" button scrolls to `#projects`
- [ ] GitHub social icon links to correct GitHub profile
- [ ] LinkedIn social icon links to correct LinkedIn profile
- [ ] Email social icon opens correct mailto link
- [ ] LeetCode social icon links to correct LeetCode profile
- [ ] Each certificate "Download" button downloads correct `.png` file
- [ ] "Read Full Paper" button opens/downloads `Published paper.pdf`
- [ ] All project "GitHub" links open correct repositories
- [ ] All project "Live Demo" links open correct live URLs (or are marked N/A)
- [ ] Contact section GitHub link works
- [ ] Contact section LinkedIn link works

---

## WAVE 5: Theme Preservation

- [ ] Dark mode is the default theme (on first load)
- [ ] Light mode toggle works correctly
- [ ] Theme preference is persisted in `localStorage`
- [ ] Theme is restored on page reload
- [ ] Dark mode — all colors match original design tokens exactly:
  - [ ] Background: `#090d16`
  - [ ] Card background: `#111827`
  - [ ] Border: `#1f2937`
  - [ ] Text primary: `#f9fafb`
  - [ ] Text muted: `#9ca3af`
  - [ ] Accent: `#6366f1`
- [ ] Light mode — all colors match original design tokens exactly:
  - [ ] Background: `#f8fafc`
  - [ ] Card background: `#ffffff`
  - [ ] Accent: `#4f46e5`
  - [ ] Grid background pattern preserved
- [ ] Light mode floating blobs (indigo + pink) visible and animated
- [ ] Theme transition animation (0.6s cubic-bezier) preserved
- [ ] Sun/Moon icon swap in theme toggler works
- [ ] Header background changes correctly between themes
- [ ] All card hover styles work in both themes

---

## WAVE 6: Responsive Behaviour

- [ ] **Desktop (>1200px):** Hero 2-column layout, full navbar, stats bar 4-col
- [ ] **Tablet (820px–1200px):** Hamburger menu appears, content still readable
- [ ] **Mobile (<820px):** Hamburger menu functional, hero single-column layout
- [ ] **Mobile (<900px):** Hero avatar moves above text content
- [ ] **Mobile (<600px):** Stats bar collapses to 2×2 grid
- [ ] All `clamp()` fluid typography preserved for headings
- [ ] Section padding `clamp(60px, 8vw, 100px)` preserved
- [ ] Hero social icons center on mobile
- [ ] Hero CTAs center on mobile
- [ ] No horizontal overflow on any screen size
- [ ] No overlapping UI elements on any screen size
- [ ] Mobile hamburger menu opens and closes correctly
- [ ] Mobile nav links stack vertically and are full-width
- [ ] Skills grid is responsive
- [ ] Projects grid is responsive
- [ ] Certificates grid is responsive
- [ ] Contact form is responsive

---

## WAVE 7: SEO Preservation

- [ ] `<title>Pragati Tayade | Java Full-Stack Developer Portfolio</title>` preserved
- [ ] `<meta name="description">` preserved
- [ ] **NEW:** Open Graph tags added:
  - [ ] `og:title`
  - [ ] `og:description`
  - [ ] `og:image`
  - [ ] `og:url`
- [ ] **NEW:** Twitter Card tags added:
  - [ ] `twitter:card`
  - [ ] `twitter:title`
  - [ ] `twitter:description`
  - [ ] `twitter:image`
- [ ] **NEW:** `<link rel="canonical">` added
- [ ] **NEW:** favicon.ico / favicon.svg added
- [ ] **NEW:** `robots.txt` added to public folder
- [ ] **NEW:** `sitemap.xml` added
- [ ] `<html lang="en">` preserved
- [ ] Google Fonts (Inter + Outfit) loaded correctly
- [ ] Semantic HTML structure preserved (proper heading hierarchy: h1 → h2 → h3)
- [ ] `react-helmet-async` configured for dynamic per-page meta

---

## WAVE 8: React Conversion

- [ ] All sections converted to React components
  - [ ] `<Navbar />` component
  - [ ] `<Hero />` component
  - [ ] `<About />` component
  - [ ] `<Skills />` component
  - [ ] `<Experience />` component
  - [ ] `<Projects />` component (with filter functionality)
  - [ ] `<Education />` component
  - [ ] `<Certificates />` component (with modal/lightbox)
  - [ ] `<Publications />` component
  - [ ] `<Contact />` component
  - [ ] `<Footer />` component
- [ ] `ThemeContext` implemented with React Context API
- [ ] `useTheme` hook implemented
- [ ] `useScrollSpy` hook implemented for active nav link tracking
- [ ] Role text rotator implemented with `useEffect` + `setInterval`
- [ ] Scroll reveal animations implemented with `react-intersection-observer`
- [ ] Certificate lightbox/modal implemented in React
- [ ] Project filter logic implemented in React state
- [ ] All `setInterval` timers cleaned up on component unmount
- [ ] All Intersection Observers cleaned up on component unmount
- [ ] No console errors or warnings in production build
- [ ] No unused imports or dead code

---

## WAVE 9: Firebase Integration

- [ ] Firebase project created
- [ ] Firebase Hosting configured
- [ ] `firebase.json` and `.firebaserc` configured
- [ ] Firebase Authentication set up (for admin dashboard)
- [ ] Firestore or Realtime Database set up (if dynamic content)
- [ ] Firebase Storage set up (for assets, if needed)
- [ ] Firebase config stored in environment variables (`.env`)
- [ ] `.env` added to `.gitignore`
- [ ] Firebase Analytics connected (optional)

---

## WAVE 10: Admin Dashboard

- [ ] Admin route protected with Firebase Authentication
- [ ] Admin can log in securely
- [ ] Admin can update portfolio content without code changes
- [ ] Admin can manage projects
- [ ] Admin can manage certificates
- [ ] Admin can manage skills
- [ ] Admin can manage experience entries
- [ ] Admin can manage education entries
- [ ] Admin can manage publication details
- [ ] Admin can update contact information
- [ ] Admin dashboard is NOT publicly accessible
- [ ] Admin dashboard is mobile-friendly

---

## WAVE 11: Security

- [ ] No API keys or secrets hardcoded in source code
- [ ] All secrets stored in environment variables
- [ ] `.env` files excluded from version control (`.gitignore`)
- [ ] Firebase Security Rules configured (Firestore, Storage, Auth)
- [ ] Admin routes protected with authentication guards
- [ ] Contact form protected against spam (CAPTCHA or honeypot)
- [ ] Formspree endpoint (if kept) is the correct registered ID
- [ ] No sensitive personal info (phone, email) exposed in public source code without intent
- [ ] Content Security Policy (CSP) headers considered for Firebase Hosting
- [ ] HTTPS enforced (Firebase Hosting provides this automatically)

---

## WAVE 12: Testing

- [ ] All navigation links work on desktop
- [ ] All navigation links work on mobile
- [ ] Theme toggle works and persists across reload
- [ ] All animations play correctly
- [ ] Role text rotator cycles through all roles
- [ ] Project filter shows/hides correct cards
- [ ] Certificate modal opens and closes correctly
- [ ] Certificate download buttons work
- [ ] Resume download works
- [ ] Published paper download/open works
- [ ] Contact form submits successfully
- [ ] Contact form shows validation errors for empty fields
- [ ] Form confirmation/thank-you is shown after submission
- [ ] All external links open in new tab (`target="_blank"` with `rel="noopener noreferrer"`)
- [ ] No broken images
- [ ] No broken PDFs
- [ ] Lighthouse score — Performance ≥ 90
- [ ] Lighthouse score — Accessibility ≥ 90
- [ ] Lighthouse score — Best Practices ≥ 90
- [ ] Lighthouse score — SEO ≥ 90
- [ ] Tested on Chrome (desktop)
- [ ] Tested on Firefox (desktop)
- [ ] Tested on Safari (desktop)
- [ ] Tested on Chrome (mobile)
- [ ] Tested on iOS Safari (mobile)
- [ ] No console errors in any browser

---

## WAVE 13: Deployment

- [ ] Vite production build completes without errors (`npm run build`)
- [ ] Build output (`dist/`) contains all expected files
- [ ] Deployed to staging environment and verified
- [ ] Deployed to production (GitHub Pages OR Firebase Hosting)
- [ ] Live URL loads correctly
- [ ] Custom domain configured (if applicable)
- [ ] HTTPS working on live URL
- [ ] Old GitHub Pages URL either redirects to new URL or is preserved as backup
- [ ] CI/CD pipeline configured (GitHub Actions for automated deploys)
- [ ] Rollback plan documented

---

## WAVE 0 COMPLETION SUMMARY

| Item | Status |
|------|--------|
| Existing portfolio unchanged | ✅ Verified |
| Complete backup created | ✅ `legacy-portfolio/` created |
| All content documented | ✅ `docs/CONTENT_INVENTORY.md` |
| All assets documented | ✅ `docs/MIGRATION_AUDIT.md` |
| Migration risks documented | ✅ `docs/MIGRATION_AUDIT.md` |
| No working file deleted | ✅ Verified |
| No visible feature changed | ✅ Verified |

---

*End of Migration Checklist — Wave 0*
