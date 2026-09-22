# confirm

2026-09-22 — engine / consumer review — Base variant implemented; legacy registry retained.

## Changed

Files: registry/radix-nova/confirm-provider.tsx; registry/radix-nova/confirm-dialog.tsx; components/docs/interactive-examples/confirm-dialog.tsx; content/docs/components/confirm.mdx.

Retains controlled close and Promise<boolean> API, translated labels and typed confirmation guard.

Base implementation and shared provider logic contain no Radix primitive imports or IconPlaceholder references.
The project typecheck and static build passed after the implementation.

Both provider and dialog logic are shared from registry/radix-nova. Base copies were removed. The dialog imports components/c-ui/provider-alert-dialog, resolved to the style-specific wrapper by each manifest. Input and Label still resolve through the consumer style.

## Left alone

Legacy Radix registry endpoints remain supported. Library-independent backgrounds
and react-dropzone are shared without primitive rewrites.

## Behavior changes

No service API changes; the provider explicitly closes the Base action.

## Verify by hand

Verify cancel=false, confirm=true, input resets on reopen and invalid text disables confirmation. Browser: typed guard, Enter confirmation, reset, cancel and focus return passed.

Review verification: Base and Radix provider updates through shadcn CLI 4.21.0
installed the private wrapper and both consumer fixtures typechecked. Base
installation with --overwrite preserved a consumer-owned shared alert-dialog
byte-for-byte.
