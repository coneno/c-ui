# loading-button

2026-09-22 — engine — Base variant implemented; legacy registry retained.

## Changed

Files: registry/base-nova/loading-button.tsx; components/docs/interactive-examples/loading-button.tsx; content/docs/components/loading-button.mdx.

Inherits Base Button props and retains loading/disabled behavior and ref forwarding.

Base source leftover scan for radix-ui, @radix-ui and IconPlaceholder is clean.
The project typecheck and static build passed after the implementation.

## Left alone

Legacy Radix registry endpoints remain supported. Library-independent backgrounds
and react-dropzone are shared without primitive rewrites.

## Behavior changes

asChild becomes render.

## Verify by hand

Start loading and verify the control is disabled and displays the spinner, then returns to its previous state.
