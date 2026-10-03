# Daniel Shdeed — Engineering & Research

Portfolio for a Full Stack Engineer exploring AI systems, model internals, and independent research.

Repository: https://github.com/Danieldotcomcoder/portfolio-danielshdeed

## Develop locally

Requires Node.js 22 or newer. No npm dependencies or installation step.

```sh
npm run dev
```

Open http://127.0.0.1:4173. If an older preview occupies that port, stop it first or set the PORT environment variable to another port.

Edit `src/index.html`, `src/styles.css`, and `src/app.js`. Run `npm run build` after edits and refresh the preview; the server does not watch for changes.

```sh
npm run check
npm run build
```

The build validates JavaScript syntax, local asset paths, section anchors, and case-study references, then creates `dist/`. Generated output is ignored by Git.

## GitHub Pages

1. Push this repository's main branch.
2. In Settings → Pages, select **GitHub Actions** as the publishing source.
3. In Actions, select **Deploy portfolio to GitHub Pages**, then **Run workflow** on main.
4. Open the URL reported by the successful deployment.

Deployment is manual; pushing alone does not run the workflow. Only `dist/` is uploaded. Relative assets support the repository URL path. No custom domain is assigned to this new repository; the previous portfolio's domain configuration is not changed.

Workflow reference: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages

## Local workspace notes

The older `site/`, `github-portfolio/`, and `github-pages/` folders are retained locally and ignored. They are not submodules and should not be committed. Work from this repository root going forward.

## Content

Project descriptions are based on the supplied READMEs and documentation. Completed work, pending validation, and future research proposals are distinguished. No employer or employment history is included. Project-reported measurements have not been independently reproduced for this portfolio.

Google Fonts is the only external asset dependency, with system-font fallbacks. Contact links point to user-supplied GitHub, LinkedIn, and email destinations. No analytics, API keys, or backend are needed.
