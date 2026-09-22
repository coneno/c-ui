# c-ui registry

Repository for the coneno shadcn registry and its documentation site.

- Public docs: `https://coneno.github.io/c-ui/docs/`
- Base UI registry index: `https://coneno.github.io/c-ui/r/base-nova/registry.json`
- Radix registry index: `https://coneno.github.io/c-ui/r/radix-nova/registry.json`

This README is intentionally contributor-focused. End-user installation and component usage live in the docs site.

## What this repo contains

- `registry/base-nova/*`: Base UI component sources.
- `registry/radix-nova/*`: Radix and shared library-independent sources.
- `registry.json` / `registry.base.json`: Radix / Base manifests.
- `public/r/{base-nova,radix-nova}/*`: generated registry JSON artifacts (committed).
- `content/docs/*`: Fumadocs content for the documentation pages.
- `app/docs/*`: Fumadocs app routes/layout.
- `.github/workflows/deploy-registry-pages.yml`: GitHub Pages build/deploy workflow.

## Prerequisites

- Node.js 22 (matches CI)
- pnpm 10.28.2

## Common commands

```bash
pnpm install         # install dependencies
pnpm dev             # run local site at http://localhost:3000/c-ui
pnpm registry:build  # generate both registry styles into public/r/
pnpm build           # GitHub Pages build (basePath=/c-ui) + static export into out/
pnpm start           # serve ./out with a static file server
```

## Contributor workflow

1. Install dependencies with `pnpm install`.
2. Make your code/docs changes.
3. Regenerate registry artifacts with `pnpm registry:build` if registry items changed.
4. Validate with `pnpm build`.
5. Commit source changes and generated `public/r/{base-nova,radix-nova}/*` output together.

## Add a new registry item

1. Add the component source file(s) under the matching `registry/base-nova/` or `registry/radix-nova/` directory.
2. Add an item in the matching manifest (`registry.json` or `registry.base.json`):
   - required baseline: `name`, `type`, `title`, `description`, `files`, `style`
   - optional: `registryDependencies`, `dependencies`
3. Ensure each `files[]` entry has:
   - `path`: source file in this repo
   - `target`: destination path in consumer projects
   - `type`: usually `registry:component`
4. Run:

   ```bash
   pnpm registry:build
   ```

5. Confirm generated files:
   - `public/r/<style>/<name>.json`
   - `public/r/<style>/registry.json` includes the item
6. Add docs page for the new item:
   - create `content/docs/components/<name>.mdx`
   - add the page slug to `content/docs/components/meta.json`
7. Run `pnpm build` and verify the docs route and static export succeed.

## Update existing items

When component APIs or behavior change:

1. Update source files in the matching style directory.
2. Update metadata in the matching manifest if title/description/dependencies changed.
3. Update the corresponding docs page in `content/docs/components/`.
4. Regenerate registry JSON with `pnpm registry:build`.

## Docs authoring notes

- Docs are built with Fumadocs and rendered from `content/docs`.
- Sidebar order is controlled by `meta.json` files.
- Interactive demos used in docs live in `components/docs/interactive-examples.tsx`.

## Deployment

Deploy runs automatically on pushes to `main` via GitHub Actions:

1. `pnpm install --frozen-lockfile`
2. `pnpm registry:build`
3. `pnpm build`
4. publish `out/` to GitHub Pages

## Important conventions

- Do not edit `public/r/{base-nova,radix-nova}/*` manually.
- Always rebuild artifacts after changing `registry.json` or files in the matching style directory.
- Keep docs in sync with component APIs to avoid stale installation/configuration guidance.

## Base UI and Radix variants

The docs app uses `base-nova`. `registry.json` remains the Radix manifest;
`registry.base.json` defines the Base UI variants. Edit library-specific sources
in `registry/base-nova/` or `registry/radix-nova/`. Library-independent background
and file picker sources are shared by both manifests. Consumer install targets
remain unchanged.

`pnpm registry:build` builds both manifests into `public/r/base-nova/` and
`public/r/radix-nova/`. These directories are generated; never edit them manually.
Update both manifests when adding a shared item. CI builds and publishes both
styles using the existing GitHub Pages workflow.

Consumers select `base-nova` or `radix-nova` in `components.json` with the namespace
URL `https://coneno.github.io/c-ui/r/{style}/{name}.json`. A style change alone
does not migrate consumer source. See `content/docs/base-ui-migration.mdx`.

Provider logic is shared from `registry/radix-nova/` by both manifests. Providers
import `@/components/c-ui/provider-alert-dialog`: Base bundles its wrapper at that
private target, while Radix bundles a re-export adapter to its shadcn dependency.
Do not install the Base provider wrapper into `components/ui/alert-dialog.tsx`.
The docs-only adapter in `components/c-ui/` resolves the private import to Base UI.
