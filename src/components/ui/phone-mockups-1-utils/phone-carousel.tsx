"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

import { usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";
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

function PhoneFrame({
  children,
  muted = false,
  className,
}: {
  children?: React.ReactNode;
  muted?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative aspect-[393/852] w-[15.5rem] shrink-0 sm:w-[17rem]",
        className,
      )}
    >
      {/* Side buttons — drawn behind the chassis so they read as part of it. */}
      <span
        className={cn(
          "absolute top-[17%] -left-[3px] h-[7%] w-[3px] rounded-l-sm",
          muted ? "bg-mist" : "bg-linear-to-b from-neutral-500 to-neutral-700",
        )}
      />
      <span
        className={cn(
          "absolute top-[27%] -left-[3px] h-[11%] w-[3px] rounded-l-sm",
          muted ? "bg-mist" : "bg-linear-to-b from-neutral-500 to-neutral-700",
        )}
      />
      <span
        className={cn(
          "absolute top-[41%] -left-[3px] h-[11%] w-[3px] rounded-l-sm",
          muted ? "bg-mist" : "bg-linear-to-b from-neutral-500 to-neutral-700",
        )}
      />
      <span
        className={cn(
          "absolute top-[30%] -right-[3px] h-[15%] w-[3px] rounded-r-sm",
          muted ? "bg-mist" : "bg-linear-to-b from-neutral-500 to-neutral-700",
        )}
      />

      {/* Chassis */}
      <div
        className={cn(
          "relative h-full w-full rounded-[3rem] p-[0.7rem]",
          muted
            ? "bg-mist"
            : "bg-linear-to-b from-neutral-700 via-neutral-900 to-neutral-800 shadow-[0_40px_80px_-20px_rgba(5,7,28,0.55)]",
        )}
      >
        {/* Screen */}
        <div
          className={cn(
            "relative h-full w-full overflow-hidden rounded-[2.4rem]",
            muted ? "bg-smoke" : "bg-white",
          )}
        >
          {children}

          {/* Dynamic Island */}
          <div
            className={cn(
              "absolute top-[1.6%] left-1/2 z-20 h-[3.6%] w-[30%] -translate-x-1/2 rounded-full",
              muted ? "bg-mist" : "bg-black",
            )}
          />
          {/* Home indicator */}
          <div
            className={cn(
              "absolute bottom-[1%] left-1/2 z-20 h-[0.45%] w-[34%] -translate-x-1/2 rounded-full",
              muted ? "bg-mist" : "bg-black/25",
            )}
          />
        </div>
      </div>
    </div>
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
  const [index, setIndex] = React.useState(0);
  const [direction, setDirection] = React.useState(1);
  const [paused, setPaused] = React.useState(false);

  const count = images.length;

  const go = React.useCallback(
    (delta: number) => {
      setDirection(delta);
      setIndex((i) => (i + delta + count) % count);
    },
    [count],
  );

  // Auto-rotation. Skipped entirely when the user asked for reduced motion —
  // an unstoppable slideshow is exactly what that preference is about.
  React.useEffect(() => {
    if (paused || reduceMotion || interval <= 0 || count < 2) return;
    const id = window.setInterval(() => go(1), interval);
    return () => window.clearInterval(id);
  }, [paused, reduceMotion, interval, count, go]);

  const current = images[index];
  const prevImage = images[(index - 1 + count) % count];
  const nextImage = images[(index + 1) % count];

  // Enter/exit follow the motion thesis: enter decelerates in (ease-out),
  // exit is shorter and accelerates away (ease-in), never scaling to zero.
  const slide = {
    enter: (dir: number) => ({ opacity: 0, x: dir * 42, scale: 0.98 }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit: (dir: number) => ({ opacity: 0, x: dir * -42, scale: 0.98 }),
  };

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
      {/* Flanking devices — decorative depth only. */}
      <PhoneFrame
        muted
        className="pointer-events-none absolute top-[8%] left-1/2 hidden -translate-x-[105%] scale-[0.92] opacity-70 md:block"
      >
        <Image
          src={prevImage.src}
          alt=""
          fill
          aria-hidden
          sizes="17rem"
          className="object-cover opacity-35 grayscale"
        />
      </PhoneFrame>

      <PhoneFrame
        muted
        className="pointer-events-none absolute top-[8%] left-1/2 hidden translate-x-[5%] scale-[0.92] opacity-70 md:block"
      >
        <Image
          src={nextImage.src}
          alt=""
          fill
          aria-hidden
          sizes="17rem"
          className="object-cover opacity-35 grayscale"
        />
      </PhoneFrame>

      {/* Hero device */}
      <PhoneFrame className="relative z-10">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={current.src}
            custom={direction}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={
              reduceMotion
                ? { duration: 0 }
                : {
                    opacity: { duration: 0.24, ease: [0.2, 0, 0, 1] },
                    x: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
                    scale: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
                  }
            }
            className="absolute inset-0"
          >
            <Image
              src={current.src}
              alt={current.alt}
              fill
              priority={index === 0}
              sizes="(max-width: 640px) 15.5rem, 17rem"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        <p className="sr-only" aria-live="polite">
          Tela {index + 1} de {count}: {current.alt}
        </p>
      </PhoneFrame>

      {/* Controls — 44px targets, always visible, never hover-only. */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
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
