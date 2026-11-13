# Valencia John — Portfolio

Astro + plain CSS, built from the Figma file (frames ending in "— 8pt"). Static output, ready for Vercel.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to dist/
npm run preview  # serve the production build locally
```

## Structure

```
public/
  illustrations/        Figma component-set variants (PNG @2x + SVG words)
  icons/                Mail, LinkedIn, phone, arrow icons from Figma
  resume.pdf            ← add your resume here (linked from /about)
src/
  content/work/         One Markdown file per project  ← you edit these
  assets/work/<slug>/   Images for each project        ← drop images here
  content.config.ts     Frontmatter schema for projects
  data/site.ts          Email, phone, LinkedIn, resume link
  styles/global.css     Design tokens (colours, 8px spacing, radii, fonts)
  components/           Nav, Footer, Flipbook, CyclingWord, InfoStrip, ProjectGrid, ProjectCard
  pages/                / · /about · /work · /work/[slug]
```

### Design tokens

All colours, spacing and radii are CSS variables in `src/styles/global.css`:
`--color-bg`, `--color-blue`, `--color-pink`, `--color-yellow`, `--color-green`, the 8px scale
`--space-1` (8px) … `--space-12` (96px), and `--gutter` (side margin 80 → 40 → 20 at the
1024px / 600px breakpoints).

### Prototype animations

- **DUCK AND BUNNY** (hero) and **BUNNY** (footers) flip between their 2 variants.
- **UI** word (home headline) cycles through 6 variants; **feel human** (About) through 4.
- Delay is **800ms** — read from the Figma "After delay" trigger on every variant. Swaps are instant.
- `prefers-reduced-motion: reduce` shows the first variant only.
- Logic lives in `src/scripts/cycle.ts`. To change the speed, edit the `interval` prop
  (`<Flipbook interval={800}>` / `<CyclingWord interval={800}>`).

---

## How to add a new project

1. **Pick a slug** — it becomes the URL. `my-new-project.md` → `/work/my-new-project`.
2. **Create the image folder:** `src/assets/work/my-new-project/` and drop your images in
   (e.g. `cover.png`, `research-1.png`).
3. **Create the Markdown file** `src/content/work/my-new-project.md` using the template below.
4. Run `npm run dev` and check it. That's it: the homepage grid, `/work` page and case-study
   page all update automatically.

### Copy-paste template

```markdown
---
title: "My New Project"
year: "2026"
summary: "One sentence about the project — used for link previews and search results."
role: "Product Designer — research, UI, prototyping"
timeline: "6 weeks · Jan – Feb 2026"
tools: ["Figma", "FigJam", "Illustrator"]
cardColor: "blue"            # blue | yellow | green | pink, or any CSS colour like "#c9b6ff"
cover: ../../assets/work/my-new-project/cover.png   # optional — delete the line for a solid colour block
coverAlt: "Describe what the cover image shows"
order: 5                     # position in the grid (lower = earlier)
featured: true               # true = shows on the homepage; every project shows on /work
---

## Overview

Short intro: what it is, who it's for, what you did.

## Problem Statement

What problem were you solving, and why did it matter?

## Research

What you learned.

![Affinity map from user interviews](../../assets/work/my-new-project/research-1.png)

## Ideation & Exploration

Sketches, concepts, iterations.

## Design Outcome

The final design and the impact.
```

### Notes

- **Contents sidebar** is built automatically from every `## Heading` in the file — rename,
  add or remove sections freely. Use `###` for sub-headings that shouldn't appear in the sidebar.
- **Images** referenced with relative paths (`../../assets/work/<slug>/…`) are optimised at build time.
  The path is relative to the `.md` file.
- **Grid pattern:** projects fill rows in pairs, alternating *wide + narrow* (400px tall) and
  *two equal* (320px tall) — like the Figma design. An odd last project spans the full row.
  On tablet and mobile, cards stack one per row.
- **Hide a project from the homepage** with `featured: false` (it still appears on `/work`).
- **Reorder** by changing `order` numbers.
- If a field is missing or has the wrong type, `npm run dev` / `npm run build` will show an error
  naming the file and field.

---

## Deploy to Vercel

The site builds to static HTML, so no adapter is needed.

**Option A — GitHub (recommended, auto-deploys on every push)**

1. Push this folder to a new GitHub repository.
2. Go to <https://vercel.com/new>, import the repo.
3. Vercel detects **Astro** automatically (Build command `astro build`, Output `dist`). Click **Deploy**.
4. Optional: add your domain under *Project → Settings → Domains*, then update `site` in
   `astro.config.mjs` to that URL.

**Option B — Vercel CLI**

```bash
npm i -g vercel
vercel          # first time: link/create the project, deploys a preview
vercel --prod   # deploy to production
```

Astro 7 needs **Node 22.23.4 or newer**. In Vercel set *Project → Settings → General → Node.js Version* to **24.x** if the build complains about the Node version.
