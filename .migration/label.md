# label

2026-09-22 — engine — Base variant implemented; legacy registry retained.

## Changed

Files: components/ui/label.tsx.

Replaces the documentation Label primitive with a native label.

Base source leftover scan for radix-ui, @radix-ui and IconPlaceholder is clean.
The project typecheck and static build passed after the implementation.

## Left alone

Legacy Radix registry endpoints remain supported. Library-independent backgrounds
and react-dropzone are shared without primitive rewrites.

## Behavior changes

Base UI has no standalone Label primitive.

## Verify by hand

Click a label and check the associated input receives focus.
