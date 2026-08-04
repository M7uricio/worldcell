import { ArrowUpRight, Star } from "lucide-react";

import { InstagramIcon } from "@/components/brand/icons";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

/**
 * Social proof built only from figures the store can actually back up: the
 * Google aggregate rating and review count. No invented customer quotes —
 * the section points at the real listing instead of paraphrasing it.
 */
export function SocialProof() {
  const stats = [
    { value: "5,0", label: "Nota no Google", note: "A máxima possível" },
    {
      value: site.rating.count.toLocaleString("pt-BR"),
      label: "Avaliações",
      note: "De clientes reais da loja",
    },
    { value: "100%", label: "Testados", note: "Antes de ir à venda" },
  ];

  return (
    <section
      className="relative bg-smoke py-24 sm:py-32"
      aria-labelledby="prova-titulo"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-20">
            <div>
              <p
                data-reveal
                className="text-xs font-bold tracking-[0.22em] text-gold-600 uppercase"
              >
                Reputação
              </p>
              <h2
                id="prova-titulo"
                data-reveal
                className="mt-4 font-display text-4xl font-extrabold tracking-[-0.03em] text-balance text-navy-800 sm:text-5xl"
              >
                1.440 avaliações.
                <span className="block text-slate-ink">
                  E a nota continua 5,0.
                </span>
              </h2>
              <p
                data-reveal
                className="mt-6 max-w-xl text-lg leading-relaxed text-slate-ink"
              >
                A nota máxima no Google não veio de campanha: veio de gente que
                testou o aparelho antes de comprar, entendeu o que estava
                levando e voltou para contar. Leia por conta própria — está tudo
                público.
              </p>

              <div
                data-reveal
                className="mt-9 flex flex-col gap-3 sm:flex-row"
              >
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <a
                    href={site.address.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ler avaliações no Google
                    <ArrowUpRight aria-hidden />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  <a
                    href={site.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <InstagramIcon />
                    {site.instagram.handle}
                  </a>
                </Button>
              </div>
            </div>

            <div
              data-reveal
              className="overflow-hidden rounded-[28px] bg-navy-950 p-8 sm:p-10"
            >
              <div className="flex items-baseline gap-4">
                <span className="font-display text-7xl leading-none font-extrabold tracking-[-0.04em] text-white">
                  5,0
                </span>
                <span
                  className="flex items-center gap-1 pb-2"
                  aria-hidden
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="size-5 fill-gold-300 text-gold-300"
                    />
                  ))}
                </span>
              </div>
              <p className="mt-3 text-white/60">
                Média de {site.rating.count.toLocaleString("pt-BR")} avaliações
                no Google
              </p>

              <dl className="mt-9 grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div key={stat.label} className="bg-navy-950 p-5">
                    <dd className="font-display text-3xl font-extrabold tracking-tight text-gold-300">
                      {stat.value}
                    </dd>
                    <dt className="mt-1.5 text-sm font-semibold text-white">
                      {stat.label}
                    </dt>
                    <p className="mt-0.5 text-[13px] text-white/45">
                      {stat.note}
                    </p>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
