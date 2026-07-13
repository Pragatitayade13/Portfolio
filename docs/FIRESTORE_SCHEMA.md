# Cloud Firestore Data Model & Schema Guide

This document outlines the Firestore data model, relationships, and validation rules for the portfolio application.

---

## 1. Fixed Documents (Singular configurations)

Fixed documents store singular configurations or profiles. They use a fixed document path (e.g. `colId/main`).

### Collection: `portfolioSettings`
Stores global application settings.
- **Document ID:** `main`
- **Fields:**
  - `themeDefault` (string, required): Default theme (e.g. `"dark"`)
  - `maintenanceMode` (boolean, required): Toggle to lock site details
  - `migrated` (boolean, required): Flag indicating database is migrated (`true`)
  - `migratedAt` (string, optional): Timestamp of migration
  - `createdAt` (serverTimestamp)
  - `updatedAt` (serverTimestamp)

### Collection: `profile`
Stores personal details shown in the Hero area.
- **Document ID:** `main`
- **Fields:**
  - `name` (string, required): Full Name (e.g. `"Pragati Tayade"`)
  - `greeting` (string, required): Greeting prefix (e.g. `"Hello, I'm"`)
  - `roles` (array of strings, required): Carousel rotating title array
  - `avatarUrl` (string, required): Filename or Storage URL for profile picture
  - `availability` (string, required): Status text (e.g. `"Available for Work"`)
  - `stats` (array of maps, required): Numeric statistics
    - `value` (number)
    - `label` (string)
    - `suffix` (string, optional)
  - `coreStack` (array of strings, required): Highlighted tech names (e.g. `["Java", "React"]`)

### Collection: `about`
Stores biography details.
- **Document ID:** `main`
- **Fields:**
  - `story` (string, required): Biography paragraph text
  - `whatIBring` (array of strings, required): Key checklist bullet points
  - `strengths` (array of maps, required): Grid cards list
    - `icon` (string): Emoji character representation
    - `title` (string)
    - `desc` (string)

### Collection: `resume`
Stores current CV file path details.
- **Document ID:** `main`
- **Fields:**
  - `fileName` (string, required): Name of download PDF (e.g. `"Pragati_Tayade_Resume.pdf"`)

### Collection: `contactSettings`
Stores contact options.
- **Document ID:** `main`
- **Fields:**
  - `recruiterCta` (string, required): Paragraph text pitching recruiters
  - `email` (string, required): Main target mailbox
  - `location` (string, required): Current residential city

---

## 2. List Collections (Multiple items)

List collections store repeating items. Every record in a list collection **MUST** include metadata fields for publication and order sorting.

### Shared List Metadata
Every document in a list collection includes these fields:
- `id` (number, required): Unique index
- `published` (boolean, required): True if visible to guests
- `sortOrder` (number, required): Order index (ascending)
- `createdAt` (serverTimestamp)
- `updatedAt` (serverTimestamp)

### Collection: `projects`
- **Fields:**
  - `title` (string, required)
  - `category` (string, required): `Web App`, `Tool`, etc.
  - `year` (number, required)
  - `status` (string, required): `Completed`, `Active`
  - `tech` (array of strings, required)
  - `summary` (string, required): Short summary text
  - `details` (string, required): Long detail text
  - `problem` (string, required): Problem statement case study
  - `solution` (string, required): Developed solution details
  - `contribution` (string, required): Dev contribution summary
  - `url` (string, required): Live website URL
  - `repo` (string, required): GitHub repository URL
  - `icon` (string, required): Image mapping ID (e.g. `"hotel"`)
  - `slug` (string, required, UNIQUE): URL-friendly string identifier (e.g. `"hotel-order-system"`)

### Collection: `skillCategories`
- **Fields:**
  - `categoryName` (string, required): e.g. `"Backend & Systems"`
  - `skillsList` (array of strings, required): e.g. `["Java", "Spring Boot"]`

### Collection: `experiences`
- **Fields:**
  - `date` (string, required): Duration range (e.g. `"July 2025 - August 2025"`)
  - `title` (string, required): Job Role
  - `company` (string, required)
  - `desc` (string, required): Job description paragraph
  - `techs` (array of strings, required)

### Collection: `education`
- **Fields:**
  - `icon` (string, required): Emoji icon (e.g. `"🎓"`)
  - `date` (string, required): Year range (e.g. `"2022 - 2026"`)
  - `degree` (string, required)
  - `school` (string, required)
  - `details` (string, required)

### Collection: `certificates`
- **Fields:**
  - `title` (string, required)
  - `issuer` (string, required)
  - `date` (string, required)
  - `icon` (string, required): Asset mapping file (e.g. `"cyber"`)
  - `borderColor` (string, required): CSS color token hex

### Collection: `publications`
- **Fields:**
  - `title` (string, required)
  - `issuer` (string, required)
  - `date` (string, required)
  - `desc` (string, required)
  - `icon` (string, required): Asset mapping file (e.g. `"publication"`)
  - `paperFile` (string, required): Download PDF file reference

### Collection: `socialLinks`
- **Fields:**
  - `name` (string, required): Platform (e.g. `"GitHub"`)
  - `url` (string, required)
  - `icon` (string, required)

---

## 3. Operations & Rules

### Sorting Behavior
When fetching lists, clients **MUST** query sorting by `sortOrder` ascending:
```javascript
import { query, orderBy } from 'firebase/firestore';
const q = query(collectionRef, orderBy('sortOrder', 'asc'));
```

### Publication Filter
Public/anonymous queries **MUST** filter by `published == true`:
```javascript
import { query, where, orderBy } from 'firebase/firestore';
const q = query(collectionRef, where('published', '==', true), orderBy('sortOrder', 'asc'));
```

---

## 4. Rollback and Disaster Recovery

If a migration fails or data is corrupted, you can easily clean up and re-run the one-time migration.

### Database Reset & Re-migration
1. Go to your **Firebase Console** > **Firestore Database**.
2. For each collection (`profile`, `about`, `projects`, `skillCategories`, `experiences`, `education`, `certificates`, `publications`, `socialLinks`, `resume`, `contactSettings`, `portfolioSettings`), delete all documents inside them.
3. Once the database is completely empty, refresh the local developer page.
4. Click the **⚙️ Migrate Initial Data** button in the footer area to re-run the process.
5. The script will recreate all documents and mark the database settings status as `migrated: true`.
