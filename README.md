# ⚔️ Campeonatus — Mockup

> Design system and layout reference for the **Campeonatus** platform.

Every screen, component and visual pattern in this repo is designed from scratch by us and serves as the single source of truth for what gets built in the official product.

---

## About

Campeonatus is a competitive tournament platform. This repository holds the **mockups and design system** — the visual blueprint that guides front-end implementation on the main project.

Nothing here is throwaway: layouts are detailed, components are functional, and the structure mirrors what production will look like.

## Components

The design system is organized in two layers:

**`eternatus/`** — custom components that carry the Campeonatus identity:

`hero` · `sidebar` · `site-header` · `data-table` · `standings-row` · `event-card` · `progress-card` · `section-heading` · `segmented` · `eyebrow` · `text-field` · `logo`

**`ui/`** — base primitives built on top of Radix UI:

`button` · `badge` · `card` · `input` · `label` · `table` · `toggle` · `toggle-group` · `progress`

## Design System no claude.ai

The components above are published as the **Eternatus Card House** Design System artifact, which screens built in Claude use. This repo is its source of truth: `npm run ds:build` generates the artifact's files and `npm run ds:check` renders every preview. See [`ds/WORKFLOW.md`](ds/WORKFLOW.md).

## Tech Stack

| Layer     | Tech                                          |
|-----------|-----------------------------------------------|
| Framework | [Next.js 16](https://nextjs.org)              |
| Language  | [TypeScript](https://www.typescriptlang.org)  |
| Styling   | [Tailwind CSS](https://tailwindcss.com)       |
| UI Base   | [Radix UI](https://www.radix-ui.com)          |
| Icons     | [Lucide](https://lucide.dev)                  |

## Getting Started

```bash
npm install
npm run dev
```

Open [localhost:3000](http://localhost:3000) to browse the layouts.

---

<p align="center"><sub>Built with purpose. Designed by us.</sub></p>
