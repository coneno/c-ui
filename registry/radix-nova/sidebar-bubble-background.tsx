"use client";

import { useEffect, useMemo, useRef, useState } from "react";

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
import { usePrefersReducedMotion } from "@/registry/radix-nova/hooks/use-prefers-reduced-motion";

export type SidebarBubbleBackgroundTheme = BubbleBackgroundTheme & {
  key: string;
  hue: number;
};

export type SidebarBubbleBackgroundProps = ConfigurableBubbleBackgroundProps & {
  theme?: SidebarBubbleBackgroundTheme;
};

type ResolvedTheme = ResolvedBubbleBackgroundTheme & {
  key: string;
};

type LayerState = {
  id: string;
  layer: Omit<BubbleBackgroundLayer, "id" | "transitionClassName">;
  mode: "enter" | "exit";
};

const DEFAULT_BUBBLE_COUNT = 12;
const EXIT_MS = 900;

const DEFAULT_SIDEBAR_MOTION: BubbleBackgroundMotion = {
  driftMinMs: 35_000,
  driftMaxMs: 60_000,
  waypoints: 4,
  overshoot: 0.3,
};

const DEFAULT_INITIAL_SIZE = { width: 400, height: 800 };

const ENTER_CLASS_NAME = "[animation:c-ui-sidebar-bubble-layer-enter_0.9s_ease-out_both]";
const EXIT_CLASS_NAME = "[animation:c-ui-sidebar-bubble-layer-exit_0.8s_ease-out_both]";

const SIDEBAR_LAYER_KEYFRAMES = `
@keyframes c-ui-sidebar-bubble-layer-enter {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes c-ui-sidebar-bubble-layer-exit {
  to {
    opacity: 0;
  }
}
`;

function resolveTheme(theme?: SidebarBubbleBackgroundTheme): ResolvedTheme {
  return {
    key: theme?.key ?? "default",
    hue: normalizeHue(theme?.hue ?? 28),
    hueSpread: clamp(theme?.hueSpread ?? 20, 0, 180),
    saturation: clamp(theme?.saturation ?? 80, 0, 100),
    lightness: clamp(theme?.lightness ?? 70, 0, 100),
    opacity: clamp(theme?.opacity ?? 0.38, 0, 1),
    overlay: clamp(theme?.overlay ?? 0.6, 0, 1),
  };
}

function themeSignature(theme: ResolvedTheme) {
  return `${theme.key}:${theme.hue}:${theme.hueSpread}:${theme.saturation}:${theme.lightness}:${theme.opacity}:${theme.overlay}`;
}

function buildBubbles(
  theme: ResolvedTheme,
  layerId: string,
  rngSeed: number,
  bubbleCount: number,
): BubbleBackgroundBubble[] {
  const rng = createRng(rngSeed);

  return Array.from({ length: bubbleCount }, (_, index) => {
    const hue = normalizeHue(theme.hue + pickBetween(rng, -theme.hueSpread, theme.hueSpread));
    const saturation = clamp(theme.saturation + pickBetween(rng, -12, 12), 0, 100);
    const lightness = clamp(theme.lightness + pickBetween(rng, -12, 12), 0, 100);
    const opacity = clamp(theme.opacity + pickBetween(rng, -0.08, 0.08), 0.05, 1);
    const width = pickBetween(rng, 180, 360);

    return {
      id: `${layerId}-${index}`,
      initialX: pickBetween(rng, -0.5, 1.5),
      initialY: pickBetween(rng, -0.3, 1.3),
      width,
      height: width * pickBetween(rng, 0.82, 1.22),
      highlightColor: `hsl(${hue.toFixed(0)} ${clamp(saturation + 8, 0, 100).toFixed(0)}% ${clamp(lightness + 18, 0, 100).toFixed(0)}%)`,
      color: `hsl(${hue.toFixed(0)} ${saturation.toFixed(0)}% ${lightness.toFixed(0)}%)`,
      opacity,
    };
  });
}

function buildBackdrop(theme: ResolvedTheme) {
  const saturation = clamp(theme.saturation - 24, 10, 80);
  const accentHue = normalizeHue(theme.hue + Math.max(theme.hueSpread, 18));

  return [
    `radial-gradient(circle at 18% 14%, hsl(${theme.hue} ${clamp(saturation - theme.hueSpread * 0.4, 0, 100).toFixed(0)}% 97% / 0.9), transparent 42%)`,
    `radial-gradient(circle at 82% 78%, hsl(${accentHue} ${clamp(saturation - theme.hueSpread * 0.8, 0, 100).toFixed(0)}% 93% / 0.72), transparent 46%)`,
    `linear-gradient(180deg, hsl(${theme.hue} ${clamp(saturation - 10, 5, 80)}% 98%), hsl(${accentHue} ${clamp(saturation - 15, 5, 72)}% 94%))`,
  ].join(",");
}

function createLayerState({
  theme,
  bubbleCount,
  blur,
  motion,
  initialSize,
}: {
  theme: ResolvedTheme;
  bubbleCount: number;
  blur: number;
  motion: BubbleBackgroundMotion;
  initialSize: { width: number; height: number };
}): LayerState {
  const id = Math.random().toString(36).substring(2);
  const seed = (Math.random() * 0xffffffff) >>> 0;
  const accentHue = normalizeHue(theme.hue + Math.max(theme.hueSpread, 18));
  const overlay =
    theme.overlay > 0
      ? `linear-gradient(180deg, hsl(${theme.hue} 26% 99% / ${(theme.overlay * 0.72).toFixed(2)}), hsl(${accentHue} 18% 98% / ${theme.overlay.toFixed(2)}))`
      : null;

  return {
    id,
    layer: {
      bubbles: buildBubbles(theme, id, seed, bubbleCount),
      backdrop: buildBackdrop(theme),
      overlay,
      vignette: DEFAULT_BUBBLE_VIGNETTE,
      blur,
      motion,
      initialSize,
    },
    mode: "enter",
  };
}

export function SidebarBubbleBackground({
  theme,
  className,
  reducedMotion: reducedMotionProp,
  bubbleCount = DEFAULT_BUBBLE_COUNT,
  blur = 50,
  motion = DEFAULT_SIDEBAR_MOTION,
  initialSize = DEFAULT_INITIAL_SIZE,
}: SidebarBubbleBackgroundProps) {
  const preferredReducedMotion = usePrefersReducedMotion();
  const reducedMotion =
    reducedMotionProp === undefined ? preferredReducedMotion : reducedMotionProp;

  const resolvedTheme = resolveTheme(theme);
  const signature = `${themeSignature(resolvedTheme)}:${bubbleCount}:${blur}:${motion.driftMinMs}:${motion.driftMaxMs}:${motion.waypoints}:${motion.overshoot}:${initialSize.width}:${initialSize.height}`;

  const [layers, setLayers] = useState<LayerState[]>(() => [
    createLayerState({ theme: resolvedTheme, bubbleCount, blur, motion, initialSize }),
  ]);

  const previousSignatureRef = useRef(signature);

  useEffect(() => {
    if (signature === previousSignatureRef.current) {
      return;
    }

    previousSignatureRef.current = signature;

    const nextLayer = createLayerState({
      theme: resolveTheme(theme),
      bubbleCount,
      blur,
      motion,
      initialSize,
    });
    let cancelled = false;

    queueMicrotask(() => {
      if (cancelled) {
        return;
      }

      setLayers((previousLayers) => [
        ...previousLayers.map((layer) => ({ ...layer, mode: "exit" as const })),
        nextLayer,
      ]);
    });

    const timeout = window.setTimeout(
      () => setLayers((previousLayers) => previousLayers.filter((layer) => layer.mode === "enter")),
      reducedMotion ? 0 : EXIT_MS,
    );

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, [blur, bubbleCount, initialSize, motion, reducedMotion, signature, theme]);

  const backgroundLayers = useMemo<BubbleBackgroundLayer[]>(
    () =>
      layers.map((layer) => {
        return {
          id: layer.id,
          ...layer.layer,
          transitionClassName: layer.mode === "enter" ? ENTER_CLASS_NAME : EXIT_CLASS_NAME,
        };
      }),
    [layers],
  );

  return (
    <>
      <style>{SIDEBAR_LAYER_KEYFRAMES}</style>
      <BubbleBackground
        layers={backgroundLayers}
        className={className}
        reducedMotion={reducedMotion}
      />
    </>
  );
}
