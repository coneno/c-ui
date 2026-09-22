# dot-background

2026-09-22 — engine — Base variant implemented; legacy registry retained.

## Changed

Files: registry/base-nova/dot-background.tsx; components/docs/interactive-examples/dot-background.tsx; content/docs/components/dot-background.mdx.

Replaces Slot with useRender, preserving ref forwarding, CSS variables and variants.

Base source leftover scan for radix-ui, @radix-ui and IconPlaceholder is clean.
The project typecheck and static build passed after the implementation.

Shared documentation now explicitly documents Radix asChild alongside the Base composition API.

## Left alone

Legacy Radix registry endpoints remain supported. Library-independent backgrounds
and react-dropzone are shared without primitive rewrites.

## Behavior changes

asChild becomes render; this wrapper now has an explicit client boundary.

## Verify by hand

Render as section, override spacing and colors, and check children and forwarded refs.
