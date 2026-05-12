"use client";

import { useMemo, useState } from "react";

import {
  BubbleBackground,
  DEFAULT_BUBBLE_VIGNETTE,
  type BubbleBackgroundBubble,
  type BubbleBackgroundLayer,
  type BubbleBackgroundMotion,
} from "@/registry/radix-nova/bubble-background";
import {
  clamp,
  createRng,
  normalizeHue,
  pickBetween,
  type BubbleBackgroundTheme,
  type ConfigurableBubbleBackgroundProps,
  type ResolvedBubbleBackgroundTheme,
} from "@/registry/radix-nova/bubble-background-helpers";
import { cn } from "@/lib/utils";

export type FullScreenBubbleBackgroundTheme = BubbleBackgroundTheme & {
  accentHue?: number;
};

export type FullScreenBubbleBackgroundProps = ConfigurableBubbleBackgroundProps & {
  theme?: FullScreenBubbleBackgroundTheme;
  seed?: number;
};

type ResolvedTheme = ResolvedBubbleBackgroundTheme & {
  accentHue: number;
};

const DEFAULT_BUBBLE_COUNT = 10;

const DEFAULT_FULLSCREEN_MOTION: BubbleBackgroundMotion = {
  driftMinMs: 45_000,
  driftMaxMs: 80_000,
  waypoints: 3,
  overshoot: 0.2,
};

const DEFAULT_INITIAL_SIZE = { width: 1440, height: 900 };

function buildBackdrop(theme: ResolvedTheme) {
  const primarySaturation = clamp(theme.saturation - 24, 10, 80);
  const accentSaturation = clamp(theme.saturation - 32, 8, 72);

  return [
    `radial-gradient(circle at 18% 14%, hsl(${theme.hue} ${primarySaturation.toFixed(0)}% 97% / 0.9), transparent 42%)`,
    `radial-gradient(circle at 82% 78%, hsl(${theme.accentHue} ${accentSaturation.toFixed(0)}% 93% / 0.72), transparent 46%)`,
    `linear-gradient(180deg, hsl(${theme.hue} ${clamp(primarySaturation - 10, 5, 72).toFixed(0)}% 98%), hsl(${theme.accentHue} ${clamp(accentSaturation - 8, 5, 64).toFixed(0)}% 94%))`,
  ].join(",");
}

function buildOverlay(theme: ResolvedTheme) {
  if (theme.overlay <= 0) {
    return null;
  }

  return `linear-gradient(180deg, hsl(${theme.hue} 26% 99% / ${(theme.overlay * 0.7).toFixed(2)}), hsl(${theme.accentHue} 18% 98% / ${theme.overlay.toFixed(2)}))`;
}

function buildBubbles(
  theme: ResolvedTheme,
  seed: number,
  bubbleCount: number,
): BubbleBackgroundBubble[] {
  const rng = createRng(seed);

  return Array.from({ length: bubbleCount }, (_, index) => {
    const hue = normalizeHue(theme.hue + pickBetween(rng, -theme.hueSpread, theme.hueSpread));
    const saturation = clamp(theme.saturation + pickBetween(rng, -10, 10), 0, 100);
    const lightness = clamp(theme.lightness + pickBetween(rng, -10, 10), 0, 100);
    const opacity = clamp(theme.opacity + pickBetween(rng, -0.06, 0.06), 0.05, 1);
    const width = pickBetween(rng, 440, 780);

    return {
      id: `full-screen-${index}`,
      initialX: pickBetween(rng, -0.05, 1.05),
      initialY: pickBetween(rng, -0.05, 1.05),
      width,
      height: width * pickBetween(rng, 0.82, 1.22),
      color: `hsl(${hue.toFixed(0)} ${saturation.toFixed(0)}% ${lightness.toFixed(0)}%)`,
      highlightColor: `hsl(${hue.toFixed(0)} ${clamp(saturation + 8, 0, 100).toFixed(0)}% ${clamp(lightness + 18, 0, 100).toFixed(0)}%)`,
      opacity,
    };
  });
}

function buildLayer(
  theme: ResolvedTheme,
  bubbleCount: number,
  blur: number,
  motion: BubbleBackgroundMotion,
  initialSize: { width: number; height: number },
  seed: number,
): BubbleBackgroundLayer {
  return {
    id: `full-screen-${seed}`,
    bubbles: buildBubbles(theme, seed, bubbleCount),
    backdrop: buildBackdrop(theme),
    overlay: buildOverlay(theme),
    vignette: DEFAULT_BUBBLE_VIGNETTE,
    blur,
    motion,
    initialSize,
  };
}

export function FullScreenBubbleBackground({
  className,
  children,
  theme,
  bubbleCount = DEFAULT_BUBBLE_COUNT,
  blur = 65,
  motion = DEFAULT_FULLSCREEN_MOTION,
  initialSize = DEFAULT_INITIAL_SIZE,
  reducedMotion,
  seed,
}: FullScreenBubbleBackgroundProps) {
  const [generatedSeed] = useState(() => (Math.random() * 0xffffffff) >>> 0);

  const resolvedSeed = seed ?? generatedSeed;
  const themeHue = normalizeHue(theme?.hue ?? 220);
  const themeAccentHue = normalizeHue(theme?.accentHue ?? themeHue + 35);
  const themeHueSpread = clamp(theme?.hueSpread ?? 35, 0, 180);
  const themeSaturation = clamp(theme?.saturation ?? 68, 0, 100);
  const themeLightness = clamp(theme?.lightness ?? 72, 0, 100);
  const themeOpacity = clamp(theme?.opacity ?? 0.38, 0, 1);
  const themeOverlay = clamp(theme?.overlay ?? 0.2, 0, 1);
  const resolvedTheme = useMemo(
    () => ({
      hue: themeHue,
      accentHue: themeAccentHue,
      hueSpread: themeHueSpread,
      saturation: themeSaturation,
      lightness: themeLightness,
      opacity: themeOpacity,
      overlay: themeOverlay,
    }),
    [
      themeAccentHue,
      themeHue,
      themeHueSpread,
      themeLightness,
      themeOpacity,
      themeOverlay,
      themeSaturation,
    ],
  );
  const resolvedMotion = useMemo<BubbleBackgroundMotion>(
    () => ({
      driftMinMs: motion.driftMinMs,
      driftMaxMs: motion.driftMaxMs,
      waypoints: motion.waypoints,
      overshoot: motion.overshoot,
    }),
    [motion.driftMaxMs, motion.driftMinMs, motion.overshoot, motion.waypoints],
  );
  const resolvedInitialSize = useMemo(
    () => ({ width: initialSize.width, height: initialSize.height }),
    [initialSize.height, initialSize.width],
  );

  const layers = useMemo<BubbleBackgroundLayer[]>(
    () => [buildLayer(resolvedTheme, bubbleCount, blur, resolvedMotion, resolvedInitialSize, resolvedSeed)],
    [blur, bubbleCount, resolvedInitialSize, resolvedMotion, resolvedSeed, resolvedTheme],
  );

  if (children === undefined) {
    return <BubbleBackground layers={layers} className={className} reducedMotion={reducedMotion} />;
  }

  return (
    <div className={cn("relative isolate overflow-hidden", className)}>
      <BubbleBackground layers={layers} reducedMotion={reducedMotion} />
      {children}
    </div>
  );
}
