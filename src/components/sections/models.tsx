import { ArrowUpRight, Info } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { models, type PhoneModel } from "@/lib/models";
import { wa } from "@/lib/site";

export function Models() {
  return (
    <section
      id="modelos"
      className="relative bg-navy-950 py-24 sm:py-32"
      aria-labelledby="modelos-titulo"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <header className="max-w-3xl">
            <p
              data-reveal
              className="text-xs font-bold tracking-[0.22em] text-gold-300 uppercase"
            >
              Modelos
            </p>
            <h2
              id="modelos-titulo"
              data-reveal
              className="mt-4 font-display text-4xl font-extrabold tracking-[-0.03em] text-balance text-white sm:text-5xl"
            >
              Do 12 ao 16 Pro Max, todos revisados.
            </h2>
            <p
              data-reveal
              className="mt-5 text-lg leading-relaxed text-white/65"
            >
              Trabalhamos com as linhas abaixo em versões novas e seminovas.
              Cada aparelho passa por revisão interna e externa e só vai para a
              vitrine depois da aprovação técnica.
            </p>
          </header>

          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {models.map((model) => (
              <li key={model.id} data-reveal>
                <ModelCard model={model} />
              </li>
            ))}
          </ul>

          <div
            data-reveal
            className="mt-10 flex flex-col items-start gap-5 rounded-[28px] border border-white/10 bg-white/[0.04] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8"
          >
            <p className="flex items-start gap-3 text-sm leading-relaxed text-white/60">
              <Info className="mt-0.5 size-4.5 shrink-0 text-gold-300" aria-hidden />
              <span>
                Estoque, cores e capacidades mudam toda semana — e os valores
                acompanham. Chame no WhatsApp para receber a lista atualizada de
                hoje, com fotos reais de cada aparelho.
              </span>
            </p>
            <Button asChild variant="gold" size="lg" className="shrink-0">
              <a href={wa.catalog} target="_blank" rel="noopener noreferrer">
                Pedir lista com valores
                <ArrowUpRight aria-hidden />
              </a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ModelCard({ model }: { model: PhoneModel }) {
  return (
    <a
      href={wa.model(model.name)}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex h-full gap-5 overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.03] p-5 transition-all duration-[240ms] ease-[cubic-bezier(0.2,0,0,1)] hover:-translate-y-1.5 hover:border-gold-300/40 hover:bg-white/[0.06] sm:flex-col sm:gap-0"
    >
      {/* Device silhouette, drawn rather than photographed — no stock imagery.
          Sits beside the copy on phones so the list doesn't become eight
          full-height cards, and stacks above it from `sm` up. */}
      <div
        aria-hidden
        className="relative h-38 w-21 shrink-0 self-center rounded-[15px] p-[3px] transition-transform duration-[380ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 group-hover:scale-[1.04] sm:order-2 sm:mx-auto sm:mt-4 sm:mb-6"
        style={{
          background: `linear-gradient(150deg, ${model.tint}, color-mix(in oklab, ${model.tint} 55%, #05071c))`,
        }}
      >
        <div className="relative h-full w-full rounded-[12px] bg-linear-to-b from-navy-900 to-navy-950">
          <span className="absolute top-1.5 left-1/2 h-1.5 w-6 -translate-x-1/2 rounded-full bg-black/70" />
          <span className="absolute top-4 left-2.5 size-3 rounded-full bg-white/12" />
          <span className="absolute top-4 left-6.5 size-3 rounded-full bg-white/12" />
          {model.line === "Pro" && (
            <span className="absolute top-8 left-2.5 size-3 rounded-full bg-white/12" />
          )}
          <span className="absolute inset-x-0 bottom-0 h-1/2 rounded-b-[12px] bg-[radial-gradient(ellipse_at_bottom,rgba(201,162,39,0.16),transparent_70%)]" />
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col sm:contents">
      {/* Kept in normal flow rather than absolutely positioned: the label
          length varies per model and an absolute pill clips inside the card. */}
      <p className="flex h-6 items-center sm:order-1">
        {model.highlight && (
          <span className="rounded-full border border-gold-300/40 bg-gold-400/12 px-2.5 py-1 text-[11px] font-bold tracking-wide text-gold-200 uppercase">
            {model.highlight}
          </span>
        )}
      </p>

      <h3 className="mt-2 font-display text-lg font-bold tracking-tight text-white sm:order-3 sm:mt-0">
        {model.name}
      </h3>

      <dl className="mt-3 space-y-1.5 text-[13px] text-white/55 sm:order-4">
        <div>
          <dt className="sr-only">Chip</dt>
          <dd className="text-white/70">{model.chip}</dd>
        </div>
        <div>
          <dt className="sr-only">Tela</dt>
          <dd>{model.screen}</dd>
        </div>
        <div>
          <dt className="sr-only">Câmera</dt>
          <dd>{model.camera}</dd>
        </div>
      </dl>

      <ul
        className="mt-4 flex flex-wrap gap-1.5 sm:order-5"
        aria-label="Capacidades"
      >
        {model.storages.map((storage) => (
          <li
            key={storage}
            className="rounded-full border border-white/12 px-2.5 py-1 text-[11px] font-semibold text-white/70"
          >
            {storage}
          </li>
        ))}
      </ul>

      <span className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-gold-300 transition-colors group-hover:text-gold-200 sm:order-6 sm:mt-6">
        Consultar valor
        <ArrowUpRight
          className="size-4 transition-transform duration-[240ms] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden
        />
      </span>
      </div>
    </a>
  );
}
