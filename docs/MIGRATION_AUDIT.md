# MIGRATION AUDIT — Wave 0
## Pragati Tayade Portfolio → React Migration

**Audit Date:** 2026-07-13  
**Auditor:** Senior Frontend Developer / Migration Architect  
**Source URL:** https://pragatitayade13.github.io/Pragati_portfolio/  
**GitHub Repo:** https://github.com/Pragatitayade13/Pragati_portfolio  
**Wave:** 0 — Audit & Backup (No code changes)

---

## 1. Current Project Structure

```
Pragati_portfolio/ (GitHub repo root = GitHub Pages root)
├── index.html                                           [70 bytes] ← Entry point (redirect only)
├── pragati_portfolio.html                               [97,913 bytes] ← Main portfolio (monolithic SPA)
├── pragati.png                                          [1,008,267 bytes] ← Profile photo
├── Pragati_Tayade_Resume.pdf                            [273,205 bytes] ← Downloadable resume
├── Published paper.pdf                                  [291,796 bytes] ← Research paper
├── publication.png                                      [329,931 bytes] ← Publication cover image
├── cyber.png                                            [242,669 bytes] ← Certificate image
├── apexplanet_webdev_certificate.png                    [287,735 bytes] ← Certificate image
├── grad_guru_certificate.png                            [371,261 bytes] ← Certificate image
├── seed_java_sql_certificate.png                        [345,170 bytes] ← Certificate image
├── vaultofcodes_python_certificate.png                  [305,241 bytes] ← Certificate image
├── Screenshot 2026-05-22 120106.png                     [427,189 bytes] ← Project screenshot
├── Screenshot 2026-05-22 122837.png                     [244,165 bytes] ← Project screenshot
├── Screenshot 2026-05-22 122915.png                     [241,973 bytes] ← Project screenshot
├── Screenshot 2026-05-22 122943.png                     [254,245 bytes] ← Project screenshot
└── Modern Portfolio Website Design _ Custom Developer Site _ Professional Web Development Services.jpg
                                                         [35,574 bytes]  ← Project screenshot / banner
```

**Architecture:** Single monolithic HTML file (97KB) with all CSS embedded in `<style>` tags and all JavaScript embedded in `<script>` tags at the bottom. No separate CSS or JS files exist.

**No sub-folders, no build system, no package manager, no framework.**

---

## 2. Existing Pages

| Page | File | Notes |
|------|------|-------|
| Entry / Redirect | `index.html` | Contains only a JS `window.location.href = "pragati_portfolio.html"` redirect |
| Main Portfolio | `pragati_portfolio.html` | Single-page application with all sections |

**No 404.html, no separate pages, no routing.**

---

## 3. Existing Sections (in DOM order)

| # | Section ID | Label | Notes |
|---|-----------|-------|-------|
| 1 | `#home` (hero) | Hero | Name, role rotator, stats bar, CTA buttons |
| 2 | `#about` | About | Bio text, avatar, skill pills, 2-column layout |
| 3 | `#skills` | Skills | Categorized skill cards (Backend, Frontend, Database, Tools) |
| 4 | `#experience` | Experience | Timeline cards with company info |
| 5 | `#projects` | Projects | Filterable project cards with screenshots |
| 6 | `#education` | Education | Education cards |
| 7 | `#certificates` | Certificates | Certificate cards with modal viewer |
| 8 | `#publications` | Publications | Publication cards with PDF link |
| 9 | `#contact` | Contact | Contact form + email/phone/location info |

---

## 4. Existing Assets

### HTML Files
| File | Size | Purpose |
|------|------|---------|
| `index.html` | 70 B | Redirect entry point |
| `pragati_portfolio.html` | 97,913 B | Full portfolio (monolithic) |

### CSS
- **No external CSS file.** All styles are in a `<style>` block inside `pragati_portfolio.html`.
- CSS custom properties (design tokens) defined in `:root` — well-structured.
- Two themes: dark (default) and light (via `body.theme-light` class).
- ~900+ lines of embedded CSS covering all components.

### JavaScript
- **No external JS file.** All scripts are in `<script>` tags at the bottom of `pragati_portfolio.html`.
- ~200+ lines of embedded vanilla JavaScript.

### Images
| File | Size | Role |
|------|------|------|
| `pragati.png` | ~985 KB | Profile photo (used in hero section) |
| `publication.png` | ~322 KB | Publication section cover image |
| `Modern Portfolio Website Design...jpg` | ~35 KB | Project screenshot/banner |
| `Screenshot 2026-05-22 120106.png` | ~417 KB | Project screenshot |
| `Screenshot 2026-05-22 122837.png` | ~238 KB | Project screenshot |
| `Screenshot 2026-05-22 122915.png` | ~236 KB | Project screenshot |
| `Screenshot 2026-05-22 122943.png` | ~248 KB | Project screenshot |

### Certificate Images
| File | Size |
|------|------|
| `apexplanet_webdev_certificate.png` | ~281 KB |
| `cyber.png` | ~237 KB |
| `grad_guru_certificate.png` | ~362 KB |
| `seed_java_sql_certificate.png` | ~337 KB |
| `vaultofcodes_python_certificate.png` | ~298 KB |

### Documents (PDFs)
| File | Size | Purpose |
|------|------|---------|
| `Pragati_Tayade_Resume.pdf` | ~267 KB | Downloadable resume |
| `Published paper.pdf` | ~285 KB | Research paper PDF |

---

## 5. Existing Functionality

### Navigation
- **Sticky header** with glass-morphism backdrop blur (`position: sticky; backdrop-filter: blur(12px)`)
- **Active link tracking** via Intersection Observer API — `nav-links a.active` class applied to visible section
- **Smooth scrolling** (`scroll-behavior: smooth` on `html`)
- **Mobile hamburger menu** — toggles `.open` class on `.nav-links` at `max-width: 820px`
- **Brand logo** links to `#home`

### Theme System
- **Dark mode** by default (CSS variables in `:root`)
- **Light mode** via `body.theme-light` class (CSS overrides + floating blobs + grid background)
- **Theme persisted** in `localStorage` under key `"theme"`
- **Theme toggler button** with Sun/Moon SVG icon swap

### Hero Section
- **Animated role rotator** — cycles through role titles with slide-in/slide-out animation
  - Roles: `Java Full-Stack Developer`, `Backend Engineer`, `Web Developer`, `Problem Solver`
- **Blinking cursor** animation adjacent to role text
- **Pulsing green dot** "Available for Work" badge
- **Stats bar** — 4 stats (Projects, Experience, Technologies, Certifications)
- **Social icons row** — GitHub, LinkedIn, Email, LeetCode (inline SVG icons)
- **CTA buttons** — "View My Work" (scrolls to `#projects`) and "Download Resume" (downloads `Pragati_Tayade_Resume.pdf`)
- **Hero avatar** — `pragati.png` with decorative ring and floating dot animations
- **Cyan glow orbs** — CSS pseudo-element background animation

### About Section
- Two-column grid layout (text left, image right)
- Personal description paragraph
- Skill tags/pills (e.g., Java, Spring Boot, React)
- Two CTA buttons — "Hire Me" (scroll to `#contact`), "View Projects" (scroll to `#projects`)

### Skills Section
- Categorized into 4 groups: **Backend**, **Frontend**, **Database & Cloud**, **Tools & Practices**
- Each skill item has an emoji icon and skill name
- Responsive grid layout

### Experience Section
- Timeline card layout
- Company name, role, duration, description
- Technologies used tags

### Projects Section
- **Filter buttons** — All, Full-Stack, Frontend, Java/Backend
- **Filter logic** — JavaScript filters cards based on `data-category` attribute
- Project cards with screenshot image, title, description, tech tags, GitHub/Live links

### Education Section
- Education cards with degree, institution, year, grade/CGPA

### Certificates Section
- Certificate cards with image thumbnail
- **Lightbox / Modal viewer** — clicking card opens a full-screen modal with enlarged certificate image
- Modal has close button (×)
- Download button per certificate

### Publications Section
- Publication card with image, title, journal name, year, abstract excerpt
- "Read Full Paper" button (links to `Published paper.pdf`)

### Contact Section
- **Contact form** with fields: Full Name, Email, Subject, Message — all `required`
- Form uses `action="https://formspree.io/f/..."` (Formspree endpoint)
- Info cards — Email, Phone, Location
- Social links row (GitHub, LinkedIn)

### Animations
| Animation | Implementation |
|-----------|---------------|
| `floatBlob` | Light theme background blob float |
| `heroGlowFloat` | Hero section cyan orb float |
| `pulseGreen` | Availability dot pulse |
| `blinkCursor` | Typing cursor blink |
| Role rotator | `.slide-out`/`.slide-in` CSS class toggle via JS `setInterval` |
| Scroll reveal | Intersection Observer — `.visible` class added to `.reveal` elements |
| Card hover lift | CSS `transform: translateY(-6px) scale(1.015)` on hover |
| Button hover | `translateY(-2px)` on all buttons |
| Social icon hover | Cyan glow box-shadow on hover |

### Download Buttons
| Button | Target |
|--------|--------|
| "Download Resume" (hero) | `Pragati_Tayade_Resume.pdf` |
| "Download Resume" (about/contact) | `Pragati_Tayade_Resume.pdf` |
| Per-certificate download | Individual certificate `.png` files |
| "Read Full Paper" | `Published paper.pdf` |

### Responsive Design
| Breakpoint | Behavior |
|-----------|----------|
| `max-width: 820px` | Hamburger menu shown, nav-links hidden |
| `max-width: 900px` | Hero/About grid collapses to single column; hero avatar moves to top |
| `max-width: 900px` | Hero socials/CTAs centered |
| `max-width: 600px` | Stats bar collapses from 4-col to 2-col |
| Fluid typography | `clamp()` used throughout for headings and section padding |

### SEO Metadata (in `<head>`)
```html
<title>Pragati Tayade | Java Full-Stack Developer Portfolio</title>
<meta name="description" content="Professional portfolio of Pragati Tayade, Java Full-Stack Developer showcasing web projects, experience, and certifications." />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
```
**Missing:** Open Graph tags, Twitter Card tags, canonical URL, favicon, `robots.txt`, `sitemap.xml`

### Forms
- **Contact form** — Formspree.io integration (`action="https://formspree.io/f/..."`)
- No client-side form validation JavaScript (relies on browser `required` attribute only)
- No CAPTCHA, no rate limiting on the client side

---

## 6. Broken or Duplicate Code

| Issue | Location | Severity |
|-------|----------|----------|
| **Formspree endpoint possibly placeholder** | Contact form `action` attribute | High — form submissions may silently fail |
| **No favicon defined** | `<head>` | Low — browsers show blank tab icon |
| **No Open Graph / Twitter Card meta tags** | `<head>` | Medium — poor social media preview sharing |
| **`index.html` redirect is JavaScript-only** | `index.html` | Medium — fails if JavaScript is disabled |
| **Profile image `pragati.png` is ~985 KB** | Hero avatar | Medium — very large unoptimized image; causes slow LCP on mobile |
| **All project screenshot files have generic names** | `Screenshot 2026-05-22 *.png` | Low — not descriptive; risk of confusion during migration |
| **CSS not split from HTML** | `pragati_portfolio.html` | Low (by design for static) — becomes critical for React |
| **JS not split from HTML** | `pragati_portfolio.html` | Low (by design for static) — becomes critical for React |
| **`canonical` URL missing** | `<head>` | Medium — GitHub Pages serves both with and without trailing slash |
| **Formspree CORS / redirect behavior** | Contact form | Medium — Formspree free tier redirects to thank-you page; no AJAX submission |
| **No 404 page** | Repo root | Low — GitHub Pages will show default 404 |

---

## 7. Hardcoded Portfolio Content

All content is hardcoded directly in `pragati_portfolio.html`. There is no CMS, no JSON data file, and no database. Every piece of content below must be extracted and placed into React component data or a data layer during migration:

- **Name:** Pragati Tayade
- **Title:** Java Full-Stack Developer
- **Role rotation array:** `['Java Full-Stack Developer', 'Backend Engineer', 'Web Developer', 'Problem Solver']`
- **Stats:** Projects Built, Years Experience, Technologies, Certifications
- **Skills list:** Hardcoded in HTML
- **Experience entries:** Hardcoded in HTML
- **Project cards:** Hardcoded in HTML with `data-category` attributes
- **Education entries:** Hardcoded in HTML
- **Certificate names & filenames:** Hardcoded
- **Publication details:** Hardcoded
- **Contact info (email, phone, location):** Hardcoded in HTML

---

## 8. External Dependencies

| Dependency | Type | URL | Loaded via |
|-----------|------|-----|-----------|
| **Google Fonts — Inter** | Font | fonts.googleapis.com | `<link>` in `<head>` |
| **Google Fonts — Outfit** | Font | fonts.googleapis.com | `<link>` in `<head>` |
| **Formspree.io** | Form backend | formspree.io | `<form action>` |
| **GitHub Pages** | Hosting | github.io | Deployment target |
| **Font Awesome / Iconify** | Icons | None — all icons are inline SVG | No external icon library |

**No CDN CSS framework (no Bootstrap, Tailwind, or Bulma).** All styling is custom vanilla CSS.

---

## 9. GitHub Pages Deployment Method

| Property | Value |
|---------|-------|
| Repo type | Public GitHub repository |
| Deployment source | `main` branch, root folder (`/`) |
| Entry point | `index.html` (redirects to `pragati_portfolio.html`) |
| Custom domain | None — uses `pragatitayade13.github.io/Pragati_portfolio/` |
| Build process | None — static files served directly |
| CI/CD | None — manual push deploys |
| `gh-pages` branch | Not used — served from `main` |

---

## 10. Risks During Migration

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Asset URL path changes (relative → absolute) | High | High | Map all asset paths; configure React public folder or use imports |
| Formspree endpoint breaks in React SPA | High | Medium | Migrate to React `fetch` POST with JSON or keep Formspree AJAX mode |
| Theme persistence (localStorage) lost | Medium | Low | Re-implement in React context with `localStorage` sync |
| Scroll-based active nav link stops working | High | Medium | Replace Intersection Observer with React Router hash navigation or `react-scroll` |
| CSS animation complexity in JSX | Medium | Low | Convert animations to CSS Modules or styled-components |
| Image optimization not done | High | Medium | Compress `pragati.png` (985KB → target <150KB) before migrating |
| GitHub Pages routing for React SPA | High | High | React Router with HashRouter or `404.html` redirect trick for GitHub Pages |
| `index.html` JS redirect breaks | High | Medium | Remove redirect; point GitHub Pages directly to the right entry |
| Inline SVG icons need extraction | Low | Low | Extract to React SVG components |
| Project screenshot filenames with spaces | Medium | Low | Rename files during asset migration to URL-safe names |
| Loss of Intersection Observer reveal animations | Medium | Low | Implement with `react-intersection-observer` library |
| Contact form `required` validation | Low | Low | Implement React controlled form with validation |
| No SEO meta tags (OG, Twitter) | Medium | Medium | Add `react-helmet-async` or Next.js metadata API |

---

## 11. React Migration Recommendations

### Architecture
- Use **Vite + React** for fast builds and GitHub Pages compatibility
- Use **React Router v6** with `HashRouter` for GitHub Pages SPA routing
- Use **CSS Modules** per component (mirrors existing class-based CSS structure)
- Extract all hardcoded data to `/src/data/` JSON or JS object files

### Component Breakdown
```
src/
├── components/
│   ├── Navbar/
│   ├── Hero/
│   ├── About/
│   ├── Skills/
│   ├── Experience/
│   ├── Projects/
│   ├── Education/
│   ├── Certificates/
│   ├── Publications/
│   ├── Contact/
│   └── Footer/
├── contexts/
│   └── ThemeContext.jsx
├── data/
│   ├── projects.js
│   ├── skills.js
│   ├── experience.js
│   ├── education.js
│   ├── certificates.js
│   └── publications.js
├── hooks/
│   ├── useScrollSpy.js
│   └── useTheme.js
└── assets/
    ├── images/
    └── documents/
```

### Key Libraries to Add
| Purpose | Recommended Package |
|---------|-------------------|
| Routing | `react-router-dom` |
| Scroll reveal | `react-intersection-observer` |
| Smooth scroll | `react-scroll` |
| Form handling | `react-hook-form` |
| SEO / meta | `react-helmet-async` |
| Animations | `framer-motion` (optional, enhances existing animations) |
| Icons | `react-icons` (replaces inline SVGs) |

### Deployment
- Use **GitHub Actions** workflow to build Vite and push `dist/` to `gh-pages` branch
- Set `base` in `vite.config.js` to `/Pragati_portfolio/`
- Or migrate to **Firebase Hosting** for full deployment control + CDN

### Pre-Migration Tasks (must complete before Wave 1)
1. Backup all files (this wave - DONE)
2. Rename project screenshot files to URL-safe names
3. Compress `pragati.png` (985 KB is unacceptable for production)
4. Verify Formspree form ID is active
5. Decide: Firebase Hosting OR GitHub Pages for React deployment
6. Confirm contact info accuracy (email, phone, location)
7. Add favicon.ico / favicon.svg before React setup

---

*End of Migration Audit — Wave 0*
