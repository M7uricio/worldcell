"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, ClipboardCheck, Smartphone, Store } from "lucide-react";

import { Button } from "@/components/ui/button";
import { wa } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const steps = [
  {
    icon: Store,
    kicker: "Passo 01",
    title: "Traga o seu aparelho na loja",
    body: "Sem agendamento e sem compromisso. Você chega, mostra o aparelho e a gente começa a avaliação na sua frente.",
  },
  {
    icon: ClipboardCheck,
    kicker: "Passo 02",
    title: "Avaliamos na hora, com você junto",
    body: "Conferimos estado, bateria e funcionamento ali mesmo. Você acompanha cada teste e vê como chegamos ao valor.",
  },
  {
    icon: Smartphone,
    kicker: "Passo 03",
    title: "Use o valor no modelo mais novo",
    body: "O que o seu aparelho valeu entra como parte do pagamento. Você completa a diferença e sai com o iPhone que queria.",
  },
];

export function TradeIn() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop: pin the section and scrub the three steps.
      // Mobile: no pinning — long pins on touch fight the browser's own scroll,
      // so the same content just reveals as it enters.
      mm.add(
        {
          desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
          mobile: "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { desktop } = context.conditions as { desktop: boolean };
          const root = scope.current;
          if (!root) return;

          const cards = Array.from(
            root.querySelectorAll<HTMLElement>("[data-step]"),
          );

          if (desktop) {
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: scope.current,
                start: "top top",
                end: "+=180%",
                pin: "[data-pin]",
                scrub: 0.7,
              },
            });

            cards.forEach((card, i) => {
              tl.fromTo(
                card,
                { opacity: 0.15, y: 40 },
                { opacity: 1, y: 0, ease: "none" },
                i * 0.9,
              );
              if (i < cards.length - 1) {
                tl.to(card, { opacity: 0.15, y: -30, ease: "none" }, i * 0.9 + 0.65);
              }
            });

            tl.fromTo(
              "[data-rail-fill]",
              { scaleY: 0 },
              { scaleY: 1, ease: "none" },
              0,
            );
            return;
          }

          cards.forEach((card) =>
            gsap.fromTo(
              card,
              { opacity: 0, y: 28 },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power3.out",
                scrollTrigger: { trigger: card, start: "top 85%", once: true },
              },
            ),
          );
        },
      );
    },
    { scope },
  );

  return (
    <section
      ref={scope}
      id="troca"
      className="relative bg-navy-950 py-24 sm:py-32 lg:py-0"
      aria-labelledby="troca-titulo"
    >
      <div
        data-pin
        className="mx-auto flex max-w-7xl flex-col justify-center px-5 sm:px-8 lg:min-h-screen lg:py-24"
      >
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-16">
          <div className="lg:pt-6">
            <p className="text-xs font-bold tracking-[0.22em] text-gold-300 uppercase">
              Sua troca
            </p>
            <h2
              id="troca-titulo"
              className="mt-4 font-display text-4xl font-extrabold tracking-[-0.03em] text-balance text-white sm:text-5xl"
            >
              Seu iPhone atual
              <span className="block text-gold-gradient">paga parte do novo.</span>
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/65">
              Fazemos troca sim. Avaliamos o seu aparelho na hora e você usa
              esse valor como parte do pagamento para garantir um modelo mais
              novo — em três passos, no mesmo dia.
            </p>

            <Button asChild variant="gold" size="lg" className="mt-9">
              <a href={wa.tradeIn} target="_blank" rel="noopener noreferrer">
                Avaliar meu aparelho
                <ArrowRight aria-hidden />
              </a>
            </Button>
          </div>

          <div className="relative">
            {/* Progress rail — fills as the pinned timeline scrubs. */}
            <div
              aria-hidden
              className="absolute top-2 bottom-2 left-[1.4rem] hidden w-px bg-white/10 lg:block"
            >
              <div
                data-rail-fill
                className="h-full w-full origin-top surface-gold"
              />
            </div>

            <ol className="space-y-5 lg:space-y-8">
              {steps.map(({ icon: Icon, kicker, title, body }) => (
                <li
                  key={kicker}
                  data-step
                  className="relative rounded-[24px] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm lg:ml-14"
                >
                  <span
                    aria-hidden
                    className="absolute top-8 -left-[3.35rem] hidden size-11 place-items-center rounded-full border border-gold-300/30 bg-navy-950 lg:grid"
                  >
                    <Icon className="size-5 text-gold-300" />
                  </span>

                  <span className="mb-4 grid size-11 place-items-center rounded-2xl border border-gold-300/25 bg-gold-400/10 lg:hidden">
                    <Icon className="size-5 text-gold-300" aria-hidden />
                  </span>

                  <p className="text-xs font-bold tracking-[0.18em] text-gold-300/80 uppercase">
                    {kicker}
                  </p>
                  <h3 className="mt-2.5 font-display text-2xl font-bold tracking-tight text-white">
                    {title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-white/60">{body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
