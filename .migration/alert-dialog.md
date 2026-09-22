# alert-dialog

2026-09-22 — golden pair via CLI / merge — Base variant implemented; legacy registry retained.

## Changed

Files: registry/base-nova/alert-dialog.tsx; components/ui/alert-dialog.tsx.

Uses Base AlertDialog parts. Both provider registry items bundle this wrapper and depend on @c-ui/button, avoiding stock button replacement during installation.

Base implementation and shared provider logic contain no Radix primitive imports or IconPlaceholder references.
The project typecheck and static build passed after the implementation.

The Base manifest now targets components/c-ui/provider-alert-dialog.tsx, preserving consumer-owned components/ui/alert-dialog.tsx. components/c-ui/provider-alert-dialog.tsx is the docs adapter. The upstream plain-action behavior is unchanged.

## Left alone

Legacy Radix registry endpoints remain supported. Library-independent backgrounds
and react-dropzone are shared without primitive rewrites.

## Behavior changes

AlertDialogAction is a plain button; owners close controlled dialogs explicitly. Cancel uses Base Close. Wrapper className remains a string.

## Verify by hand

Open, dismiss with Cancel and Escape, check focus return and title announcement.

Review verification: Base and Radix provider updates through shadcn CLI 4.21.0
installed the private wrapper and both consumer fixtures typechecked. Base
installation with --overwrite preserved a consumer-owned shared alert-dialog
byte-for-byte.
