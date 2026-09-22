# dialog

2026-09-22 — golden pair via CLI / merge — Base variant implemented; legacy registry retained.

## Changed

Files: registry/base-nova/dialog.tsx; registry/radix-nova/dialog.tsx; components/ui/dialog.tsx; components/docs/interactive-examples/dialog.tsx; content/docs/components/dialog.mdx.

Uses Backdrop/Popup and render composition, preserving closeLabel and footer close controls. The Radix dialog uses its sibling button so the dual-library workspace does not mix primitives.

Base source leftover scan for radix-ui, @radix-ui and IconPlaceholder is clean.
The project typecheck and static build passed after the implementation.

## Left alone

Legacy Radix registry endpoints remain supported. Library-independent backgrounds
and react-dropzone are shared without primitive rewrites.

## Behavior changes

Base focus and cancellation callbacks differ from Radix; see the migration guide.

## Verify by hand

Open, Tab through controls, close with Escape and check focus returns. Verify both close labels. Browser: opening, Escape and focus return passed.
