# Portfolio

React + Vite + TypeScript + Tailwind v4 + shadcn rebuild of a static portfolio site. Also a learning project — code choices should stay simple enough to explain, and favor patterns familiar from a FastAPI/Python dependency-injection background over React idioms taken on faith.

`old/` is the legacy static HTML/CSS/JS site — read-only reference for content and design language. Never edit it.

## Commands

- `npm run dev` — start dev server
- `npm run build` — `tsc -b && vite build`
- `npm run lint` — eslint
- `npm run test` — vitest
- Visual verification: `playwright` is a dev dependency. To check a layout change actually renders correctly (not just type-checks), start the dev server in the background, use Playwright (`chromium.launch()`) to screenshot at a couple of viewport sizes, and check `document.documentElement.scrollHeight` vs `clientHeight` for unwanted page scroll. Run any throwaway script from inside the repo root (not `/tmp`) so `node_modules` resolves.

## Architecture

- `src/components/ui/` — shadcn-generated primitives only. Don't hand-add business logic here.
- `src/components/layout/` — structural chrome shared across the whole page (`NavBar`).
- `src/components/common/` — feature-agnostic, non-shadcn presentational components shared by two or more features (e.g. `AsyncBoundary`, `Carousel`, `ContentCard`, `SectionHeader`). Not a place for domain logic — if a component needs to know about `GithubRepo` vs `BlogSummary`, it belongs in a feature folder that composes one of these instead.
- `src/features/<domain>/` — one folder per vertical slice (component + its hook + domain helpers). A feature folder may only import from `data/`, `hooks/`, `lib/`, `components/ui`, `components/common` — never directly from another feature folder. This is the composability boundary.
- `src/data/clients/` — the DI/repository layer: an interface plus one fetch-based implementation per external data source (e.g. `createGithubClient(fetchImpl = fetch)`). Hooks in `features/` consume these with the real client as a default parameter, so tests can inject a stub instead of hitting the network.
- `src/data/resume.ts` — resume content as a typed `as const` literal (converted from `old/data/resume.yaml`). No YAML/runtime parser — content is authored directly in TS for type inference. Imported directly where needed; no wrapper hook, since it's static data with no loading/error state.
- `src/hooks/` — reusable, domain-agnostic hooks only (URL state sync, scroll tracking, `useAsync` for the loading/success/error pattern). No feature-specific knowledge here.

## Key decisions already made

- Single-page app: no router. Homepage is a **bento grid that fits one viewport with no page scroll** (`h-dvh overflow-hidden` on the app root; `main` and every row/panel down the tree use `flex-1 min-h-0 min-w-0` so CSS flex/grid items actually shrink instead of overflowing — see the "min-h/w-0 chain" note below). Layout: top row (Hero + stacked Experience highlight/Resume download), bottom row (Projects/Blogs panels). Uses the full page width (`max-w-[1600px]`, not a narrow centered column). `NavBar` is a fixed floating pill; static styling now (no scroll-based transition — the page doesn't scroll, so `useScrollProgress` was removed as dead code).
- Projects/Blogs are horizontally-scrolling **carousels** (`components/common/Carousel.tsx`: manual drag/swipe + hover-revealed arrow buttons, `scroll-snap-x`), not a static grid — needed since panels are height-constrained and can't wrap to new rows. `components/common/AsyncBoundary.tsx` replaced the old `AsyncGrid`: it only handles the loading/success/error branching and hands the resolved (optionally `limit`-ed) array to a render-prop child, so callers decide grid vs. carousel layout themselves.
- **The min-h/w-0 chain**: flex and grid items default to `min-width`/`min-height: auto`, meaning a child refuses to shrink below its content's intrinsic size — even inside a `flex-1` parent — unless every level explicitly sets `min-h-0`/`min-w-0`. Miss one level and content silently overflows its box and bleeds into siblings instead of respecting the layout. Every bento panel root also has `overflow-hidden` as a second line of defense. Keep this pattern when adding new panels.
- Colors: the 5 bento blocks each get a solid, bold background from the "Solar Flare" palette (`--solar-hero`/`-experience`/`-resume`/`-projects`/`-blogs` tokens in `index.css`) — a Material 3 Expressive-inspired choice (bold/saturated, not pastel; color used to draw attention, e.g. the Resume CTA gets the loudest color). The older `--brand-indigo/-violet/-cyan` gradient tokens (from the original old-site theming pass) are still used by `ContentCard`/`glass-card` for individual project/blog cards nested inside the bold panels, and by the (currently unused on the homepage) full `ResumeSection` timeline.
- The full `ResumeSection.tsx` (Summary/Experience-timeline/Skills) is built but not currently rendered anywhere — where it lives (a "View All"/full-resume destination) is still to be decided alongside the Reader overlay design.
- The project "Reader" (README/blog viewer) will open as an overlay (shadcn Dialog/Sheet), with open state synced to the URL via a hand-built `useUrlState` hook (History API/`URLSearchParams`) — not react-router. Not built yet; this is also when "View All Projects/Blogs" becomes a real action.
- Projects/blogs stay live-fetched from GitHub API / external `blogs.json`, wrapped in the DI client pattern above rather than becoming static content.
- No resume PDF exists yet — the Resume Download button is present but inert until a PDF asset is added.

Full step-by-step migration plan: `~/.claude/plans/this-is-modern-porfolio-cryptic-cook.md` (local machine only, not part of this repo).
