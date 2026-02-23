# c-ui registry

Custom [shadcn/ui](https://ui.shadcn.com) registry for common Coneno components.

This repo builds registry JSON files into `public/r` and deploys them via the static export in `out/` (GitHub Pages).

## Hosted registry URLs

- Registry index: `https://coneno.github.io/c-ui/r/registry.json`
- Component entries: `https://coneno.github.io/c-ui/r/<component-name>.json`

## Install a component (consumer side)

From any app that already uses shadcn:

```bash
npx shadcn@latest add https://coneno.github.io/c-ui/r/loading-button.json
```

Example for local testing while this repo is running:

```bash
npx shadcn@latest add http://localhost:3000/c-ui/r/loading-button.json
```

Current components in this registry:

- `alert`
- `confirm`
- `loading-button`

## Deployment (GitHub Pages)

The workflow in `.github/workflows/deploy-registry-pages.yml` deploys on pushes to `main`.

First-time setup:

1. Open GitHub repository settings.
2. Go to **Pages**.
3. Set **Source** to **GitHub Actions**.
4. Push to `main` (or run the workflow manually from the Actions tab).

The workflow does:

1. Install dependencies with pnpm.
2. Build registry output with `pnpm registry:build`.
3. Build the static site with `pnpm build`.
4. Publish `out/` to GitHub Pages.

## Local development

Install dependencies:

```bash
pnpm install
```

Run the app locally (registry files available at `/c-ui/r/*`):

```bash
pnpm dev
```

Build registry JSON output:

```bash
pnpm registry:build
```

## Add a new component to the registry

1. Create the component source file in `registry/new-york/` (example: `registry/new-york/my-component.tsx`).
2. Add a new item to `registry.json`.
3. Set `name`, `type`, `title`, `description`, `registryDependencies`, and `files`.
4. Rebuild output:

```bash
pnpm registry:build
```

5. Confirm generated files exist in `public/r/`.
6. Validate install in a consumer app:

```bash
npx shadcn@latest add http://localhost:3000/c-ui/r/my-component.json
```

7. Commit both source files and generated registry output.

## Build output details

`pnpm registry:build` runs:

```bash
shadcn build --output public/r
```

That command reads `registry.json` and writes distributable registry JSON files to `public/r`.
