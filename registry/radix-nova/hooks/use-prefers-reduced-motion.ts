"use client";

import { useEffect, useState } from "react";

const REDUCED_MOTION_MEDIA_QUERY = "(prefers-reduced-motion: reduce)";

function getPrefersReducedMotion() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia(REDUCED_MOTION_MEDIA_QUERY).matches;
}

export function usePrefersReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(getPrefersReducedMotion);

  useEffect(() => {
    const mediaQuery = window.matchMedia(REDUCED_MOTION_MEDIA_QUERY);
    const update = () => setReducedMotion(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);

    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return reducedMotion;
}
