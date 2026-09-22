# project

2026-09-22 — dual-style registry migration completed on codex/base-ui-registry.

## Changed

Added registry.base.json and registry/base-nova sources; components.json and live
examples now use Base UI. Both manifests preserve the ten public item names and
existing public component install targets. Library-independent backgrounds and file picker reuse
existing source. Provider and confirmation logic is also shared from registry/radix-nova. Base alert and confirm items bundle their alert-dialog wrapper
at components/c-ui/provider-alert-dialog.tsx, preserving consumer-owned UI wrappers,
and depend on @c-ui/button so installing providers cannot replace the custom
button with the stock shadcn dependency.

package.json and pnpm-lock.yaml add @base-ui/react 1.8.0 alongside Radix. The
registry build script builds and formats both outputs. Radix button/dialog/dot
items now declare their existing runtime dependencies explicitly. .gitignore
allows committing generated JSON, matching AGENTS.md's publishing contract.

README.md, AGENTS.md, content/docs/index.mdx, content/docs/meta.json and the
component pages document both styles. content/docs/base-ui-migration.mdx covers
consumer API changes. All public/r/base-nova and public/r/radix-nova files are
CLI-generated. Component reports describe the relevant source, wrapper, example
and API changes; their matching generated JSON contains the same source.

## Left alone

Radix source variants and endpoints remain available. Fumadocs still has its own
transitive Radix dependencies. react-dropzone and the bubble background family
were not rewritten. No consumer repository or deployed website was modified.

## Behavior changes

Base components use render instead of asChild. Dialog focus/cancellation callbacks
follow Base UI. AlertDialogAction is a plain button; the existing confirmation
provider explicitly closes its controlled dialog. Public service options and
Promise results are unchanged. Links should use buttonVariants on a native link.

## Verify by hand

Browser checks against the exported site passed: dialog open/Escape/focus return;
alert dismiss/Promise resolution/focus return; typed confirmation disabled until
the correct term, Enter confirmation, reset on reopen, cancel and focus return.

Validation passed: baseline build; both registry builds; TypeScript; production
static export with NEXT_PUBLIC_BASE_PATH=/c-ui; fresh CLI installation of all ten
items into separate Base and Radix consumer fixtures and their typechecks. Base
consumer button retains active:scale-[0.97]. No Radix, asChild, IconPlaceholder or
repository-only imports remain in installed Base components. Formatting and diff
whitespace checks are run before completion.

The development server hit the machine's file-watcher limit; browser validation
used the successfully built static export instead.

Derived status: 0 documentation UI wrappers import Radix; 3 direct Radix source
components (button, dialog, dot-background) are intentionally retained for the
legacy registry. Base source has 0 direct Radix imports.

Review follow-up: shared provider source removes three duplicate Base files.
Radix installs a private re-export adapter; Base installs its private wrapper.
The documentation app resolves that import through components/c-ui.
Radix composition APIs are documented on the shared component pages.
FieldSeparator explicitly uses role="none"; the Base loading-button metadata
no longer redundantly declares class-variance-authority.

Follow-up validation passed: both generated registries match source; Base and
Radix consumer updates typecheck; Base installation with --overwrite preserves
the existing components/ui/alert-dialog.tsx byte-for-byte. Production build and
formatting checks pass.
