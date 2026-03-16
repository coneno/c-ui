import { DotBackground } from "@/registry/radix-nova/dot-background"

const colorVariants = [
  {
    variant: "default",
    label: "Default",
    description: "Uses the default surface and border tokens.",
  },
  {
    variant: "muted",
    label: "Muted",
    description: "A softer surface for secondary sections.",
  },
  {
    variant: "card",
    label: "Card",
    description: "Blends into card-based layouts.",
  },
  {
    variant: "accent",
    label: "Accent",
    description: "Adds stronger contrast for callouts.",
  },
  {
    variant: "secondary",
    label: "Secondary",
    description: "Works well inside layered UIs.",
  },
] as const

const spacingVariants = [
  {
    spacing: "dense",
    label: "Dense",
    description: "Tighter pattern for more texture.",
  },
  {
    spacing: "default",
    label: "Default",
    description: "Balanced density for general use.",
  },
  {
    spacing: "relaxed",
    label: "Relaxed",
    description: "Airier spacing for larger panels.",
  },
  {
    spacing: "loose",
    label: "Loose",
    description: "Sparse dots for subtle decoration.",
  },
] as const

export function DotBackgroundInteractiveExample() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {colorVariants.map(({ variant, label, description }) => (
          <DotBackground
            key={variant}
            variant={variant}
            className="rounded-xl border p-4"
          >
            <div className="flex min-h-28 flex-col justify-between gap-4">
              <div className="flex flex-col gap-1">
                <div className="text-sm font-medium">{label}</div>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
              <div className="text-xs text-muted-foreground">{`variant="${variant}"`}</div>
            </div>
          </DotBackground>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {spacingVariants.map(({ spacing, label, description }) => (
          <DotBackground
            key={spacing}
            variant="card"
            spacing={spacing}
            className="rounded-xl border p-4"
          >
            <div className="flex min-h-24 flex-col justify-between gap-4">
              <div className="flex flex-col gap-1">
                <div className="text-sm font-medium">{label}</div>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
              <div className="text-xs text-muted-foreground">{`spacing="${spacing}"`}</div>
            </div>
          </DotBackground>
        ))}
      </div>

      <DotBackground
        variant="custom"
        spacing="custom"
        vars={{
          backgroundColor:
            "color-mix(in oklab, var(--primary) 10%, var(--background))",
          dotColor: "color-mix(in oklab, var(--primary) 28%, transparent)",
          spacing: 24,
          dotSize: 2,
        }}
        className="rounded-xl border p-5"
      >
        <div className="flex min-h-28 flex-col justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="text-sm font-medium">Custom</div>
            <p className="text-sm text-muted-foreground">
              Override surface color, dot color, spacing, and dot size with
              `vars`.
            </p>
          </div>
          <div className="text-xs text-muted-foreground">
            {`variant="custom" spacing="custom"`}
          </div>
        </div>
      </DotBackground>
    </div>
  )
}
