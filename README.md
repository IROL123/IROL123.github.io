# Lab Site

A research lab website built with [Next.js](https://nextjs.org) and [Nextra](https://nextra.site), designed for managing and displaying People, Papers, Projects, Notices, and Datasets.

## Features

- **Content-Driven**: All content lives in `content/` as MDX files with YAML frontmatter
- **Schema Validation**: Zod-based validation ensures content integrity
- **Static Export**: Fully static site deployable to GitHub Pages
- **Automatic Lists**: Entity pages are auto-generated from content files
- **Tag Filtering**: Papers and projects support tag-based organization
- **Search**: Built-in Pagefind for client-side search

## Quick Start

### Prerequisites

- Node.js 20+ (LTS)
- pnpm (via Corepack)

### Installation

```bash
# Enable Corepack for pnpm
corepack enable

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Build & Deploy

```bash
# Build static site
pnpm build

# Output is in out/ directory
```

## Content Management

### Directory Structure

```
content/
├── people/          # Lab members (Person schema)
├── papers/          # Publications (Paper schema)
├── projects/        # Research projects (Project schema)
├── notices/         # Announcements (Notice schema)
├── datasets/        # Datasets (Dataset schema)
└── posts/           # Blog posts (existing Nextra blog)
```

### Adding Content

Each content type has its own schema. Create a new `.mdx` file in the appropriate directory.

#### How to Add a Person

Create `content/people/firstname-lastname.mdx`:

```yaml
---
name: "First Last"
role: "PhD Student"  # Options: Principal Investigator, PhD Student, Masters Student, Undergrad, Alumni, Staff
email: "email@example.edu"
affiliation: "Department of Computer Science"
avatar: "/images/people/firstname-lastname.jpg"  # Optional
website: "https://example.com"  # Optional
github: "https://github.com/username"  # Optional
linkedin: "https://linkedin.com/in/username"  # Optional
scholar: "https://scholar.google.com/citations?user=..."  # Optional
interests:
  - "Robotics"
  - "Machine Learning"
active: true
---

Optional biography content goes here. This will appear in the person's profile.
```

#### How to Add a Paper

Create `content/papers/paper-slug.mdx`:

```yaml
---
title: "Paper Title"
authors:
  - "Author One"
  - "Author Two"
venue: "Conference/Journal Name"
year: 2024
date: "2024-06-15"  # YYYY-MM-DD format
pdf_url: "https://example.com/paper.pdf"  # Optional
code_url: "https://github.com/example/repo"  # Optional
project_url: "https://project-page.com"  # Optional
bibtex: |  # Optional
  @article{...}
tags:
  - "robotics"
  - "deep-learning"
doi: "10.1000/example"  # Optional
thumbnail: "/images/papers/paper-thumbnail.jpg"  # Optional
---

Optional abstract content goes here.
```

#### How to Add a Project

Create `content/projects/project-slug.mdx`:

```yaml
---
title: "Project Title"
slug: "project-slug"  # URL-friendly identifier
summary: "One-liner description of the project."
status: "Active"  # Options: Active, Completed, Archived
date_start: "2023-01-01"  # Optional
date_end: "2024-12-31"  # Optional
members:
  - "Team Member 1"
  - "Team Member 2"
tags:
  - "robotics"
  - "manipulation"
cover_image: "/images/projects/cover.jpg"  # Optional
repo_url: "https://github.com/example/project"  # Optional
demo_url: "https://demo.example.com"  # Optional
---

Full project description goes here. This is the main content of the project page.

## Research Goals

You can use markdown formatting in the content.

## Results

And include any additional sections.
```

#### How to Add a Notice

Create `content/notices/notice-slug.mdx`:

```yaml
---
title: "Notice Title"
date: "2024-12-01"  # YYYY-MM-DD format
category: "News"  # Options: News, Seminar, Recruiting, Event
pinned: true  # Optional, shows at top of list
expiry_date: "2025-01-01"  # Optional, hides after this date
---

Notice content goes here. This can include markdown formatting.

- Bullet points
- Links to resources
- etc.
```

#### How to Add a Dataset

Create `content/datasets/dataset-slug.mdx`:

```yaml
---
name: "Dataset Name"
version: "1.0"
license: "MIT"  # or CC-BY-4.0, Apache-2.0, etc.
download_links:
  - "https://example.com/dataset.zip"
  - "https://mirror.example.com/dataset.zip"  # Optional additional links
tags:
  - "robotics"
  - "computer-vision"
citation: |  # Optional
  @dataset{example_2024,
    title={Dataset Name},
    author={Author},
    year={2024}
  }
thumbnail: "/images/datasets/thumbnail.jpg"  # Optional
---

Dataset description goes here. Explain what the dataset contains, how to use it, and any relevant details.

## Contents

- Description of dataset contents
- Format specifications
- Usage instructions
```

## Validation

Content is validated against schemas before build:

```bash
# Validate all content
pnpm validate:content
```

If validation fails, the build will fail with descriptive error messages showing the file and field with issues.

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm validate:content` | Validate content against schemas |
| `pnpm typecheck` | Run TypeScript type checking |
| `pnpm test:smoke` | Run smoke tests |

## Deployment

The site is configured for GitHub Pages deployment:

1. Push to `main` branch
2. GitHub Actions builds and deploys automatically
3. Site is available at your GitHub Pages URL

### Configuration

For project pages (e.g., `username.github.io/repo-name`), set the base path:

```bash
# In your environment or .env file
NEXT_PUBLIC_BASE_PATH=/repo-name
```

## Project Structure

```
├── .github/workflows/    # CI/CD configuration
├── content/              # MDX content files
├── public/               # Static assets
├── scripts/              # Build and validation scripts
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # React components
│   └── lib/
│       ├── content/      # Content loading utilities
│       ├── indexes/      # Content indexing functions
│       └── schemas/      # Zod validation schemas
├── spec/                 # System specifications (IR)
└── tests/                # Smoke tests
```

## License

MIT License
