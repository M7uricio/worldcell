"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Minus, Plus } from "lucide-react";

import { usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";
import { Button } from "@/components/ui/button";
import { wa } from "@/lib/site";

/** Verbatim from the store's own "Perguntas frequentes" Instagram highlight. */
const faqs = [
  {
    q: "Faz troca com o meu aparelho?",
    a: "Fazemos sim! Avaliamos seu aparelho na hora e você usa como parte do pagamento para garantir um modelo mais novo.",
  },
  {
    q: "Celular seminovo é confiável?",
    a: "Sim! Todos passam por testes completos, revisão interna e externa e são vendidos somente após aprovação técnica. É por isso que oferecemos garantia.",
  },
  {
    q: "Posso testar o aparelho antes de comprar?",
    a: "Claro! Aqui você testa câmera, áudio, bateria, tudo antes de finalizar a compra. Transparência total.",
  },
  {
    q: "Tem desconto à vista?",
    a: "Temos sim! Pagamentos à vista sempre ganham condições especiais.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section
      id="duvidas"
      className="relative bg-white py-24 sm:py-32"
      aria-labelledby="faq-titulo"
    >
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <header className="text-center">
          <p className="text-xs font-bold tracking-[0.22em] text-gold-600 uppercase">
            Dúvidas frequentes
          </p>
          <h2
            id="faq-titulo"
            className="mt-4 font-display text-4xl font-extrabold tracking-[-0.03em] text-balance text-navy-800 sm:text-5xl"
          >
            As perguntas que mais recebemos
          </h2>
        </header>

        <ul className="mt-14 divide-y divide-mist border-y border-mist">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <li key={faq.q}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-trigger-${i}`}
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left transition-colors duration-[130ms] hover:text-navy-600"
                  >
                    <span className="font-display text-xl font-bold tracking-tight text-navy-800 group-hover:text-navy-600 sm:text-2xl">
                      {faq.q}
                    </span>
                    <span
                      aria-hidden
                      className="grid size-11 shrink-0 place-items-center rounded-full border border-mist text-navy-800 transition-all duration-[240ms] ease-[cubic-bezier(0.2,0,0,1)] group-hover:border-gold-400 group-hover:bg-gold-100/50"
                    >
                      {isOpen ? (
                        <Minus className="size-5" />
                      ) : (
                        <Plus className="size-5" />
                      )}
                    </span>
                  </button>
                </h3>

                {/* Height is animated, not transitioned, so it never fights the
                    layout during scroll; exit is shorter than enter. */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key={`panel-${i}`}
                      id={`faq-panel-${i}`}
                      role="region"
                      aria-labelledby={`faq-trigger-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : {
                              height: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
                              opacity: { duration: 0.2 },
                            }
                      }
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-7 text-lg leading-relaxed text-slate-ink">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>

        <div className="mt-14 rounded-[28px] bg-smoke p-8 text-center sm:p-10">
          <h3 className="font-display text-2xl font-bold tracking-tight text-navy-800">
            Ficou com outra dúvida?
          </h3>
          <p className="mx-auto mt-3 max-w-md leading-relaxed text-slate-ink">
            Chame no WhatsApp. Respondemos de segunda a sábado, das 9h às 19h.
          </p>
          <Button asChild variant="whatsapp" size="lg" className="mt-7">
            <a href={wa.general} target="_blank" rel="noopener noreferrer">
              Tirar dúvida no WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
