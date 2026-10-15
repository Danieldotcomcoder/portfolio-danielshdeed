# Local portfolio redesign

Branch: `codex/portfolio-research-redesign`. Local preview only; nothing pushed or deployed.

## Direction

A personal engineering and research journal: warm paper, dark green ink, cobalt accents, serif display details, restrained notation, and a CSS-drawn inquiry illustration. The project collection uses numbered rows rather than a fixed card grid, with category filters and text search. Research proposals remain distinct from delivered projects and retain their experiment and progress criteria.

## Growing the collection

Add a project article in `src/index.html` with a `data-category` of `systems`, `research`, or `tooling`, and a case-study button. Add its corresponding entry to `cases` in `src/app.js`. Search indexes the project body; the total and visible count update automatically. Add research questions as `details.idea` entries in the research notebook. Preserve documented project status and limits when updating content.

No new dependencies. Without JavaScript, every project remains readable and the filter controls stay hidden. Existing project descriptions, case studies, repository links, and contact destinations are retained.

## Verification

- Build and source checks passed (JavaScript syntax, assets, anchors, case-study references).
- Browser checks confirmed research filtering, Rust text search, zero-result messaging, and modal opening/closing including Escape.
- Narrow-screen DOM measurements showed no overflowing page elements at a reported 387 px viewport. A second reported 419 px viewport also had no overflowing main content.
- Desktop opening visually inspected; a wrapped headline was shortened after inspection.
- Browser screenshots became unavailable after viewport testing, so final desktop/mobile visual QA is limited; the running local browser preview remains the review surface.

The pre-existing README modification is unrelated and was preserved without editing or including it in the redesign commit.
