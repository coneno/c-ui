# alert-provider

2026-09-22 — engine / consumer review — Base variant implemented; legacy registry retained.

## Changed

Files: registry/radix-nova/alert-provider.tsx; components/docs/interactive-examples/alert-dialog.tsx; content/docs/components/alert-provider.mdx.

Retains the provider/hook API and Promise resolution against the Base alert-dialog wrapper.

Base implementation and shared provider logic contain no Radix primitive imports or IconPlaceholder references.
The project typecheck and static build passed after the implementation.

The shared provider imports components/c-ui/provider-alert-dialog. Base bundles its private wrapper; Radix bundles registry/radix-nova/provider-alert-dialog.tsx as an adapter. The duplicate Base provider was removed. registry.base.json and registry.json publish the appropriate adapter with the same provider source.

## Left alone

Legacy Radix registry endpoints remain supported. Library-independent backgrounds
and react-dropzone are shared without primitive rewrites.

## Behavior changes

No service API changes.

## Verify by hand

Open and dismiss; verify the awaiting caller resumes and focus returns. Browser: passed.

Review verification: Base and Radix provider updates through shadcn CLI 4.21.0
installed the private wrapper and both consumer fixtures typechecked. Base
installation with --overwrite preserved a consumer-owned shared alert-dialog
byte-for-byte.
