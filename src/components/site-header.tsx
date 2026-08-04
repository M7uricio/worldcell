"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, Phone, X } from "lucide-react";

import { Wordmark } from "@/components/brand/wordmark";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { site, wa } from "@/lib/site";

const links = [
  { href: "#modelos", label: "Modelos" },
  { href: "#garantia", label: "Garantia" },
  { href: "#troca", label: "Troca" },
  { href: "#duvidas", label: "Dúvidas" },
  { href: "#loja", label: "A loja" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on Escape and lock the page while the sheet is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-navy-800"
      >
        Ir para o conteúdo
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)]",
          scrolled
            ? "border-b border-white/10 bg-navy-950/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
          <a
            href="#topo"
            className="shrink-0 rounded-lg py-1"
            aria-label={`${site.name} — início`}
          >
            <Wordmark tone="light" className="h-8 sm:h-9" />
          </a>

          <nav aria-label="Navegação principal" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="relative inline-flex h-11 items-center rounded-full px-4 text-sm font-medium text-white/70 transition-colors duration-[130ms] hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${site.phone.e164}`}
              className="hidden h-11 items-center gap-2 rounded-full px-3 text-sm font-medium text-white/75 transition-colors hover:text-white md:inline-flex"
            >
              <Phone className="size-4" aria-hidden />
              {site.phone.display}
            </a>

            <Button asChild variant="gold" size="sm" className="hidden sm:inline-flex">
              <a href={wa.general} target="_blank" rel="noopener noreferrer">
                Falar no WhatsApp
              </a>
            </Button>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Abrir menu"
              aria-expanded={open}
              className="grid size-11 place-items-center rounded-full border border-white/20 text-white transition-colors hover:border-white/45 lg:hidden"
            >
              <Menu className="size-5" aria-hidden />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile sheet — enter decelerates in, exit is shorter and opacity-led. */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="nav-sheet"
            className="fixed inset-0 z-60 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
          >
            <button
              type="button"
              aria-label="Fechar menu"
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-navy-950/70 backdrop-blur-sm"
            />

            <motion.nav
              aria-label="Navegação principal"
              className="absolute inset-x-3 top-3 rounded-[28px] border border-white/10 bg-navy-900 p-6 shadow-2xl"
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.99 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-6 flex items-center justify-between">
                <Wordmark tone="light" className="h-8" />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Fechar menu"
                  className="grid size-11 place-items-center rounded-full border border-white/20 text-white"
                >
                  <X className="size-5" aria-hidden />
                </button>
              </div>

              <ul className="space-y-1">
                {links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-2xl px-4 py-3.5 text-lg font-medium text-white/85 transition-colors hover:bg-white/5 hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-6 grid gap-2.5">
                <Button asChild variant="whatsapp" size="lg">
                  <a href={wa.general} target="_blank" rel="noopener noreferrer">
                    Falar no WhatsApp
                  </a>
                </Button>
                <Button asChild variant="ghostLight" size="lg">
                  <a href={`tel:${site.phone.e164}`}>
                    <Phone aria-hidden />
                    {site.phone.display}
                  </a>
                </Button>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
