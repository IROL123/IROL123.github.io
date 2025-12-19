# 00. High-Level Plan
Lab Website System (Next.js + Nextra) — Spec-Driven, IR-First

> **Purpose of this document**
> This file defines the *top-level intent, scope, and rules* of the system.
> All other spec/IR files (01/10/11/20/21/30/31) are refinements of what is stated here.
> If any lower-level spec conflicts with this document, **this document wins**.

---

## 0. How to Read and Use This Document

- **Audience**
  - Human architect (오재홍)
  - LLM collaborators (Gemini CLI, Codex Max, Claude Code)

- **Authority level**
  - This document is the **source of truth** above all other spec files.
  - IR-first: no implementation work proceeds unless the IR is coherent.

- **Update policy**
  - Update this file only when the **direction** changes (scope/vision, major IA, multi-LLM workflow).
  - Day-to-day changes (content, components, minor refactors) live in:
    - 20_impl_plan.ir.yml (implementation mapping)
    - 31_todo_backlog.ir.yml (tasks)
    - 30_code_status.ir.yml (reality snapshot)
    - 21_test_plan.ir.yml (smoke tests)

---

## 1. System Identity

### 1.1 System Name
- **Name**: `lab-site` (Working codename)

### 1.2 One-Sentence Definition
A GitHub-hosted research lab website built with **Next.js + Nextra**, optimized for publishing and maintaining **People / Papers / Projects / Notices / Datasets** as structured content, with spec-driven consistency and automation.

### 1.3 Longer Description (3–6 sentences)
This system is a research lab’s public-facing website and knowledge hub.
It must support fast publishing of research outputs (papers, projects, datasets) and lab updates (people changes, announcements) with minimal operational burden.
The site is **static-first** (GitHub Pages friendly) but designed so that future extension (analytics, server features) is possible without re-architecting core content.
Content is written in MDX (or structured JSON/YAML where appropriate), validated against canonical schemas, and rendered through reusable React components.

---

## 2. Goals and Non-Goals

### 2.1 Goals (Must Enable)
- **G1. Canonical content model** for: People, Papers, Projects, Notices, Datasets.
- **G2. Easy updates**: adding/editing items should be “one file change + preview + merge”.
- **G3. Stable information architecture**: navigation, taxonomy, tags, citations, and linking are consistent.
- **G4. Static deployment**: deployable via GitHub Actions to GitHub Pages (or equivalent) reliably.
- **G5. Automation hooks**: optional scripts for generating lists, validating schema, and preventing drift.

### 2.2 Non-Goals (Explicitly Not)
- Not a full CMS requiring a DB (no mandatory backend).
- Not a general-purpose SaaS webapp template.
- Not a robotics runtime system (robots/ROS/MQTT are *content topics*, not system dependencies).
- Not optimized for heavy interactive 3D dashboards as a baseline (can be added later as optional pages).

---

## 3. Problem Space and Key Use Cases

### 3.1 Primary Domains (Public Website)
- People directory (profiles, roles, interests, links)
- Publications list (bib info, pdf links, code links, venue/year filters)
- Projects portfolio (summaries, media, repos, status)
- Notices (announcements, seminars, recruiting)
- Datasets (metadata, download links, license, citation)

### 3.2 Key Use Cases (Narratives)

- **UC-1: Update a Paper**
  - A lab member adds a new publication by creating a single MDX/JSON entry.
  - The site automatically shows it in: /papers, year-based lists, tag-based lists, and author pages.
  - Success criteria:
    - The build fails if required fields are missing.
    - The new paper appears in correct sort order and taxonomy.

- **UC-2: Add/Remove a Member**
  - A member joins/leaves; we update People entries without touching page code.
  - Success criteria:
    - Profile renders correctly with consistent layout.
    - Lists update automatically (by role/lab group/etc.).

- **UC-3: Announce a Notice**
  - A notice is posted (deadline, seminar, recruiting).
  - Success criteria:
    - Notice appears on home + /notices.
    - Expired notices can be hidden via frontmatter/date rules.

- **UC-4: Publish a Dataset**
  - A dataset entry includes license, citation snippet, and download links.
  - Success criteria:
    - Citation block is rendered.
    - Link checks and schema validation pass in CI.

---

## 4. High-Level Architecture (Conceptual)

### 4.1 Architectural Overview (Words First)
The system is a static-first website with a content pipeline:
1) **Content Sources** (MDX/JSON/YAML) live in-repo.
2) **Schema Validation** ensures each content type matches canonical fields.
3) **Indexing/Derivation** generates lists and cross-links (tags, years, authors).
4) **Rendering** uses React components (Nextra theme + custom components).
5) **Deployment** publishes static output to GitHub Pages with CI gates.

### 4.2 Main Layers (for this web system)
- **Content Layer**
  - MDX/structured data files for People/Papers/Projects/Notices/Datasets.
- **Schema & Index Layer**
  - Type definitions + validators; derived indexes (tags, years, slugs).
- **UI Component Layer**
  - Reusable React components (cards, lists, citations, filters).
- **App Routing Layer**
  - Next.js/Nextra routing, nav config, SEO, sitemap.
- **Build & Deploy Layer**
  - CI, preview build, link checking, GitHub Pages deployment.

### 4.3 High-Level Data Flows
- **Flow A – Content → Validation → Index → Pages**
  - Input: MDX/JSON entries
  - Output: Rendered pages + lists
  - Invariants:
    - Required fields exist
    - Stable slugs/permalinks
    - Deterministic sorting and taxonomy

- **Flow B – Contributor PR → CI checks → Deploy**
  - Input: PR with content edits
  - Output: Verified build + deploy
  - Invariants:
    - CI blocks schema-breaking merges
    - Deploy is reproducible and consistent

---

## 5. Content Model (Canonical Entities)

> The canonical fields are defined in `spec/11_interfaces.ir.yml` and enforced by validation.
> This section is the human-readable intent.

### 5.1 Entities
- **Person**
  - name, role, affiliation, email(optional), links, research_keywords, image(optional)
- **Paper**
  - title, authors, venue, year, abstract(optional), links(pdf/code/project), bibtex(optional), tags
- **Project**
  - title, summary, status, timeline(optional), links(repo/demo/paper), media(optional), tags
- **Notice**
  - title, date, category, body, pinned(optional), expiry(optional)
- **Dataset**
  - name, description, license, version, download_links, citation, tags

### 5.2 Update Philosophy
- “One entry = one file” (가능하면)
- Changing layout should not require touching content files.
- Adding new field requires: **00 update? (rare) → 11_interfaces update → implementation**.

---

## 6. Multi-LLM Collaboration Model (Strict Separation)

### 6.1 Actors & Responsibilities
- **Human Architect (You)**
  - Owns direction, final decisions, merges spec changes.

- **Gemini CLI — System Architect & Spec Designer**
  - Refines: 01_constraints, 10_architecture, 11_interfaces.
  - Produces: coherent IR updates for the “lab-site” domain.
  - Forbidden: implementing real code.

- **Codex Max — Implementation Planner & Feasibility Engineer**
  - Refines: 20_impl_plan, 21_test_plan, 30_code_status, 31_todo_backlog.
  - Produces: repo skeleton plan, file trees, scripts plan, CI plan.
  - Forbidden: rewriting architecture decisions or inventing schemas outside 11.

- **Claude Code — Module Implementer**
  - Implements code and content pipeline according to IR.
  - Adds components/pages/scripts/tests exactly as planned.
  - Forbidden: modifying IR authority files (00/01/10/11) beyond proposing diffs for human.

### 6.2 Default Pipeline (Sequential)
Human → Gemini (IR coherence) → Codex (impl/test/status/backlog) → Claude (code) → Human review

---

## 7. Repository Structure (Top-Level)

The repo must be readable and predictable:

- `spec/` : IR + constraints (source of truth)
- `site/` or root Next.js app : Next.js + Nextra codebase
- `content/` : people/papers/projects/notices/datasets entries
- `scripts/` : validators, index generators, link checkers
- `tests/` : smoke tests for build + schema validation

(Exact mapping is defined in `20_impl_plan.ir.yml`.)

---

## 8. Design Principles (Non-Negotiable)

### 8.1 Technical Principles
- **Spec-first**: schema and IDs live in IR, code follows.
- **Static-first**: default deployment requires no server runtime.
- **Deterministic builds**: sorting and derived pages must be reproducible.
- **Composable UI**: small reusable components rather than page-specific hacks.

### 8.2 Safety / Robustness Principles (Web version)
- Build must fail on schema breakage or invalid links (configurable strictness).
- No silent rendering of broken entries; show explicit fallback warnings in dev.

### 8.3 Collaboration Principles (Human ↔ LLM)
- No agent may cross domains; boundary violations are treated as failures.
- Any new identifier must be added to 11_interfaces first.

---

## 9. Phased Roadmap (Practical)

### Phase 1 — IR Lock + Starter Running
- Deliverables:
  - 00/01/10/11/20/21 coherent for lab-site
  - Next.js + Nextra starter builds locally and deploys to Pages
- Completion:
  - `npm run build` passes
  - schema validation passes on sample content

### Phase 2 — Canonical Content Types Online
- Deliverables:
  - People/Papers/Projects/Notices/Datasets fully rendered
  - Cross-links (tags, year, authors)
- Completion:
  - No manual list pages; all lists generated from content

### Phase 3 — Automation + Quality Gates
- Deliverables:
  - CI: schema validation, link check, build
  - basic search, sitemap, RSS (optional)
- Completion:
  - PR-based workflow stable and low-maintenance

---

## 10. Known Risks and Open Questions

### 10.1 Technical Risks
- Schema drift if we skip validation.
- GitHub Pages limitations (basePath, static export constraints) if not designed upfront.

### 10.2 Process Risks
- Spec not updated while code changes → long-term inconsistency.

### 10.3 Open Questions
- Content storage format preference: MDX-only vs MDX+JSON hybrid?
- How strict should link checking be (warn vs fail) on day-to-day edits?

---

## X. Multi-LLM Boundary & Non-Interference Charter (Hard Law)

- Human defines direction and approves IR changes.
- Gemini: IR coherence (01/10/11).
- Codex: plan/tests/status/backlog (20/21/30/31).
- Claude: code implementation and refactors (under IR).
- No agent may silently override another agent’s scope.