# c-ui registry

Repository for the coneno shadcn registry and its documentation site.

- Public docs: `https://coneno.github.io/c-ui/docs/`
- Registry index: `https://coneno.github.io/c-ui/r/radix-nova/registry.json`

This README is intentionally contributor-focused. End-user installation and component usage live in the docs site.

## What this repo contains

- `registry/radix-nova/*`: source component files used to generate registry JSON.
- `registry.json`: registry manifest consumed by `shadcn build`.
- `public/r/radix-nova/*`: generated registry JSON artifacts (committed).
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
pnpm registry:build  # generate registry JSON into public/r/radix-nova
pnpm build           # GitHub Pages build (basePath=/c-ui) + static export into out/
pnpm start           # serve ./out with a static file server
```

## Contributor workflow

1. Install dependencies with `pnpm install`.
2. Make your code/docs changes.
3. Regenerate registry artifacts with `pnpm registry:build` if registry items changed.
4. Validate with `pnpm build`.
5. Commit source changes and generated `public/r/radix-nova/*` output together.

## Add a new registry item

1. Add the component source file(s) under `registry/radix-nova/`.
2. Add an item in `registry.json`:
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
   - `public/r/radix-nova/<name>.json`
   - `public/r/radix-nova/registry.json` includes the item
6. Add docs page for the new item:
   - create `content/docs/components/<name>.mdx`
   - add the page slug to `content/docs/components/meta.json`
7. Run `pnpm build` and verify the docs route and static export succeed.

## Update existing items

When component APIs or behavior change:

1. Update source files in `registry/radix-nova/`.
2. Update metadata in `registry.json` if title/description/dependencies changed.
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

- Do not edit `public/r/radix-nova/*` manually.
- Always rebuild artifacts after changing `registry.json` or files in `registry/radix-nova/`.
- Keep docs in sync with component APIs to avoid stale installation/configuration guidance.
