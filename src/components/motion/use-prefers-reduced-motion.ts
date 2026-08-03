"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

/**
 * Reads the exact same media query the CSS overrides use, so the JS and CSS
 * halves of the reduced-motion story can never disagree.
 *
 * Motion's own `useReducedMotion` subscribes to the value-less
 * `(prefers-reduced-motion)` form, which is a different query — this keeps one
 * source of truth. Server snapshot is `false` so markup stays deterministic.
 */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
