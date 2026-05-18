"use client";

import * as React from "react";

import { usePrefersReducedMotion } from "@/registry/radix-nova/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

export type BubbleBackgroundBubble = {
  id: string;
  initialX: number;
  initialY: number;
  width: number;
  height?: number;
  highlightColor?: string;
  color: string;
  opacity?: number;
};

export type BubbleBackgroundMotion = {
  driftMinMs: number;
  driftMaxMs: number;
  waypoints: number;
  overshoot: number;
};

export type BubbleBackgroundLayer = {
  id: string;
  bubbles: BubbleBackgroundBubble[];
  backdrop: string;
  motion: BubbleBackgroundMotion;
  overlay?: string | null;
  vignette?: string | null;
  blur?: number;
  bubbleContainerClassName?: string;
  transitionClassName?: string;
  initialSize?: { width: number; height: number };
};

export type BubbleBackgroundProps = {
  layers: BubbleBackgroundLayer[];
  className?: string;
  reducedMotion?: boolean;
};

export const DEFAULT_BUBBLE_VIGNETTE =
  "radial-gradient(circle at center, transparent 26%, rgba(255,255,255,0.14) 100%)";

function Bubble({
  bubble,
  containerSize,
  reducedMotion,
  motion,
}: {
  bubble: BubbleBackgroundBubble;
  containerSize: { width: number; height: number };
  reducedMotion: boolean;
  motion: BubbleBackgroundMotion;
}) {
  const bubbleRef = React.useRef<HTMLDivElement>(null);
  const sizeRef = React.useRef(containerSize);
  const bubbleHeight = bubble.height ?? bubble.width;

  React.useEffect(() => {
    sizeRef.current = containerSize;
  }, [containerSize]);

  React.useEffect(() => {
    if (reducedMotion || !bubbleRef.current) return;

    let animation: Animation | null = null;
    let cancelled = false;
    let currentX = 0;
    let currentY = 0;
    let initialized = false;

    function drift() {
      if (cancelled || !bubbleRef.current) return;

      const { width, height } = sizeRef.current;
      const startX = initialized ? currentX : bubble.initialX * width;
      const startY = initialized ? currentY : bubble.initialY * height;
      initialized = true;

      const keyframes: Keyframe[] = [
        {
          transform: `translate3d(${(startX - bubble.width / 2).toFixed(0)}px, ${(startY - bubbleHeight / 2).toFixed(0)}px, 0)`,
        },
      ];

      for (let index = 0; index < motion.waypoints; index++) {
        currentX = (-motion.overshoot + Math.random() * (1 + 2 * motion.overshoot)) * width;
        currentY = (-motion.overshoot + Math.random() * (1 + 2 * motion.overshoot)) * height;
        keyframes.push({
          transform: `translate3d(${(currentX - bubble.width / 2).toFixed(0)}px, ${(currentY - bubbleHeight / 2).toFixed(0)}px, 0)`,
        });
      }

      animation = bubbleRef.current.animate(keyframes, {
        duration: motion.driftMinMs + Math.random() * (motion.driftMaxMs - motion.driftMinMs),
        easing: "ease-in-out",
        fill: "both",
      });

      animation.onfinish = drift;
    }

    drift();

    return () => {
      cancelled = true;
      animation?.cancel();
    };
  }, [bubble, bubbleHeight, motion, reducedMotion]);

  return (
    <div
      ref={bubbleRef}
      data-slot="bubble-background-bubble"
      className="absolute rounded-full will-change-transform"
      style={{
        transform: `translate3d(${(bubble.initialX * containerSize.width - bubble.width / 2).toFixed(0)}px, ${(bubble.initialY * containerSize.height - bubbleHeight / 2).toFixed(0)}px, 0)`,
        width: bubble.width,
        height: bubbleHeight,
        background: `radial-gradient(circle at 30% 30%, ${bubble.highlightColor ?? bubble.color}, ${bubble.color} 56%, transparent 88%)`,
        opacity: bubble.opacity ?? 1,
      }}
    />
  );
}

function BubbleLayer({
  layer,
  reducedMotion,
}: {
  layer: BubbleBackgroundLayer;
  reducedMotion: boolean;
}) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = React.useState(
    () => layer.initialSize ?? { width: 400, height: 800 },
  );

  React.useLayoutEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      setContainerSize({ width: rect.width, height: rect.height });
    }

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;

      const { width, height } = entry.contentRect;
      if (width > 0 && height > 0) {
        setContainerSize({ width, height });
      }
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      data-slot="bubble-background-layer"
      className={cn(
        "absolute inset-0 overflow-hidden",
        !reducedMotion && layer.transitionClassName,
      )}
    >
      <div className="absolute inset-0" style={{ background: layer.backdrop }} />
      <div
        ref={containerRef}
        className={cn("absolute -inset-25", layer.bubbleContainerClassName)}
        style={{ filter: `blur(${layer.blur ?? 50}px)`, transform: "translateZ(0)" }}
      >
        {layer.bubbles.map((bubble) => (
          <Bubble
            key={bubble.id}
            bubble={bubble}
            containerSize={containerSize}
            reducedMotion={reducedMotion}
            motion={layer.motion}
          />
        ))}
      </div>
      {layer.overlay && <div className="absolute inset-0" style={{ background: layer.overlay }} />}
      {layer.vignette && (
        <div className="absolute inset-0" style={{ background: layer.vignette }} />
      )}
    </div>
  );
}

const BubbleBackground = React.memo(function BubbleBackground({
  layers,
  className,
  reducedMotion: reducedMotionProp,
}: BubbleBackgroundProps) {
  const preferredReducedMotion = usePrefersReducedMotion();
  const reducedMotion =
    reducedMotionProp === undefined ? preferredReducedMotion : reducedMotionProp;

  return (
    <div
      data-slot="bubble-background"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden="true"
    >
      {layers.map((layer) => (
        <BubbleLayer key={layer.id} layer={layer} reducedMotion={reducedMotion} />
      ))}
    </div>
  );
});

export { BubbleBackground };
