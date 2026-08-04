"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, MapPin, Star } from "lucide-react";

import PhoneMockupBasic from "@/components/ui/phone-mockups-1";
import { Button } from "@/components/ui/button";
import { site, wa } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const guarantees = [
  "Garantia da loja",
  "Teste antes de comprar",
  "Aceitamos seu aparelho na troca",
  "Condições especiais à vista",
];

export function Hero() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      // Reduced motion opts out of the entrance choreography *and* the
      // scroll-linked parallax below — both are decorative.
      if (reduce) return;

      // Entrance: a one-off choreography, so it can afford the longer timing
      // budget the frequency rule allows.
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from("[data-hero-line]", {
          yPercent: 108,
          duration: 0.95,
          stagger: 0.08,
        })
        .from(
          "[data-hero-fade]",
          { opacity: 0, y: 20, duration: 0.6, stagger: 0.07 },
          "-=0.55",
        )
        .from(
          "[data-hero-device]",
          { opacity: 0, y: 44, scale: 0.97, duration: 0.9 },
          "-=0.8",
        );

      // Scroll-linked parallax. Scrubbed, so it stays linear and 1:1 with the
      // scroll input — no easing, no fixed duration.
      ScrollTrigger.create({
        trigger: scope.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.6,
        animation: gsap
          .timeline()
          .to("[data-hero-device]", { yPercent: 14, ease: "none" }, 0)
          .to("[data-hero-copy]", { yPercent: -8, opacity: 0.35, ease: "none" }, 0)
          .to("[data-hero-glow]", { yPercent: 22, ease: "none" }, 0),
      });
    },
    { scope },
  );

  return (
    <section
      ref={scope}
      id="topo"
      className="relative isolate overflow-hidden bg-navy-950 pt-30 pb-20 sm:pt-36 lg:pt-40 lg:pb-28"
    >
      {/* Ambient light — the only "decoration" the visual thesis allows. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          data-hero-glow
          className="absolute top-[-18%] left-1/2 h-[46rem] w-[46rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(201,162,39,0.20),transparent_62%)] blur-3xl"
        />
        <div className="absolute right-[-14%] bottom-[-24%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(47,58,150,0.34),transparent_65%)] blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_62%,#05071c)]" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-10 xl:gap-16">
        <div data-hero-copy>
          {/* Social proof above the fold — the strongest conversion lever a
              5,0 / 1.440 listing has. */}
          <a
            data-hero-fade
            href={site.address.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2.5 rounded-full border border-white/15 bg-white/5 py-2.5 pr-5 pl-3 text-sm text-white/85 backdrop-blur-sm transition-colors duration-[130ms] hover:border-gold-300/50 hover:text-white"
          >
            <span className="flex items-center gap-0.5" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-3.5 fill-gold-300 text-gold-300" />
              ))}
            </span>
            <span className="font-semibold text-white">5,0</span>
            <span className="text-white/45">·</span>
            <span>
              {site.rating.count.toLocaleString("pt-BR")} avaliações no Google
            </span>
          </a>

          <h1 className="mt-7 font-display text-[2.6rem] leading-[1.03] font-extrabold tracking-[-0.035em] text-white sm:text-6xl lg:text-[4.4rem]">
            <span className="block overflow-hidden pb-1">
              <span data-hero-line className="block">
                O iPhone que
              </span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span data-hero-line className="block">
                você quer, sem
              </span>
            </span>
            <span className="block overflow-hidden pb-2">
              <span data-hero-line className="block text-gold-gradient">
                pagar de novo.
              </span>
            </span>
          </h1>

          <p
            data-hero-fade
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/70 sm:text-xl"
          >
            Novos e seminovos revisados ponto a ponto, com garantia da loja.
            Você testa o aparelho inteiro antes de fechar e ainda pode usar o
            seu atual como parte do pagamento.
          </p>

          <div data-hero-fade className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="gold" size="lg" className="w-full sm:w-auto">
              <a href={wa.catalog} target="_blank" rel="noopener noreferrer">
                Ver modelos disponíveis
                <ArrowRight aria-hidden />
              </a>
            </Button>
            <Button
              asChild
              variant="ghostLight"
              size="lg"
              className="w-full sm:w-auto"
            >
              <a href="#loja">
                <MapPin aria-hidden />
                Como chegar na loja
              </a>
            </Button>
          </div>

          <ul
            data-hero-fade
            className="mt-9 flex flex-wrap gap-x-6 gap-y-2.5 text-sm text-white/60"
          >
            {guarantees.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span
                  aria-hidden
                  className="size-1.5 rounded-full bg-gold-300"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* 21st.dev phone-mockups-1 */}
        <div
          data-hero-device
          className="relative flex justify-center lg:justify-end"
        >
          <PhoneMockupBasic />
        </div>
      </div>
    </section>
  );
}
