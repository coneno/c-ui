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
