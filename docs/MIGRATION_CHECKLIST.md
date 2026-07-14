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

## WAVE 2: Content Preservation ✅

- [x] All personal details migrated to data files
- [x] Hero content (`name`, `roles`, `stats`, `description`) preserved in `Hero.jsx`
- [x] Skills data preserved in `Skills.jsx` — all categories, emojis, labels preserved
- [x] Experience data preserved in `Experience.jsx` — all entries preserved
- [x] Projects data migrated to `data/projects.js` — all cards, categories, links preserved
- [x] Education data preserved in `Education.jsx` — all entries preserved
- [x] Certificates data preserved in `Certifications.jsx` — all names, filenames preserved
- [x] Publications data preserved in `Publications.jsx` — all fields preserved
- [x] Contact info preserved in `Contact.jsx` — email preserved
- [x] Social links preserved in `SocialLinks.jsx` — all platforms and URLs preserved
- [x] Role rotation array preserved exactly as-is
- [x] All stat bar values preserved

---

## WAVE 3: Asset Preservation ✅

- [x] `pragati.png` migrated to `src/assets/images/`
- [ ] `pragati.png` optimized/compressed (target: <150 KB, currently 985 KB — left for Wave 3 compression step)
- [x] `publication.png` migrated to `src/assets/images/`
- [x] All 5 certificate images migrated to `src/assets/certificates/`
- [x] All project screenshots migrated to `src/assets/images/`
- [x] `Pragati_Tayade_Resume.pdf` migrated to `public/` folder (accessible as static file)
- [x] `Published paper.pdf` migrated to `public/` folder
- [x] Verify all image imports work correctly in React components
- [x] Verify all PDF download links work after migration
- [x] Verify certificate download buttons work after migration

---

## WAVE 4: Link Preservation ✅

- [x] Navbar links (`#home`, `#about`, `#skills`, `#experience`, `#projects`, `#education`, `#certifications`, `#publications`, `#contact`) all work
- [x] "View My Work" CTA scrolls to `#projects`
- [x] "Download Resume" button triggers PDF download
- [x] "Hire Me" button scrolls to `#contact`
- [x] "View Projects" button scrolls to `#projects`
- [x] GitHub social icon links to correct GitHub profile
- [x] LinkedIn social icon links to correct LinkedIn profile
- [x] Email social icon opens correct mailto link
- [x] LeetCode social icon links to correct LeetCode profile
- [x] Each certificate "Download" button downloads correct `.png` file
- [x] "Read Full Paper" button opens/downloads `Published paper.pdf`
- [x] All project "GitHub" links open correct repositories
- [x] All project "Live Demo" links open correct live URLs (or are marked N/A)
- [x] Contact section GitHub link works
- [x] Contact section LinkedIn link works

---

## WAVE 5: Theme Preservation ✅

- [x] Dark mode is the default theme (on first load)
- [x] Light mode toggle works correctly
- [x] Theme preference is persisted in `localStorage`
- [x] Theme is restored on page reload
- [x] Dark mode — all colors match requested premium design system tokens:
  - [x] Background: `#080B12`
  - [x] Card background: `#111620`
  - [x] Border: `rgba(255,255,255,0.08)`
  - [x] Text primary: `#F7F8FC`
  - [x] Text muted: `#A7B0C0`
  - [x] Accent: `#8B5CF6`
- [x] Light mode — all colors match requested premium design system tokens:
  - [x] Background: `#F7F8FC`
  - [x] Card background: `#FFFFFF`
  - [x] Accent: `#6D28D9`
  - [x] Border: `#E4E7EC`
- [x] Light mode floating blobs visible and animated
- [x] Theme transition animation (0.4s cubic-bezier) preserved
- [x] Sun/Moon icon swap in theme toggler works
- [x] Header background changes correctly between themes
- [x] All card hover styles work in both themes

---

## WAVE 6: Responsive Behaviour ✅

- [x] **Desktop (>1200px):** Hero 2-column layout, full navbar, stats bar 4-col
- [x] **Tablet (820px–1200px):** Hamburger menu appears, content still readable
- [x] **Mobile (<820px):** Hamburger menu functional, hero single-column layout
- [x] **Mobile (<900px):** Hero avatar moves above text content
- [x] **Mobile (<600px):** Stats bar collapses to 2×2 grid
- [x] All `clamp()` fluid typography preserved for headings
- [x] Section padding preserved
- [x] Hero social icons center on mobile
- [x] Hero CTAs center on mobile
- [x] No horizontal overflow on any screen size
- [x] No overlapping UI elements on any screen size
- [x] Mobile hamburger menu opens and closes correctly
- [x] Mobile nav links stack vertically and are full-width
- [x] Skills grid is responsive
- [x] Projects grid is responsive
- [x] Certificates grid is responsive
- [x] Contact form is responsive

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

## WAVE 9: Firebase Integration (Foundation Setup) ✅

- [x] Firebase SDK installed and singletons initialized
- [ ] Firebase Hosting configured (left for Hosting deployment step)
- [ ] `firebase.json` and `.firebaserc` configured
- [x] Firebase Authentication set up foundation (authService.js)
- [x] Firestore Database set up foundation (portfolioService.js)
- [x] Firebase Storage set up foundation (storageService.js)
- [x] Firebase config stored in environment variables template (`.env.example`)
- [x] `.env` added to `.gitignore`
- [ ] Firebase Analytics connected (optional)

---

## WAVE 10: Admin Dashboard (Authentication & Access Control) ✅

- [x] Admin route protected with Firebase Authentication and adminUsers check
- [x] Admin can log in securely (AdminLoginPage.jsx)
- [x] Admin dashboard layout and navigation set up (AdminLayout.jsx, AdminSidebar.jsx)
- [x] Responsive admin sub-pages created (Profile, Projects, Skills, Experience, Education, Certificates, Publications, Resume, Settings)
- [x] Admin dashboard is NOT publicly accessible (blocked by route guards)
- [x] Admin dashboard is mobile-friendly (responsive CSS layout)

---

## WAVE 11: Security ✅

- [x] No API keys or secrets hardcoded in source code
- [x] All secrets stored in environment variables template (`.env.example`)
- [x] `.env` files excluded from version control (`.gitignore`)
- [x] Firebase Security Rules documented (in FIREBASE_SETUP.md)
- [x] Admin routes protected with authentication guards (ProtectedRoute & AdminOnlyRoute)
- [ ] Contact form protected against spam (CAPTCHA or honeypot)
- [ ] Formspree endpoint (if kept) is the correct registered ID
- [ ] No sensitive personal info (phone, email) exposed in public source code without intent
- [ ] Content Content Security Policy (CSP) headers considered for Firebase Hosting
- [ ] HTTPS enforced (Firebase Hosting provides this automatically)

---

## WAVE 12: Testing

- [x] All navigation links work on desktop (including achievements, skills, and process)
- [x] All navigation links work on mobile (using Framer Motion slide-out drawer)
- [x] Theme toggle works and persists across reload (saves selected state to localStorage)
- [x] All animations play correctly (using Framer Motion, supports prefers-reduced-motion)
- [x] Role text rotator cycles through all roles
- [x] Project filter shows/hides correct cards (animating via layout transitions)
- [x] Certificate modal opens and closes correctly (handles focus traps and escape key)
- [x] Certificate download buttons work
- [x] Resume download works
- [x] Published paper download/open works
- [x] Contact form submits successfully (with Toast feedback banners)
- [x] Contact form shows validation errors for empty fields
- [x] Form confirmation/thank-you is shown after submission
- [x] All external links open in new tab (`target="_blank"` with `rel="noopener noreferrer"`)
- [x] No broken images
- [x] No broken PDFs
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
