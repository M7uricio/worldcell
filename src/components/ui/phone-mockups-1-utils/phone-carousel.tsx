"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

import { usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";
import { useMediaQuery } from "@/components/motion/use-media-query";
import { cn } from "@/lib/utils";

export interface ImageItem {
  src: string;
  alt: string;
}

export interface PhoneCarouselProps {
  images: ImageItem[];
  /** Auto-advance delay in ms. Set to 0 to disable auto-rotation. */
  interval?: number;
  className?: string;
}

/* -------------------------------------------------------------------------- */
/*  Device shell                                                              */
/* -------------------------------------------------------------------------- */

function PhoneFrame({ children }: { children?: React.ReactNode }) {
  return (
    <div className="relative h-full w-full">
      {/* Side buttons — drawn behind the chassis so they read as part of it. */}
      <span className="absolute top-[17%] -left-[3px] h-[7%] w-[3px] rounded-l-sm bg-linear-to-b from-neutral-500 to-neutral-700" />
      <span className="absolute top-[27%] -left-[3px] h-[11%] w-[3px] rounded-l-sm bg-linear-to-b from-neutral-500 to-neutral-700" />
      <span className="absolute top-[41%] -left-[3px] h-[11%] w-[3px] rounded-l-sm bg-linear-to-b from-neutral-500 to-neutral-700" />
      <span className="absolute top-[30%] -right-[3px] h-[15%] w-[3px] rounded-r-sm bg-linear-to-b from-neutral-500 to-neutral-700" />

      {/* Chassis */}
      <div className="relative h-full w-full rounded-[3rem] bg-linear-to-b from-neutral-700 via-neutral-900 to-neutral-800 p-[0.7rem] shadow-[0_40px_80px_-20px_rgba(5,7,28,0.55)]">
        {/* Screen */}
        <div className="relative h-full w-full overflow-hidden rounded-[2.4rem] bg-white">
          {children}

          {/* Dynamic Island */}
          <div className="absolute top-[1.6%] left-1/2 z-20 h-[3.6%] w-[30%] -translate-x-1/2 rounded-full bg-black" />
          {/* Home indicator */}
          <div className="absolute bottom-[1%] left-1/2 z-20 h-[0.45%] w-[34%] -translate-x-1/2 rounded-full bg-black/25" />
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Per-phone transform, driven by signed distance from the active slide      */
/* -------------------------------------------------------------------------- */

type SlotTransform = {
  x: string;
  y: number;
  scale: number;
  opacity: number;
  rotateY: number;
  zIndex: number;
};

/** Shortest signed distance from `index`, wrapping around the ends of the list. */
function wrappedOffset(i: number, index: number, count: number) {
  let raw = i - index;
  const half = count / 2;
  if (raw > half) raw -= count;
  if (raw < -half) raw += count;
  return raw;
}

function baseTransform(offset: number): SlotTransform {
  const abs = Math.abs(offset);
  const sign = Math.sign(offset);

  if (abs === 0) {
    return { x: "0%", y: 0, scale: 1, opacity: 1, rotateY: 0, zIndex: 30 };
  }
  if (abs === 1) {
    return {
      x: `${sign * 76}%`,
      y: 22,
      scale: 0.82,
      opacity: 0.6,
      rotateY: sign * -26,
      zIndex: 20,
    };
  }
  // Anything two-or-more slides away sits fully transparent just past the
  // visible edge — present in the DOM so it has somewhere to animate *from*
  // once it rotates into view, but never seen or reachable while there.
  return {
    x: `${sign * 118}%`,
    y: 34,
    scale: 0.68,
    opacity: 0,
    rotateY: sign * -32,
    zIndex: 10,
  };
}

function PhoneSlot({
  item,
  offset,
  isHovered,
  reduceMotion,
  onHoverChange,
  onSelect,
}: {
  item: ImageItem;
  offset: number;
  isHovered: boolean;
  reduceMotion: boolean;
  onHoverChange: (hovered: boolean) => void;
  onSelect?: () => void;
}) {
  const isActive = offset === 0;
  const base = baseTransform(offset);

  // Pointer-tracked micro-tilt, "leaning" the hovered phone toward the
  // cursor — rAF-throttled so it never fires more than once per frame.
  const [tilt, setTilt] = React.useState({ rx: 0, ry: 0 });
  const rafRef = React.useRef<number | null>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reduceMotion || e.pointerType !== "mouse") return;
    if (rafRef.current !== null) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rafRef.current = requestAnimationFrame(() => {
      setTilt({ rx: py * -8, ry: px * 14 });
      rafRef.current = null;
    });
  };

  const resetTilt = () => setTilt({ rx: 0, ry: 0 });
  const hoverBoost = isHovered && !reduceMotion;

  return (
    // Always the same host element (a div), whether this phone is active or
    // a ghost. It used to switch between motion.div (active) and
    // motion.button (ghost) — but changing element TYPE on the phone that
    // becomes active/inactive forces React to unmount and remount it, which
    // severs Motion's animation continuity: that specific handoff snapped
    // into place instead of transitioning, while phones moving between two
    // ghost offsets (same element type throughout) animated fine. Button
    // semantics are applied via role/tabIndex/onKeyDown instead, so the tag
    // itself never changes.
    <motion.div
      role={isActive ? undefined : "button"}
      aria-label={isActive ? undefined : `Ir para: ${item.alt}`}
      aria-hidden={!isActive && Math.abs(offset) >= 2 ? true : undefined}
      tabIndex={isActive ? undefined : Math.abs(offset) >= 2 ? -1 : 0}
      onClick={isActive ? undefined : onSelect}
      onKeyDown={
        isActive
          ? undefined
          : (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect?.();
              }
            }
      }
      onPointerEnter={() => onHoverChange(true)}
      onPointerLeave={() => {
        onHoverChange(false);
        resetTilt();
      }}
      onPointerMove={handlePointerMove}
      onFocus={() => onHoverChange(true)}
      onBlur={() => {
        onHoverChange(false);
        resetTilt();
      }}
      animate={{
        x: base.x,
        y: base.y,
        scale: base.scale,
        rotateY: base.rotateY,
        // Opacity is safe on the outer element too — unlike x/y/scale it
        // never changes the hit-testing box, so brightening a dimmed ghost
        // on hover doesn't risk the same flicker.
        opacity: hoverBoost
          ? Math.min(1, base.opacity + (isActive ? 0 : 0.35))
          : base.opacity,
        zIndex: hoverBoost ? base.zIndex + (isActive ? 0 : 15) : base.zIndex,
      }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { type: "spring", stiffness: 190, damping: 24, mass: 0.8 }
      }
      className={cn(
        "absolute inset-0 rounded-[3rem]",
        isActive ? "cursor-default" : "cursor-pointer touch-manipulation",
        !isActive &&
          "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-400",
      )}
      style={{
        willChange: "transform",
        // The slide two-or-more away is fully transparent — without this it
        // would still be a live, invisible hit target sitting on top of
        // whatever's actually visible underneath it.
        pointerEvents: Math.abs(offset) >= 2 ? "none" : "auto",
      }}
    >
      {/* Inner element carries every hover-reactive visual: lift, scale
          bump, and the cursor-tracked tilt. Purely decorative — it never
          affects the parent's hit box. */}
      <motion.div
        animate={{
          y: hoverBoost ? -(isActive ? 4 : 10) : 0,
          scale: hoverBoost ? 1 + (isActive ? 0.035 : 0.09) : 1,
          rotateY: hoverBoost ? tilt.ry : 0,
          rotateX: hoverBoost ? tilt.rx : 0,
        }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { type: "spring", stiffness: 300, damping: 22, mass: 0.5 }
        }
        className="h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        <PhoneFrame>
          <Image
            src={item.src}
            alt={isActive ? item.alt : ""}
            aria-hidden={!isActive}
            fill
            priority={isActive}
            sizes="(max-width: 640px) 15.5rem, 17rem"
            className="object-cover"
          />
        </PhoneFrame>
      </motion.div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Carousel                                                                  */
/* -------------------------------------------------------------------------- */

export function PhoneCarousel({
  images,
  interval = 3800,
  className,
}: PhoneCarouselProps) {
  const reduceMotion = usePrefersReducedMotion();
  // Below `md` there's no room for a coverflow — mirrors the layout's own
  // breakpoint for the hero column narrowing to a single stacked device.
  const showGhosts = useMediaQuery("(min-width: 768px)");

  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  const count = images.length;
  const isPaused = paused || hoveredIndex !== null;

  const go = React.useCallback(
    (delta: number) => setIndex((i) => (i + delta + count) % count),
    [count],
  );

  // Auto-rotation. Skipped entirely when the user asked for reduced motion —
  // an unstoppable slideshow is exactly what that preference is about.
  React.useEffect(() => {
    if (isPaused || reduceMotion || interval <= 0 || count < 2) return;
    const id = window.setInterval(() => go(1), interval);
    return () => window.clearInterval(id);
  }, [isPaused, reduceMotion, interval, count, go]);

  const current = images[index];

  return (
    <div
      className={cn(
        "relative flex w-full items-center justify-center",
        className,
      )}
      role="region"
      aria-roledescription="carrossel"
      aria-label="Telas do aparelho"
    >
      <div
        className="relative aspect-[393/852] w-[15.5rem] sm:w-[17rem]"
        style={{ perspective: 1400 }}
      >
        {images.map((item, i) => {
          const offset = wrappedOffset(i, index, count);
          if (!showGhosts && offset !== 0) return null;

          return (
            <PhoneSlot
              key={item.src}
              item={item}
              offset={offset}
              isHovered={hoveredIndex === i}
              reduceMotion={reduceMotion}
              onHoverChange={(hovered) =>
                setHoveredIndex(hovered ? i : (cur) => (cur === i ? null : cur))
              }
              onSelect={offset === 0 ? undefined : () => setIndex(i)}
            />
          );
        })}

        <p className="sr-only" aria-live="polite">
          Tela {index + 1} de {count}: {current.alt}
        </p>
      </div>

      {/* Controls — 44px targets, always visible, never hover-only. */}
      <div className="absolute bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2">
        <ControlButton label="Tela anterior" onClick={() => go(-1)}>
          <ChevronLeft />
        </ControlButton>

        <ControlButton
          label={paused ? "Retomar rotação automática" : "Pausar rotação automática"}
          onClick={() => setPaused((p) => !p)}
          size="lg"
        >
          {paused ? <Play className="translate-x-px" /> : <Pause />}
        </ControlButton>

        <ControlButton label="Próxima tela" onClick={() => go(1)}>
          <ChevronRight />
        </ControlButton>
      </div>
    </div>
  );
}

function ControlButton({
  label,
  onClick,
  children,
  size = "md",
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
  size?: "md" | "lg";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        "grid place-items-center rounded-full border border-white/25 bg-navy-950/55 text-white backdrop-blur-md",
        "transition-all duration-[130ms] ease-[cubic-bezier(0.2,0,0,1)]",
        "hover:border-gold-300/70 hover:bg-navy-900/75 hover:text-gold-200 active:scale-95",
        size === "lg" ? "size-12 [&_svg]:size-5" : "size-11 [&_svg]:size-4",
      )}
    >
      {children}
    </button>
  );
}
