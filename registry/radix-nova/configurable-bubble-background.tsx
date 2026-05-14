"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import {
  BubbleBackground,
  type BubbleBackgroundLayer,
  type BubbleBackgroundMotion,
} from "@/registry/radix-nova/bubble-background";
import {
  cloneBubbleBackgroundInitialSize,
  cloneBubbleBackgroundMotion,
  createBubbleBackgroundLayer,
  getBubbleBackgroundSceneSignature,
  randomBubbleBackgroundLayerId,
  randomBubbleBackgroundSeed,
  resolveBubbleBackgroundTheme,
  type BubbleBackgroundSceneConfig,
  type BubbleBackgroundSceneTheme,
  type BubbleBackgroundThemeDefaults,
  type ConfigurableBubbleBackgroundProps,
  type ResolvedBubbleBackgroundSceneTheme,
} from "@/registry/radix-nova/bubble-background-helpers";
import { usePrefersReducedMotion } from "@/registry/radix-nova/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

type ConfigurableBubbleBackgroundSceneProps = ConfigurableBubbleBackgroundProps & {
  theme?: BubbleBackgroundSceneTheme;
  themeDefaults: BubbleBackgroundThemeDefaults;
  scene: BubbleBackgroundSceneConfig;
  bubbleCount: number;
  blur: number;
  motion: BubbleBackgroundMotion;
  initialSize: { width: number; height: number };
  seed?: number;
  crossfade?: boolean;
};

type LayerState = {
  layer: BubbleBackgroundLayer;
  mode: "enter" | "exit";
};

const EXIT_MS = 900;

const ENTER_CLASS_NAME = "[animation:c-ui-bubble-layer-enter_0.9s_ease-out_both]";
const EXIT_CLASS_NAME = "[animation:c-ui-bubble-layer-exit_0.8s_ease-out_both]";

const BUBBLE_LAYER_KEYFRAMES = `
@keyframes c-ui-bubble-layer-enter {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes c-ui-bubble-layer-exit {
  to {
    opacity: 0;
  }
}
`;

function createTransitionLayer({
  bubbleCount,
  blur,
  initialSize,
  motion,
  scene,
  theme,
}: {
  theme: ResolvedBubbleBackgroundSceneTheme;
  scene: BubbleBackgroundSceneConfig;
  bubbleCount: number;
  blur: number;
  motion: BubbleBackgroundMotion;
  initialSize: { width: number; height: number };
}): LayerState {
  const layerId = randomBubbleBackgroundLayerId();
  const seed = randomBubbleBackgroundSeed();

  return {
    layer: createBubbleBackgroundLayer({
      layerId,
      seed,
      theme,
      scene,
      bubbleCount,
      blur,
      motion,
      initialSize,
    }),
    mode: "enter",
  };
}

export function ConfigurableBubbleBackground({
  theme,
  themeDefaults,
  scene,
  className,
  children,
  bubbleCount,
  blur,
  motion,
  initialSize,
  reducedMotion: reducedMotionProp,
  seed,
  crossfade = false,
}: ConfigurableBubbleBackgroundSceneProps) {
  const preferredReducedMotion = usePrefersReducedMotion();
  const reducedMotion =
    reducedMotionProp === undefined ? preferredReducedMotion : reducedMotionProp;

  const { driftMinMs, driftMaxMs, overshoot, waypoints } = motion;
  const { width: initialWidth, height: initialHeight } = initialSize;

  const resolvedTheme = useMemo(
    () => resolveBubbleBackgroundTheme(theme, themeDefaults),
    [theme, themeDefaults],
  );
  const resolvedMotion = useMemo(
    () => cloneBubbleBackgroundMotion({ driftMinMs, driftMaxMs, overshoot, waypoints }),
    [driftMaxMs, driftMinMs, overshoot, waypoints],
  );
  const resolvedInitialSize = useMemo(
    () => cloneBubbleBackgroundInitialSize({ width: initialWidth, height: initialHeight }),
    [initialHeight, initialWidth],
  );
  const signature = useMemo(
    () =>
      getBubbleBackgroundSceneSignature({
        theme: resolvedTheme,
        scene,
        bubbleCount,
        blur,
        motion: resolvedMotion,
        initialSize: resolvedInitialSize,
      }),
    [blur, bubbleCount, resolvedInitialSize, resolvedMotion, resolvedTheme, scene],
  );

  const [generatedSeed] = useState(() => randomBubbleBackgroundSeed());
  const resolvedSeed = seed ?? generatedSeed;

  const layers = useMemo<BubbleBackgroundLayer[]>(() => {
    if (crossfade) {
      return [];
    }

    return [
      createBubbleBackgroundLayer({
        layerId: `${scene.key}-${resolvedSeed}`,
        seed: resolvedSeed,
        theme: resolvedTheme,
        scene,
        bubbleCount,
        blur,
        motion: resolvedMotion,
        initialSize: resolvedInitialSize,
      }),
    ];
  }, [
    blur,
    bubbleCount,
    crossfade,
    resolvedInitialSize,
    resolvedMotion,
    resolvedSeed,
    resolvedTheme,
    scene,
  ]);

  const [transitionLayers, setTransitionLayers] = useState<LayerState[]>(() => {
    if (!crossfade) {
      return [];
    }

    return [
      createTransitionLayer({
        theme: resolvedTheme,
        scene,
        bubbleCount,
        blur,
        motion: resolvedMotion,
        initialSize: resolvedInitialSize,
      }),
    ];
  });

  const previousSignatureRef = useRef(signature);

  useEffect(() => {
    if (!crossfade || signature === previousSignatureRef.current) {
      return;
    }

    previousSignatureRef.current = signature;

    const nextLayer = createTransitionLayer({
      theme: resolvedTheme,
      scene,
      bubbleCount,
      blur,
      motion: resolvedMotion,
      initialSize: resolvedInitialSize,
    });
    let cancelled = false;

    queueMicrotask(() => {
      if (cancelled) {
        return;
      }

      setTransitionLayers((previousLayers) => [
        ...previousLayers.map((layer) => ({ ...layer, mode: "exit" as const })),
        nextLayer,
      ]);
    });

    const timeout = window.setTimeout(
      () =>
        setTransitionLayers((previousLayers) =>
          previousLayers.filter((layer) => layer.mode === "enter"),
        ),
      reducedMotion ? 0 : EXIT_MS,
    );

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, [
    blur,
    bubbleCount,
    crossfade,
    reducedMotion,
    resolvedInitialSize,
    resolvedMotion,
    resolvedTheme,
    scene,
    signature,
  ]);

  const backgroundLayers = useMemo<BubbleBackgroundLayer[]>(() => {
    if (!crossfade) {
      return layers;
    }

    return transitionLayers.map(({ layer, mode }) => ({
      ...layer,
      transitionClassName: mode === "enter" ? ENTER_CLASS_NAME : EXIT_CLASS_NAME,
    }));
  }, [crossfade, layers, transitionLayers]);

  if (children === undefined) {
    return (
      <>
        {crossfade && <style>{BUBBLE_LAYER_KEYFRAMES}</style>}
        <BubbleBackground
          layers={backgroundLayers}
          className={className}
          reducedMotion={reducedMotion}
        />
      </>
    );
  }

  return (
    <div className={cn("relative isolate overflow-hidden", className)}>
      {crossfade && <style>{BUBBLE_LAYER_KEYFRAMES}</style>}
      <BubbleBackground layers={backgroundLayers} reducedMotion={reducedMotion} />
      {children}
    </div>
  );
}
