# c-ui registry

Custom [shadcn/ui](https://ui.shadcn.com) registry for common coneno components.

This repo builds registry JSON files into `public/r/radix-nova` and deploys them via the static export in `out/` (GitHub Pages).

## Hosted registry URLs

- Registry index: `https://coneno.github.io/c-ui/r/radix-nova/registry.json`
- Style-aware component entries: `https://coneno.github.io/c-ui/r/<style>/<component-name>.json`
- Canonical style: `radix-nova`

## Install via namespace (recommended)

Configure the registry once in your consumer app's `components.json`:

```json
{
  "style": "radix-nova",
  "registries": {
    "@c-ui": "https://coneno.github.io/c-ui/r/{style}/{name}.json"
  }
}
```

This registry currently supports only `radix-nova`. Set `"style": "radix-nova"` in the consumer app before installing components.

Then install components without repeating full URLs:

```bash
npx shadcn@latest add @c-ui/loading-button
```

You can also install multiple components in one command:

```bash
npx shadcn@latest add @c-ui/alert-provider @c-ui/confirm
```

## Local registry testing

For local development/testing of this registry, point `@c-ui` to localhost in the consumer app:

```json
{
  "style": "radix-nova",
  "registries": {
    "@c-ui": "http://localhost:3000/c-ui/r/{style}/{name}.json"
  }
}
```

Then install as usual:

```bash
npx shadcn@latest add @c-ui/loading-button
```

## Direct URL install (optional)

If needed, you can still install directly from a component URL:

```bash
npx shadcn@latest add https://coneno.github.io/c-ui/r/radix-nova/loading-button.json
```

Current components in this registry:

- `alert-provider`: Alert dialog service with provider + hook for promise-based alerts.
- `button`: Press-animated base button used across components.
- `confirm`: Confirmation dialog service with provider + hook.
- `dialog`: Customized replacement for shadcn `components/ui/dialog.tsx` with overridable close labels to support i18n and screen-reader accessibility.
- `loading-button`: Button with a built-in loading state.

## Usage examples

```tsx
import { Button } from "@/components/ui/button"

export function SaveAction() {
  return <Button>Save changes</Button>
}
```

```tsx
import { LoadingButton } from "@/components/c-ui/loading-button"

export function SubmitAction() {
  return <LoadingButton isLoading>Submitting</LoadingButton>
}
```

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

Run the app locally (registry files available at `/c-ui/r/radix-nova/*`):

```bash
pnpm dev
```

Build registry JSON output:

```bash
pnpm registry:build
```

## Add a new component to the registry

1. Create the component source file in `registry/radix-nova/` (example: `registry/radix-nova/my-component.tsx`).
2. Add a new item to `registry.json`.
3. Set `name`, `type`, `title`, `description`, `registryDependencies`, and `files`.
   - You can organize component files in subfolders as well.
   - Example source path: `registry/radix-nova/forms/my-component.tsx`
   - Example target path: `components/c-ui/forms/my-component.tsx`
4. Rebuild output:

```bash
pnpm registry:build
```

5. Confirm generated files exist in `public/r/radix-nova/`.
6. Validate install in a consumer app:

```bash
npx shadcn@latest add @c-ui/my-component
```

7. Commit both source files and generated registry output.

## Build output details

`pnpm registry:build` runs:

```bash
shadcn build --output public/r/radix-nova
```

That command reads `registry.json` and writes distributable registry JSON files to `public/r/radix-nova`.
