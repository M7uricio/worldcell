"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Scroll reveal for everything marked `data-reveal` inside `children`.
 *
 * Uses ScrollTrigger.batch so elements that cross the threshold within the
 * same frame animate as one staggered group rather than firing individually —
 * the coordinated look the motion thesis asks for.
 *
 * Only transform + opacity are animated (composite-only properties), and
 * `will-change` is cleared on completion so it doesn't linger on every node.
 */
export function Reveal({
  children,
  className,
  stagger = 0.08,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Query through the scope element, not the document: `gsap.utils.toArray`
      // with selector text is NOT scoped by useGSAP, so a global query would
      // make every Reveal on the page batch every other Reveal's elements.
      const root = scope.current;
      if (!root) return;

      const targets = Array.from(
        root.querySelectorAll<HTMLElement>("[data-reveal]"),
      );
      if (!targets.length) return;

      ScrollTrigger.batch(targets, {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.62,
            ease: "power3.out",
            stagger,
            overwrite: true,
            onComplete: () => gsap.set(batch, { willChange: "auto" }),
          }),
      });
    },
    { scope, dependencies: [stagger] },
  );

  return (
    <div ref={scope} className={className}>
      {children}
    </div>
  );
}
