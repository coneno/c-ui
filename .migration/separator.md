# separator

2026-09-22 — engine — Base variant implemented; legacy registry retained.

## Changed

Files: components/ui/separator.tsx.

Uses the Base Separator primitive in documentation field layouts.

Base implementation and shared provider logic contain no Radix primitive imports or IconPlaceholder references.
The project typecheck and static build passed after the implementation.

components/ui/field.tsx now passes role="none" for FieldSeparator. Semantic Separator defaults remain unchanged; the decorative field rule is excluded from separator semantics.

## Left alone

Legacy Radix registry endpoints remain supported. Library-independent backgrounds
and react-dropzone are shared without primitive rewrites.

## Behavior changes

The Radix decorative prop is removed; consumers needing decorative semantics may use role="none".

## Verify by hand

Check horizontal/vertical separators and accessible semantics.
