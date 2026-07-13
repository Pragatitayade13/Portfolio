# HTML TO REACT MIGRATION REPORT — Wave 2

**Report Date:** 2026-07-13  
**Auditor/Developer:** Senior React Migration Architect  
**Migration Scope:** Full static HTML to React component conversion (Wave 2)

---

## 1. Components Created

The static layout has been modularized into the following reusable React components:

### Scaffolding Scoped Directories

| Directory | File | Purpose |
|-----------|------|---------|
| `src/components/layout/` | [Header.jsx](file:///d:/new%20portfolio/src/components/layout/Header.jsx) | Sticky navbar, brand dot, theme switch triggers |
| | [MobileNavigation.jsx](file:///d:/new%20portfolio/src/components/layout/MobileNavigation.jsx) | Navigation links stack drawer for mobile screens |
| | [Footer.jsx](file:///d:/new%20portfolio/src/components/layout/Footer.jsx) | Page copyright and social links wrapper |
| | [AppLayout.jsx](file:///d:/new%20portfolio/src/components/layout/AppLayout.jsx) | Grid background, back-to-top button, layout wrapper |
| `src/components/common/` | [SectionHeading.jsx](file:///d:/new%20portfolio/src/components/common/SectionHeading.jsx) | Section headers (label, title, subtitle) aggregator |
| | [ThemeToggle.jsx](file:///d:/new%20portfolio/src/components/common/ThemeToggle.jsx) | Button with Sun/Moon swap icons using lucide-react |
| | [SocialLinks.jsx](file:///d:/new%20portfolio/src/components/common/SocialLinks.jsx) | Inline SVG paths for GitHub, LinkedIn, Email, LeetCode |
| | [ScrollToTop.jsx](file:///d:/new%20portfolio/src/components/common/ScrollToTop.jsx) | Auto-hiding back-to-top button (triggers >500px) |
| | [ExternalLink.jsx](file:///d:/new%20portfolio/src/components/common/ExternalLink.jsx) | Target `_blank` link wrapping logic |
| | [DocumentLink.jsx](file:///d:/new%20portfolio/src/components/common/DocumentLink.jsx) | Download helper component for PDFs |
| `src/components/sections/` | [Hero.jsx](file:///d:/new%20portfolio/src/components/sections/Hero.jsx) | Title cycle, typing cursor, avatar frame, stats counter |
| | [About.jsx](file:///d:/new%20portfolio/src/components/sections/About.jsx) | Profile bio paragraphs and checkmark skills lists |
| | [Skills.jsx](file:///d:/new%20portfolio/src/components/sections/Skills.jsx) | Interactive fill-width indicator skill-bars cards |
| | [Experience.jsx](file:///d:/new%20portfolio/src/components/sections/Experience.jsx) | Timeline list and details cards |
| | [Projects.jsx](file:///d:/new%20portfolio/src/components/sections/Projects.jsx) | Chips filter buttons, search input, details dialog modal |
| | [ProjectCard.jsx](file:///d:/new%20portfolio/src/components/sections/ProjectCard.jsx) | Reusable projects display item with covers map |
| | [Education.jsx](file:///d:/new%20portfolio/src/components/sections/Education.jsx) | Academics cards layout |
| | [Certifications.jsx](file:///d:/new%20portfolio/src/components/sections/Certifications.jsx) | Training certs items linking to files |
| | [Publications.jsx](file:///d:/new%20portfolio/src/components/sections/Publications.jsx) | Research papers publication display cards |
| | [Contact.jsx](file:///d:/new%20portfolio/src/components/sections/Contact.jsx) | Contact form fields with reset validation |
| `src/pages/` | [PortfolioPage.jsx](file:///d:/new%20portfolio/src/pages/PortfolioPage.jsx) | Main landing single-page composition |
| | [ProjectsPage.jsx](file:///d:/new%20portfolio/src/pages/ProjectsPage.jsx) | Standalone projects page |
| | [ContactPage.jsx](file:///d:/new%20portfolio/src/pages/ContactPage.jsx) | Standalone contact page |
| | [NotFoundPage.jsx](file:///d:/new%20portfolio/src/pages/NotFoundPage.jsx) | Branded 404 page |

---

## 2. HTML Sections Migrated

The original single-page HTML layout sections have been extracted and mapped into modular JSX components:

1. **Header Navigation:** Configured to highlight active sections on scroll using a custom Intersection Observer hook.
2. **Hero/Home Section:** Title rotator converted to React `setInterval` cycle. Stats counter counts from 0 to 3 on scroll intersection using `requestAnimationFrame`.
3. **Projects Showcase:** Category filter state, text query search filter, and selected project detail modal are all managed reactively.
4. **About & Skills:** Progress bars animate to their target widths on section scroll intersection.
5. **Timeline & Academics:** Structured lists of company roles and degree details.
6. **Certifications & Publications:** Extracted individual cards. Research paper PDF links are active and functional.
7. **Contact:** Native mock form submission reset and message feedback notices.

---

## 3. Assets Moved

Original assets from the `legacy-portfolio/` backup folder have been copied into the React project:

- **Images (`src/assets/images/`):**
  - `pragati.png` (Profile photo)
  - `publication.png` (Publication cover)
  - `Screenshot 2026-05-22 120106.png` (Project cover)
  - `Screenshot 2026-05-22 122837.png` (Project cover)
  - `Screenshot 2026-05-22 122915.png` (Project cover)
  - `Screenshot 2026-05-22 122943.png` (Project cover)
  - `Modern Portfolio Website Design _ Custom Developer Site _ Professional Web Development Services.jpg`
- **Certificates (`src/assets/certificates/`):**
  - `cyber.png` (Cisco cybersecurity certificate)
  - `apexplanet_webdev_certificate.png` (ApexPlanet internship certificate)
  - `grad_guru_certificate.png` (Webinar certificate)
  - `seed_java_sql_certificate.png` (SEED core java certificate)
  - `vaultofcodes_python_certificate.png` (VaultOfCodes Python internship certificate)
- **Documents (`src/assets/documents/` & `public/`):**
  - `Pragati_Tayade_Resume.pdf` (Resume PDF)
  - `Published paper.pdf` (Research paper publication PDF)

*Note: Placing copies inside the `public/` directory ensures download and viewing links work on production builds without base-path mismatch issues.*

---

## 4. Functionality Preserved

- **Dark & Light Themes:** Context-based switching. On load, it checks local storage or queries the system's preferred theme, applying the corresponding theme class dynamically to the `<body>` element.
- **Micro-Animations:** Background blob float, green pulsing availability status, typing cursor, and bento card hover-lifts are preserved exactly.
- **Scroll Spy Active Link:** Active section is tracked and highlighted on the navigation bar.
- **Hamburger Menu:** Collapses into a toggle drawer on mobile viewports.
- **Contact Form Validation:** Validates name, email, and message lengths before providing success notice feedback.

---

## 5. Issues Corrected

- **JSX Semantic Rules:** Substituted all instances of `class` with `className` and `for` with `htmlFor`.
- **Target Security:** Configured all external links with `target="_blank" rel="noopener noreferrer"` attributes.
- **Unused ID Duplications:** Cleared duplicate IDs from the DOM (e.g. contact form labels, headers, and buttons).
- **Vite Bundler Resolution:** Converted static relative file references to imported bundler paths, ensuring no missing resources or broken links.

---

## 6. Remaining Work (Future Waves)

- **Wave 3:** Compress `pragati.png` profile image to improve mobile loading times.
- **Wave 9:** Connect Contact form submission to Firebase or a live backend form handler instead of mock reset alerts.
- **Wave 10:** Create the authenticated Admin Dashboard page.

---

*End of HTML to React Report — Wave 2*
