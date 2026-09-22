# Agent Instructions for c-ui

This repository is the source of truth for the coneno shadcn registry and its
documentation site. If this workspace also includes consumer apps such as
`case-cohort-studies`, treat this repo as the primary place to change shared
registry-backed UI, hooks, and registry docs.

## Next.js: read the local docs before coding

This repo runs Next.js 16 with React 19. Before changing framework behavior,
read the relevant guide in `node_modules/next/dist/docs/`. If dependencies are
not installed yet, install them first so those docs exist locally.

## Workspace Role

- Use `c-ui` for reusable shadcn registry components, hooks, and documentation
  pages that are meant to be installed into other projects.
- Treat installed copies inside consumer repos as downstream outputs, not as
  the primary source, unless the user explicitly wants an app-local fork.
- Treat `public/r/{base-nova,radix-nova}/*` as generated artifacts. Do not edit those files
  manually.

## Source Of Truth By Path

- `registry/base-nova/*`: Base UI source files.
- `registry/radix-nova/*`: Radix and library-independent shared source files.
- `registry.json` and `registry.base.json`: Radix and Base manifests consumed by `shadcn build`.
- `public/r/{base-nova,radix-nova}/*`: generated registry JSON artifacts that are committed
  and published.
- `content/docs/*`: MDX documentation content.
- `content/docs/components/meta.json`: sidebar ordering for component docs.
- `app/docs/*`: Fumadocs routes and layouts.
- `components/docs/*`: interactive docs-only examples and overview UI.
- `lib/source.ts` and `source.config.ts`: Fumadocs source wiring.
- `next.config.mjs`: static export and base-path behavior.
- `.github/workflows/deploy-registry-pages.yml`: GitHub Pages build and deploy
  flow.

## Build And Routing Model

- This repo builds a static Next.js export for GitHub Pages.
- The docs application itself is rooted at `/docs`.
- GitHub Pages deployment adds the `/c-ui` base path through
  `NEXT_PUBLIC_BASE_PATH=/c-ui`, so the published docs live at
  `/c-ui/docs/`.
- Registry artifacts are generated with
  `pnpm registry:build` (both styles).
- If route behavior looks wrong locally, check `next.config.mjs`,
  `lib/source.ts`, and any `NEXT_PUBLIC_BASE_PATH` value in the current
  environment.

## Common Commands

Run commands from the `c-ui` repository root.

```bash
pnpm install
pnpm dev
pnpm registry:build
pnpm build
pnpm format
pnpm format:check
pnpm start
```

Use these expectations:

- `pnpm dev`: local docs development server.
- `pnpm registry:build`: regenerate installable registry JSON.
- `pnpm build`: validate the static site export used in deployment.
- `pnpm start`: serve the generated `out/` directory.
- `pnpm test` is currently a placeholder and should not be treated as real
  validation.

## Registry Workflow

When adding or updating a registry-backed component:

1. Edit source files under the appropriate style directory.
2. Update the matching item in `registry.json` or `registry.base.json` if the title, description,
   files, dependencies, or registry dependencies changed.
3. Update the docs page under `content/docs/components/`.
4. Update `content/docs/components/meta.json` when adding a new docs page.
5. Run `pnpm registry:build`.
6. Run `pnpm build`.
7. Commit the source changes and generated `public/r/{base-nova,radix-nova}/*` output
   together.

Important registry rules:

- Keep `files[].path` pointing to source files in this repo.
- Keep `files[].target` aligned with the destination path consumers should get.
- Use `registryDependencies` for other shadcn registry items.
- Use `dependencies` for package-manager dependencies consumers must install.
- Do not hand-edit generated JSON in `public/r/`.

## Docs Workflow

- Docs content is authored in MDX under `content/docs`.
- Interactive examples belong in `components/docs/interactive-examples.tsx`
  unless there is a strong reason to split them further.
- Keep docs examples, installation instructions, and component APIs in sync.
- When a reusable component API changes, update the docs in the same change.

## Design And API Guidance

- Prefer reusable, consumer-agnostic APIs over app-specific behavior.
- Keep install targets stable unless there is a clear migration reason.
- Avoid introducing dependencies unless the component genuinely needs them.
- If a change is meant only for one consumer app, question whether it belongs
  in this registry at all.

## Validation Expectations

- After editing either registry source directory or manifest, always run
  `pnpm registry:build`.
- After changing docs, routes, or registry items, run `pnpm build`.
- Use `pnpm format:check` when you touch formatting-sensitive files or before
  wrapping up a broader change.

## Relevant Source Files

- `README.md` explains the contributor workflow and publishing model.
- `registry.json` and `registry.base.json` are authoritative for their styles.
- `next.config.mjs` and `.github/workflows/deploy-registry-pages.yml` explain
  why deployed URLs differ from unprefixed docs routes.
- `components.json` defines the local shadcn project configuration for this
  repo itself.
## Dual-library development

The documentation app uses Base UI (`base-nova`). Keep legacy Radix sources and
endpoints available. `registry.base.json` reuses library-independent source files
from `registry/radix-nova/`; do not duplicate those just to change their path.
Update both manifests when changing shared files or dependencies. Base alert and
confirmation items include their alert-dialog wrapper and depend on `@c-ui/button`
to preserve the custom button when installed together.

Provider logic is shared from `registry/radix-nova/` by both manifests. Providers
import `@/components/c-ui/provider-alert-dialog`: Base bundles its wrapper at that
private target, while Radix bundles a re-export adapter to its shadcn dependency.
Do not install the Base provider wrapper into `components/ui/alert-dialog.tsx`.
The docs-only adapter in `components/c-ui/` resolves the private import to Base UI.
