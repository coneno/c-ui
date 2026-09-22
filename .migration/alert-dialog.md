# alert-dialog

2026-09-22 — golden pair via CLI / merge — Base variant implemented; legacy registry retained.

## Changed

Files: registry/base-nova/alert-dialog.tsx; components/ui/alert-dialog.tsx.

Uses Base AlertDialog parts. Both provider registry items bundle this wrapper and depend on @c-ui/button, avoiding stock button replacement during installation.

Base source leftover scan for radix-ui, @radix-ui and IconPlaceholder is clean.
The project typecheck and static build passed after the implementation.

## Left alone

Legacy Radix registry endpoints remain supported. Library-independent backgrounds
and react-dropzone are shared without primitive rewrites.

## Behavior changes

AlertDialogAction is a plain button; owners close controlled dialogs explicitly. Cancel uses Base Close. Wrapper className remains a string.

## Verify by hand

Open, dismiss with Cancel and Escape, check focus return and title announcement.
