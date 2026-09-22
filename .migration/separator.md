# separator

2026-09-22 — engine — Base variant implemented; legacy registry retained.

## Changed

Files: components/ui/separator.tsx.

Uses the Base Separator primitive in documentation field layouts.

Base source leftover scan for radix-ui, @radix-ui and IconPlaceholder is clean.
The project typecheck and static build passed after the implementation.

## Left alone

Legacy Radix registry endpoints remain supported. Library-independent backgrounds
and react-dropzone are shared without primitive rewrites.

## Behavior changes

The Radix decorative prop is removed; consumers needing decorative semantics may use role="none".

## Verify by hand

Check horizontal/vertical separators and accessible semantics.
