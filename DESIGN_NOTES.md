# Portfolio redesign: screenshot gallery

Local branch: `codex/portfolio-research-redesign`. No push or deployment.

## Delivered

Replaced the previous design and stylesheet with a dark gallery: oversized typography, lime accents, layered real interface previews in the opening, a full-width featured project, and a two-column project collection. The pale green research notebook provides a distinct second act, followed by a shorter personal introduction and large contact link.

All five projects have local image assets, descriptive alt text, source captions, and click-to-enlarge dialogs. Category filters, search, result counts, native case-study dialogs, keyboard dismissal/focus restoration, responsive layouts, and reduced-motion support remain. Hero project links reset filters before navigating. Navigation and collection counts derive from the current HTML.

## Image provenance

- FastPitStop: fresh screenshot of a replay on `https://fastpitstop.online/sessions/2026/17`. Interface capture only; not independent verification of its analytics.
- Shadow Twins: existing `llmbenchmarks/docs/screenshots/03-inspect-partial-route.png`. The screenshot shows a mock-provider run, as captioned.
- OpsPilot: fresh screenshot of the existing built frontend, served locally. It shows seeded development sign-in; no running backend or populated investigation is implied.
- biopsy: executed the existing release binary against `models/sick.safetensors`, captured its actual output in a readable terminal presentation, then took a browser screenshot. The expected exit status is 2 for the deliberately unhealthy fixture. No new results were invented.
- Domain-Shift Forgetting: copied `paper/figures/trajectories.png`, an actual Study 1 figure. This is labeled as a paper figure rather than an application screenshot.

The current Domain-Shift Forgetting README now reports screening study outcomes. Its portfolio summary and case study were updated accordingly, retaining the limits on scale, seeds, development-only evaluation, and interpretation. Results remain project-reported.

## Verification

- `npm run build` passes source syntax, asset packaging, anchor, and case-study reference checks.
- Browser verified all seven page images loaded (two opening previews plus five project images).
- Research filter returns Shadow Twins and Domain-Shift Forgetting; Rust search returns biopsy; unmatched search shows the empty state.
- Screenshot enlargement, source captions, Escape dismissal, and the updated research case-study dialog were exercised.
- At the reported 419 px narrow viewport, no main/header element extended outside the viewport; five project visuals were present. Desktop DOM measurements also showed no horizontal overflow.
- Project captures succeeded, but screenshot capture of the portfolio page itself continues to fail in the in-app browser. Final visual QA is therefore limited to DOM/layout measurements and the live local preview.

## Adding projects

Add an article to `src/index.html` using the existing `project` structure, a unique `id="project-…"`, a `data-category` (`systems`, `research`, or `tooling`), an image button with `data-image` and `data-caption`, and case-study buttons whose `data-case` matches a key in `src/app.js`. Add its image under `src/assets/` and list its relative path in `scripts/check.mjs`; build and preview use that explicit allowlist. Keep image source/context captions accurate. New research ideas use native `details.idea` elements.

No dependencies added. The user's pre-existing README modification is preserved and excluded from the redesign commit. Temporary capture tooling and review files are ignored under `.preview/`.

## Preview repair and Artificial Life addition

The old process at port 4175 retained its original image allowlist even after newer HTML/CSS was built. Restarted it with the updated server and reloaded the user's tab. The build now writes a generated asset manifest; the preview reads it per request, so newly packaged images are available without a restart. Verified all page assets return 200 with correct image signatures/MIME types, a newly added probe image works in the already-running server, and unlisted files remain inaccessible. The probe was removed and manifest restored afterward.

Added Artificial Life as project 06, categorized under research and explicitly labeled In progress / Not yet on GitHub, with no repository URL. The single ecosystem image is copied from `artificial-life/docs/screenshots/wetland-closeup.png`. The brief description and project notes follow the current README and `docs/ECOSYSTEM.md`; distinguish the artificial model and separate Ecosystem prototype from biological or general learning claims. Build checks passed. In the live preview, verified six projects, a decoded ecosystem image, no GitHub link on this card, and working project notes. The repaired preview at http://127.0.0.1:4175 remains open locally.
