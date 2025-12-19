---

# 01_constraints.md

System Constraints & Foundational Principles (Static-First Web System)
(Version 2.0 — designed for `lab-site` Next.js + Nextra architecture)

---

## 1. Platform & Environment Constraints

### 1.1 Runtime Environment
- **Build Time**: Node.js (Latest LTS).
- **Runtime (Client)**: Modern Web Browsers (ES6+, flexbox/grid).
- **Runtime (Server)**: None (Static Export).
  - The system must function fully as a static site deployed to GitHub Pages.
  - No dependence on runtime server-side rendering (SSR) logic that requires a Node.js server in production (API routes must be build-time only or client-side fetch).

### 1.2 Infrastructure Independence
- **Hosting Agnostic**: While GitHub Pages is the primary target, the build output (`out/` or `public/`) must be deployable to any static host (Vercel, Netlify, S3) without code changes.
- **Path Independence**: The site must handle `basePath` correctly (e.g., `/lab-site/` vs `/`) to support subdirectory hosting.

### 1.3 Tech Stack Constraints
- **Core Framework**: Next.js (App Router preferred, Pages Router accepted if Nextra dictates).
- **Content Engine**: Nextra (or equivalent MDX pipeline).
- **Styling**: Tailwind CSS (preferred) or CSS Modules. Avoid CSS-in-JS libraries that break static export.
- **Languages**: TypeScript (Strict Mode) for all code; MDX for content.

---

## 2. Architectural Constraints

### 2.1 Content-Driven Architecture
- **Source of Truth**: The file system (`content/`) is the database.
- **Canonical Schemas**: All content (People, Papers, etc.) must validate against strict schemas defined in `11_interfaces.ir.yml`.
- **No Invisible State**: No database calls, no external CMS fetching during build (unless explicitly documented as a sync script).

### 2.2 Capsule-Oriented Components
- UI components must be **atomic** and **reusable**.
- A component should not fetch its own data; data should be passed via props (dumb components).
- Page components (routes) are responsible for data fetching/parsing and passing it to UI components.

### 2.3 Layered Architecture
1. **Content Layer**: Raw MDX/JSON files.
2. **Schema Layer**: Zod/Valibot definitions enforcing `11_interfaces`.
3. **Data Access Layer**: Functions to read/parse/validate content (Server-side only during build).
4. **UI Layer**: React components rendering the data.
5. **Build Layer**: Next.js build process + GH Actions.

---

## 3. Performance & Quality Constraints

### 3.1 Build Performance
- **Incremental Builds**: The architecture should support Next.js incremental static regeneration (ISR) concepts where possible, even if full static export is used (caching processing results).
- **determinism**: `npm run build` must produce bit-identical output for the same content input (excluding timestamps).

### 3.2 Runtime Performance
- **Core Web Vitals**: Aim for Green (LCP < 2.5s, CLS < 0.1).
- **Image Optimization**: Use `next/image` (unoptimized for static export if necessary, or strictly managed assets).
- **Client-side JS**: Minimize hydration payload. Content-heavy pages should be mostly HTML/CSS.

### 3.3 Link Safety
- **Internal Links**: Must be validated at build time. Broken internal links = Build Fail.
- **External Links**: Checked via separate cron/workflow (Warn only).

---

## 4. Safety & Robustness

### 4.1 Schema Validation
- **Fail Fast**: If a content file (e.g., a Person profile) is missing a required field, the build **must fail** with a clear error message pointing to the file.
- **No Silent Failures**: Do not render "undefined" or empty states for required data.

### 4.2 Content Integrity
- **Slug Stability**: URLs should not change arbitrarily.
- **Date Handling**: Dates must be ISO 8601 strict in source, formatted locally in UI.

---

## 5. Multi–LLM Collaboration Constraints

### 5.1 Role Separation
- **Gemini CLI (Architect)**: Owns `spec/` (00, 01, 10, 11). Defines *what* and *why*.
- **Codex Max (Planner)**: Owns `spec/` (20, 21, 30, 31). Defines *how* (files, tasks, tests).
- **Claude Code (Builder)**: Owns `src/`, `content/`. Implements code.

### 5.2 IR as Authority
- Code must follow IR schemas.
- If code needs a new field, update `11_interfaces` first.

---

## 6. System Philosophy

### 6.1 "One File, One Entry"
- A paper, a person, a project = a single file (MDX or JSON).
- Minimizes merge conflicts and simplifies content management.

### 6.2 "Static First, Dynamic Optional"
- Assume the user has no backend.
- Search is client-side (FlexSearch/MiniSearch) or build-time generated indices.

---

## 7. Non-Negotiable Rules
- **No Database**: Do not introduce Postgres, MySQL, MongoDB, etc.
- **No Secrets in Repo**: API keys for optional integrations must be env vars.
- **TypeScript**: No `any` types allowed in core interfaces.
- **Human Authority**: The user (오재홍) has final say on design decisions.


