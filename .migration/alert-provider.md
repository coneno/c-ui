# alert-provider

2026-09-22 — engine / consumer review — Base variant implemented; legacy registry retained.

## Changed

Files: registry/base-nova/alert-provider.tsx; components/docs/interactive-examples/alert-dialog.tsx; content/docs/components/alert-provider.mdx.

Retains the provider/hook API and Promise resolution against the Base alert-dialog wrapper.

Base source leftover scan for radix-ui, @radix-ui and IconPlaceholder is clean.
The project typecheck and static build passed after the implementation.

## Left alone

Legacy Radix registry endpoints remain supported. Library-independent backgrounds
and react-dropzone are shared without primitive rewrites.

## Behavior changes

No service API changes.

## Verify by hand

Open and dismiss; verify the awaiting caller resumes and focus returns. Browser: passed.
