"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { WhatsappIcon } from "@/components/brand/icons";
import { wa } from "@/lib/site";

/**
 * Persistent conversion path. Appears only after the hero has scrolled past,
 * so it never competes with the hero's own primary CTA.
 */
export function WhatsappFab() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          key="wa-fab"
          href={wa.general}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Falar com a World Cell no WhatsApp"
          initial={{ opacity: 0, y: 16, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.97 }}
          transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
          className="group fixed right-4 bottom-4 z-50 flex items-center gap-3 rounded-full bg-[#25D366] py-3.5 pr-5 pl-4 font-semibold text-[#07301a] shadow-[0_16px_40px_-12px_rgba(37,211,102,0.65)] transition-transform duration-[130ms] hover:-translate-y-0.5 active:scale-[0.98] sm:right-6 sm:bottom-6"
        >
          <WhatsappIcon className="size-6 shrink-0" />
          <span className="hidden text-[15px] sm:inline">Falar no WhatsApp</span>
          <span className="text-[15px] sm:hidden">WhatsApp</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
