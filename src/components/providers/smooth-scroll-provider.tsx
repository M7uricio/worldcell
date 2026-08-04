"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Owns the page's scroll layer:
 *
 *  - Lenis provides the smooth scroll.
 *  - Lenis drives GSAP's ticker (instead of its own rAF) so ScrollTrigger and
 *    the smoothing never fight over the same frame.
 *  - `ScrollTrigger.update` is registered on every Lenis frame, which the
 *    ScrollTrigger docs call out as mandatory for third-party scrollers.
 *
 * Under `prefers-reduced-motion` the whole layer is skipped: native scrolling
 * stays, and `js-motion` is never set so reveals render in their final state.
 */
export function SmoothScrollProvider() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    document.documentElement.classList.add("js-motion");

    if (reduce) {
      return () => document.documentElement.classList.remove("js-motion");
    }

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Anchor links have to go through Lenis, otherwise the native jump and the
    // smoothed position desync and ScrollTrigger recalculates against a stale
    // offset.
    const onAnchorClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement | null)?.closest?.(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null;
      if (!anchor) return;

      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;

      const target = document.querySelector(id);
      if (!target) return;

      event.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -84 });
    };

    document.addEventListener("click", onAnchorClick);

    // Late-loading fonts and images shift trigger positions.
    const refresh = () => ScrollTrigger.refresh();
    if (document.fonts?.ready) void document.fonts.ready.then(refresh);
    window.addEventListener("load", refresh);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(raf);
      lenis.destroy();
      document.documentElement.classList.remove("js-motion");
    };
  }, []);

  return null;
}
