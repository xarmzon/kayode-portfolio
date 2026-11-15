# Kayode Portfolio

The Switchboard: Kayode's portfolio as a journey through one living world. Built with TanStack Start, prerendered to static HTML and served from Cloudflare Workers.

- Written spec: [docs/BUILD_PROMPT.md](docs/BUILD_PROMPT.md)
- Visual source of truth: the "Kayode Portfolio" design canvas. A snapshot of its artboards lives in [design/](design/) for reference; it is not part of the build.

## Setup

Requires Node 24+.

```sh
npm install
npm run dev        # http://localhost:3000
```

## Scripts

| Script                            | What it does                                                      |
| --------------------------------- | ----------------------------------------------------------------- |
| `npm run dev`                     | Vite dev server with the Workers runtime                          |
| `npm run build`                   | Production build; prerenders every route                          |
| `npm run preview`                 | Build, then serve the output locally                              |
| `npm run check`                   | Types, lint, format check, tests, build — run before every commit |
| `npm run test`                    | Vitest                                                            |
| `npm run lint` / `npm run format` | ESLint / Prettier                                                 |
| `npm run deploy`                  | Build and `wrangler deploy`                                       |

## Where things live

| Path                    | Holds                                                                          |
| ----------------------- | ------------------------------------------------------------------------------ |
| `src/content/`          | All copy. No text lives in components.                                         |
| `src/content/schema.ts` | Zod schemas for every content file; `content.test.ts` validates the data.      |
| `src/content/slugs.ts`  | The chapter slugs, in journey order.                                           |
| `src/styles.css`        | Design tokens (colour, type, shape, elevation) and the shadcn mapping.         |
| `src/routes/`           | File-based routes (TanStack Router).                                           |
| `src/components/ui/`    | shadcn/ui components on Base UI. Add more with `npx shadcn@latest add <name>`. |

Content modules import only Zod _types_, so Zod never ships to the browser.

## Add a chapter

1. Add the slug to `chapterSlugs` in `src/content/slugs.ts`, in journey order.
2. Add its entry to `src/content/chapters.ts` (number, title, world, action, summary).
3. Add its copy to `src/content/story.ts` and render it in `ChapterBody` in `src/components/chapter-page.tsx`.
4. Run `npm run check`. Prerendering picks up the new `/trail/<slug>` route from the slug list.

## Deploy

1. `npx wrangler login` once.
2. `npm run deploy`. The first deploy gives a `*.workers.dev` preview URL.
3. Attach the custom domain in the Cloudflare dashboard (Workers → kayode-portfolio → Settings → Domains & Routes).

## Status

Phase 1 of 5 (foundation) is done. See the build order in the spec.
