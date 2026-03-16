import * as React from "react"
import { cva } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const dotBackgroundColorVariants = {
  default: {
    backgroundColor: "var(--background)",
    dotColor: "var(--border)",
  },
  muted: {
    backgroundColor: "var(--muted)",
    dotColor: "color-mix(in oklab, var(--muted-foreground) 24%, transparent)",
  },
  card: {
    backgroundColor: "var(--card)",
    dotColor: "color-mix(in oklab, var(--border) 90%, transparent)",
  },
  accent: {
    backgroundColor: "var(--accent)",
    dotColor: "color-mix(in oklab, var(--accent-foreground) 18%, transparent)",
  },
  secondary: {
    backgroundColor: "var(--secondary)",
    dotColor:
      "color-mix(in oklab, var(--secondary-foreground) 16%, transparent)",
  },
  custom: {
    backgroundColor: "var(--background)",
    dotColor: "var(--border)",
  },
} as const satisfies Record<
  string,
  { backgroundColor: string; dotColor: string }
>

const dotBackgroundSpacingVariants = {
  dense: { spacing: "0.875rem" },
  default: { spacing: "1.25rem" },
  relaxed: { spacing: "1.75rem" },
  loose: { spacing: "2.25rem" },
  custom: { spacing: "1.25rem" },
} as const satisfies Record<string, { spacing: string }>

type DotBackgroundVariant = keyof typeof dotBackgroundColorVariants
type DotBackgroundSpacingVariant = keyof typeof dotBackgroundSpacingVariants

const defaultDotBackgroundVariant: DotBackgroundVariant = "default"
const defaultDotBackgroundSpacing: DotBackgroundSpacingVariant = "default"
const defaultDotBackgroundDotSize = "1px"

function createVariantEntries<T extends Record<string, unknown>>(variants: T) {
  return Object.fromEntries(
    Object.keys(variants).map((key) => [key, ""])
  ) as Record<keyof T, string>
}

const dotBackgroundVariants = cva("relative isolate", {
  variants: {
    variant: createVariantEntries(dotBackgroundColorVariants),
    spacing: createVariantEntries(dotBackgroundSpacingVariants),
  },
  defaultVariants: {
    variant: defaultDotBackgroundVariant,
    spacing: defaultDotBackgroundSpacing,
  },
})

type DotBackgroundStyle = React.CSSProperties & {
  "--dot-background-color"?: string
  "--dot-background-dot-color"?: string
  "--dot-background-spacing"?: string
  "--dot-background-dot-size"?: string
}

type DotBackgroundResolvedStyle = DotBackgroundStyle & {
  "--dot-pattern-bg"?: string
  "--dot-pattern-color"?: string
  "--dot-pattern-spacing"?: string
  "--dot-pattern-dot-size"?: string
}

type DotBackgroundVars = {
  backgroundColor?: string
  dotColor?: string
  spacing?: number | string
  dotSize?: number | string
}

type DotBackgroundProps = Omit<React.ComponentProps<"div">, "style"> & {
  asChild?: boolean
  variant?: DotBackgroundVariant
  spacing?: DotBackgroundSpacingVariant
  vars?: DotBackgroundVars
  style?: DotBackgroundStyle
}

function resolveCssLength(value: number | string | undefined) {
  if (typeof value === "number") {
    return `${value}px`
  }

  return value
}

function DotBackground({
  asChild = false,
  variant = defaultDotBackgroundVariant,
  spacing = defaultDotBackgroundSpacing,
  vars,
  className,
  style,
  ...props
}: DotBackgroundProps) {
  const Comp = asChild ? Slot.Root : "div"
  const colorVariant = dotBackgroundColorVariants[variant]
  const spacingVariant = dotBackgroundSpacingVariants[spacing]

  const resolvedStyle: DotBackgroundResolvedStyle = {
    "--dot-background-color": vars?.backgroundColor,
    "--dot-background-dot-color": vars?.dotColor,
    "--dot-background-spacing": resolveCssLength(vars?.spacing),
    "--dot-background-dot-size": resolveCssLength(vars?.dotSize),
    "--dot-pattern-bg": `var(--dot-background-color, ${colorVariant.backgroundColor})`,
    "--dot-pattern-color": `var(--dot-background-dot-color, ${colorVariant.dotColor})`,
    "--dot-pattern-spacing": `var(--dot-background-spacing, ${spacingVariant.spacing})`,
    "--dot-pattern-dot-size": `var(--dot-background-dot-size, ${defaultDotBackgroundDotSize})`,
    backgroundColor: "var(--dot-pattern-bg)",
    backgroundImage:
      "radial-gradient(circle, var(--dot-pattern-color) var(--dot-pattern-dot-size), transparent calc(var(--dot-pattern-dot-size) + 0.5px))",
    backgroundSize: "var(--dot-pattern-spacing) var(--dot-pattern-spacing)",
    backgroundPosition: "0 0",
    ...style,
  }

  return (
    <Comp
      data-slot="dot-background"
      data-variant={variant}
      data-spacing={spacing}
      className={cn(dotBackgroundVariants({ variant, spacing }), className)}
      style={resolvedStyle}
      {...props}
    />
  )
}

export {
  DotBackground,
  dotBackgroundColorVariants,
  dotBackgroundSpacingVariants,
  dotBackgroundVariants,
}
export type {
  DotBackgroundProps,
  DotBackgroundSpacingVariant,
  DotBackgroundStyle,
  DotBackgroundVariant,
  DotBackgroundVars,
}
