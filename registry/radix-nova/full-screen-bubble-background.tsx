"use client";

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

export type FullScreenBubbleBackgroundTheme = BubbleBackgroundTheme & {
  accentHue?: number;
};

export type FullScreenBubbleBackgroundProps = ConfigurableBubbleBackgroundProps & {
  theme?: FullScreenBubbleBackgroundTheme;
  seed?: number;
};

const DEFAULT_BUBBLE_COUNT = 10;

const DEFAULT_FULLSCREEN_MOTION: BubbleBackgroundMotion = {
  driftMinMs: 45_000,
  driftMaxMs: 80_000,
  waypoints: 3,
  overshoot: 0.2,
};

const DEFAULT_INITIAL_SIZE = { width: 1440, height: 900 };

const FULL_SCREEN_THEME_DEFAULTS: BubbleBackgroundThemeDefaults = {
  key: "full-screen",
  hue: 220,
  hueSpread: 35,
  saturation: 68,
  lightness: 72,
  opacity: 0.38,
  overlay: 0.2,
};

const FULL_SCREEN_SCENE: BubbleBackgroundSceneConfig = {
  key: "full-screen",
  vignette: DEFAULT_BUBBLE_VIGNETTE,
  bubbleSize: [440, 780],
  initialXRange: [-0.05, 1.05],
  initialYRange: [-0.05, 1.05],
  saturationVariance: 10,
  lightnessVariance: 10,
  opacityVariance: 0.06,
  overlayTopAlphaMultiplier: 0.7,
  backdropStyle: "accent",
};

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
  return (
    <ConfigurableBubbleBackground
      theme={theme}
      themeDefaults={FULL_SCREEN_THEME_DEFAULTS}
      scene={FULL_SCREEN_SCENE}
      className={className}
      reducedMotion={reducedMotion}
      bubbleCount={bubbleCount}
      blur={blur}
      motion={motion}
      initialSize={initialSize}
      seed={seed}
    >
      {children}
    </ConfigurableBubbleBackground>
  );
}
