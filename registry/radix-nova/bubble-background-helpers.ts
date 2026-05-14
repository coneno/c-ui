import type { ReactNode } from "react";

import type { BubbleBackgroundMotion } from "@/registry/radix-nova/bubble-background";

export type BubbleBackgroundTheme = {
  hue?: number;
  hueSpread?: number;
  saturation?: number;
  lightness?: number;
  opacity?: number;
  overlay?: number;
};

export type ConfigurableBubbleBackgroundProps = {
  className?: string;
  children?: ReactNode;
  bubbleCount?: number;
  blur?: number;
  motion?: BubbleBackgroundMotion;
  initialSize?: { width: number; height: number };
  reducedMotion?: boolean | null;
};

export type ResolvedBubbleBackgroundTheme = {
  hue: number;
  hueSpread: number;
  saturation: number;
  lightness: number;
  opacity: number;
  overlay: number;
};

export type BubbleBackgroundSceneTheme = BubbleBackgroundTheme & {
  key?: string;
  accentHue?: number;
};

export type BubbleBackgroundThemeDefaults = {
  key: string;
  hue: number;
  accentHue?: number;
  hueSpread: number;
  saturation: number;
  lightness: number;
  opacity: number;
  overlay: number;
};

export type ResolvedBubbleBackgroundSceneTheme = ResolvedBubbleBackgroundTheme & {
  key: string;
  accentHue: number;
};

export type BubbleBackgroundSceneConfig = {
  key: string;
  vignette: string | null;
  bubbleSize: [number, number];
  initialXRange: [number, number];
  initialYRange: [number, number];
  saturationVariance: number;
  lightnessVariance: number;
  opacityVariance: number;
  overlayTopAlphaMultiplier: number;
  backdropStyle: "spread" | "accent";
};

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function normalizeHue(hue: number) {
  return ((hue % 360) + 360) % 360;
}

export function createRng(seed: number) {
  let state = seed || 1;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let next = Math.imul(state ^ (state >>> 15), 1 | state);
    next ^= next + Math.imul(next ^ (next >>> 7), 61 | next);
    return ((next ^ (next >>> 14)) >>> 0) / 4294967296;
  };
}

export function pickBetween(rng: () => number, min: number, max: number) {
  return min + (max - min) * rng();
}

export function resolveBubbleBackgroundTheme(
  theme: BubbleBackgroundSceneTheme | undefined,
  defaults: BubbleBackgroundThemeDefaults,
): ResolvedBubbleBackgroundSceneTheme {
  const hue = normalizeHue(theme?.hue ?? defaults.hue);
  const hueSpread = clamp(theme?.hueSpread ?? defaults.hueSpread, 0, 180);

  return {
    key: theme?.key ?? defaults.key,
    hue,
    accentHue: normalizeHue(
      theme?.accentHue ?? defaults.accentHue ?? hue + Math.max(hueSpread, 18),
    ),
    hueSpread,
    saturation: clamp(theme?.saturation ?? defaults.saturation, 0, 100),
    lightness: clamp(theme?.lightness ?? defaults.lightness, 0, 100),
    opacity: clamp(theme?.opacity ?? defaults.opacity, 0, 1),
    overlay: clamp(theme?.overlay ?? defaults.overlay, 0, 1),
  };
}

export function getBubbleBackgroundThemeSignature(theme: ResolvedBubbleBackgroundSceneTheme) {
  return [
    theme.key,
    theme.hue,
    theme.accentHue,
    theme.hueSpread,
    theme.saturation,
    theme.lightness,
    theme.opacity,
    theme.overlay,
  ].join(":");
}

export function cloneBubbleBackgroundMotion(
  motion: BubbleBackgroundMotion,
): BubbleBackgroundMotion {
  return {
    driftMinMs: motion.driftMinMs,
    driftMaxMs: motion.driftMaxMs,
    waypoints: motion.waypoints,
    overshoot: motion.overshoot,
  };
}

export function cloneBubbleBackgroundInitialSize(initialSize: { width: number; height: number }) {
  return { width: initialSize.width, height: initialSize.height };
}

export function getBubbleBackgroundSceneSignature({
  theme,
  scene,
  bubbleCount,
  blur,
  motion,
  initialSize,
}: {
  theme: ResolvedBubbleBackgroundSceneTheme;
  scene: BubbleBackgroundSceneConfig;
  bubbleCount: number;
  blur: number;
  motion: BubbleBackgroundMotion;
  initialSize: { width: number; height: number };
}) {
  return [
    getBubbleBackgroundThemeSignature(theme),
    scene.key,
    bubbleCount,
    blur,
    motion.driftMinMs,
    motion.driftMaxMs,
    motion.waypoints,
    motion.overshoot,
    initialSize.width,
    initialSize.height,
    scene.bubbleSize[0],
    scene.bubbleSize[1],
    scene.initialXRange[0],
    scene.initialXRange[1],
    scene.initialYRange[0],
    scene.initialYRange[1],
    scene.saturationVariance,
    scene.lightnessVariance,
    scene.opacityVariance,
    scene.overlayTopAlphaMultiplier,
    scene.backdropStyle,
  ].join(":");
}

function buildBubbleBackdrop(
  theme: ResolvedBubbleBackgroundSceneTheme,
  backdropStyle: BubbleBackgroundSceneConfig["backdropStyle"],
) {
  if (backdropStyle === "accent") {
    const primarySaturation = clamp(theme.saturation - 24, 10, 80);
    const accentSaturation = clamp(theme.saturation - 32, 8, 72);

    return [
      `radial-gradient(circle at 18% 14%, hsl(${theme.hue} ${primarySaturation.toFixed(0)}% 97% / 0.9), transparent 42%)`,
      `radial-gradient(circle at 82% 78%, hsl(${theme.accentHue} ${accentSaturation.toFixed(0)}% 93% / 0.72), transparent 46%)`,
      `linear-gradient(180deg, hsl(${theme.hue} ${clamp(primarySaturation - 10, 5, 72).toFixed(0)}% 98%), hsl(${theme.accentHue} ${clamp(accentSaturation - 8, 5, 64).toFixed(0)}% 94%))`,
    ].join(",");
  }

  const saturation = clamp(theme.saturation - 24, 10, 80);

  return [
    `radial-gradient(circle at 18% 14%, hsl(${theme.hue} ${clamp(saturation - theme.hueSpread * 0.4, 0, 100).toFixed(0)}% 97% / 0.9), transparent 42%)`,
    `radial-gradient(circle at 82% 78%, hsl(${theme.accentHue} ${clamp(saturation - theme.hueSpread * 0.8, 0, 100).toFixed(0)}% 93% / 0.72), transparent 46%)`,
    `linear-gradient(180deg, hsl(${theme.hue} ${clamp(saturation - 10, 5, 80)}% 98%), hsl(${theme.accentHue} ${clamp(saturation - 15, 5, 72)}% 94%))`,
  ].join(",");
}

function buildBubbleOverlay(
  theme: ResolvedBubbleBackgroundSceneTheme,
  overlayTopAlphaMultiplier: number,
) {
  if (theme.overlay <= 0) {
    return null;
  }

  return `linear-gradient(180deg, hsl(${theme.hue} 26% 99% / ${(theme.overlay * overlayTopAlphaMultiplier).toFixed(2)}), hsl(${theme.accentHue} 18% 98% / ${theme.overlay.toFixed(2)}))`;
}

function buildBubbleLayerBubbles({
  theme,
  scene,
  layerId,
  seed,
  bubbleCount,
}: {
  theme: ResolvedBubbleBackgroundSceneTheme;
  scene: BubbleBackgroundSceneConfig;
  layerId: string;
  seed: number;
  bubbleCount: number;
}) {
  const rng = createRng(seed);

  return Array.from({ length: bubbleCount }, (_, index) => {
    const hue = normalizeHue(theme.hue + pickBetween(rng, -theme.hueSpread, theme.hueSpread));
    const saturation = clamp(
      theme.saturation + pickBetween(rng, -scene.saturationVariance, scene.saturationVariance),
      0,
      100,
    );
    const lightness = clamp(
      theme.lightness + pickBetween(rng, -scene.lightnessVariance, scene.lightnessVariance),
      0,
      100,
    );
    const opacity = clamp(
      theme.opacity + pickBetween(rng, -scene.opacityVariance, scene.opacityVariance),
      0.05,
      1,
    );
    const width = pickBetween(rng, scene.bubbleSize[0], scene.bubbleSize[1]);

    return {
      id: `${layerId}-${index}`,
      initialX: pickBetween(rng, scene.initialXRange[0], scene.initialXRange[1]),
      initialY: pickBetween(rng, scene.initialYRange[0], scene.initialYRange[1]),
      width,
      height: width * pickBetween(rng, 0.82, 1.22),
      highlightColor: `hsl(${hue.toFixed(0)} ${clamp(saturation + 8, 0, 100).toFixed(0)}% ${clamp(lightness + 18, 0, 100).toFixed(0)}%)`,
      color: `hsl(${hue.toFixed(0)} ${saturation.toFixed(0)}% ${lightness.toFixed(0)}%)`,
      opacity,
    };
  });
}

export function createBubbleBackgroundLayer({
  layerId,
  seed,
  theme,
  scene,
  bubbleCount,
  blur,
  motion,
  initialSize,
}: {
  layerId: string;
  seed: number;
  theme: ResolvedBubbleBackgroundSceneTheme;
  scene: BubbleBackgroundSceneConfig;
  bubbleCount: number;
  blur: number;
  motion: BubbleBackgroundMotion;
  initialSize: { width: number; height: number };
}) {
  return {
    id: layerId,
    bubbles: buildBubbleLayerBubbles({ theme, scene, layerId, seed, bubbleCount }),
    backdrop: buildBubbleBackdrop(theme, scene.backdropStyle),
    overlay: buildBubbleOverlay(theme, scene.overlayTopAlphaMultiplier),
    vignette: scene.vignette,
    blur,
    motion,
    initialSize,
  };
}

export function randomBubbleBackgroundLayerId() {
  return Math.random().toString(36).substring(2);
}

export function randomBubbleBackgroundSeed() {
  return (Math.random() * 0xffffffff) >>> 0;
}
