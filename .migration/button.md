# button

2026-09-22 — golden pair via CLI / merge — Base variant implemented; legacy registry retained.

## Changed

Files: registry/base-nova/button.tsx; components/ui/button.tsx; components/docs/interactive-examples/button.tsx; content/docs/components/button.mdx.

Uses the real Base Button with render, nativeButton and state-aware className. Preserves c-ui variants, sizes, data attributes and press scale. Adds reduced-motion handling.

Base source leftover scan for radix-ui, @radix-ui and IconPlaceholder is clean.
The project typecheck and static build passed after the implementation.

## Left alone

Legacy Radix registry endpoints remain supported. Library-independent backgrounds
and react-dropzone are shared without primitive rewrites.

## Behavior changes

asChild becomes render. Use buttonVariants on native links for link semantics.

## Verify by hand

Activate with mouse, Enter and Space; check disabled controls and reduced motion.
