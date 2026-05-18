"use client";

import { useMemo } from "react";

import {
  DEFAULT_BUBBLE_VIGNETTE,
  type BubbleBackgroundMotion,
} from "@/registry/radix-nova/bubble-background";
import { ConfigurableBubbleBackground } from "@/registry/radix-nova/configurable-bubble-background";
import {
  type BubbleBackgroundSceneConfig,
  type BubbleBackgroundTheme,
  type BubbleBackgroundThemeDefaults,
  type ConfigurableBubbleBackgroundProps,
} from "@/registry/radix-nova/bubble-background-helpers";

export type SidebarBubbleBackgroundTheme = BubbleBackgroundTheme & {
  key: string;
  hue: number;
};

export type SidebarBubbleBackgroundProps = ConfigurableBubbleBackgroundProps & {
  theme?: SidebarBubbleBackgroundTheme;
  /** [minPx, maxPx] pixel size range for each bubble. Defaults to [180, 360] (sidebar scale). */
  bubbleSize?: [number, number];
  seed?: number;
};

const DEFAULT_BUBBLE_COUNT = 12;

const DEFAULT_SIDEBAR_MOTION: BubbleBackgroundMotion = {
  driftMinMs: 35_000,
  driftMaxMs: 60_000,
  waypoints: 4,
  overshoot: 0.3,
};

const DEFAULT_INITIAL_SIZE = { width: 400, height: 800 };
const DEFAULT_BUBBLE_SIZE: [number, number] = [180, 360];

const SIDEBAR_THEME_DEFAULTS: BubbleBackgroundThemeDefaults = {
  key: "default",
  hue: 28,
  hueSpread: 20,
  saturation: 80,
  lightness: 70,
  opacity: 0.38,
  overlay: 0.6,
};

const SIDEBAR_SCENE_BASE: Omit<BubbleBackgroundSceneConfig, "bubbleSize"> = {
  key: "sidebar",
  vignette: DEFAULT_BUBBLE_VIGNETTE,
  initialXRange: [-0.5, 1.5],
  initialYRange: [-0.3, 1.3],
  saturationVariance: 12,
  lightnessVariance: 12,
  opacityVariance: 0.08,
  overlayTopAlphaMultiplier: 0.72,
  backdropStyle: "spread",
};

export function SidebarBubbleBackground({
  theme,
  className,
  children,
  reducedMotion: reducedMotionProp,
  bubbleCount = DEFAULT_BUBBLE_COUNT,
  blur = 50,
  motion = DEFAULT_SIDEBAR_MOTION,
  initialSize = DEFAULT_INITIAL_SIZE,
  bubbleSize = DEFAULT_BUBBLE_SIZE,
  seed,
}: SidebarBubbleBackgroundProps) {
  const [minBubbleSize, maxBubbleSize] = bubbleSize;
  const scene = useMemo<BubbleBackgroundSceneConfig>(
    () => ({ ...SIDEBAR_SCENE_BASE, bubbleSize: [minBubbleSize, maxBubbleSize] }),
    [minBubbleSize, maxBubbleSize],
  );

  return (
    <ConfigurableBubbleBackground
      theme={theme}
      themeDefaults={SIDEBAR_THEME_DEFAULTS}
      scene={scene}
      className={className}
      reducedMotion={reducedMotionProp}
      bubbleCount={bubbleCount}
      blur={blur}
      motion={motion}
      initialSize={initialSize}
      seed={seed}
      crossfade
    >
      {children}
    </ConfigurableBubbleBackground>
  );
}
