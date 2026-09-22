# confirm

2026-09-22 — engine / consumer review — Base variant implemented; legacy registry retained.

## Changed

Files: registry/base-nova/confirm-provider.tsx; registry/base-nova/confirm-dialog.tsx; components/docs/interactive-examples/confirm-dialog.tsx; content/docs/components/confirm.mdx.

Retains controlled close and Promise<boolean> API, translated labels and typed confirmation guard.

Base source leftover scan for radix-ui, @radix-ui and IconPlaceholder is clean.
The project typecheck and static build passed after the implementation.

## Left alone

Legacy Radix registry endpoints remain supported. Library-independent backgrounds
and react-dropzone are shared without primitive rewrites.

## Behavior changes

No service API changes; the provider explicitly closes the Base action.

## Verify by hand

Verify cancel=false, confirm=true, input resets on reopen and invalid text disables confirmation. Browser: typed guard, Enter confirmation, reset, cancel and focus return passed.
