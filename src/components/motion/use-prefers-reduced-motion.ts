"use client";

import { useMediaQuery } from "@/components/motion/use-media-query";

const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Reads the exact same media query the CSS overrides use, so the JS and CSS
 * halves of the reduced-motion story can never disagree.
 *
 * Motion's own `useReducedMotion` subscribes to the value-less
 * `(prefers-reduced-motion)` form, which is a different query — this keeps one
 * source of truth.
 */
export function usePrefersReducedMotion() {
  return useMediaQuery(QUERY);
}
