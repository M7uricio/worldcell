import {
  BatteryCharging,
  HandCoins,
  Repeat2,
  ScanSearch,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import DisplayCards from "@/components/ui/display-cards";

const stackCards = [
  {
    icon: <ShieldCheck className="size-4 text-gold-200" aria-hidden />,
    title: "Garantia",
    description: "Cobertura da loja",
    date: "Em todo aparelho",
    className:
      "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-white/10 before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-navy-950/60 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <ScanSearch className="size-4 text-gold-200" aria-hidden />,
    title: "Aprovação",
    description: "Revisão completa",
    date: "Antes de ir à vitrine",
    className:
      "[grid-area:stack] translate-x-10 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-white/10 before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-navy-950/60 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Sparkles className="size-4 text-gold-200" aria-hidden />,
    title: "Teste livre",
    description: "Você aprova, aí fecha",
    date: "Na loja, sem pressa",
    className:
      "[grid-area:stack] translate-x-20 translate-y-20 hover:translate-y-10",
  },
];

const bento = [
  {
    icon: ScanSearch,
    title: "Revisão interna e externa",
    body: "Todo seminovo passa por testes completos antes de ser colocado à venda. Só é aprovado quem passa em tudo — e é por isso que conseguimos oferecer garantia.",
    span: "sm:col-span-2",
  },
  {
    icon: BatteryCharging,
    title: "Saúde da bateria informada",
    body: "Você sabe a porcentagem real antes de decidir. Nada de surpresa depois.",
    span: "",
  },
  {
    icon: Sparkles,
    title: "Teste tudo antes de fechar",
    body: "Câmera, áudio, bateria, tela, Face ID. Transparência total: o aparelho é seu para testar ali mesmo.",
    span: "",
  },
  {
    icon: Repeat2,
    title: "Seu aparelho vale desconto",
    body: "Avaliamos o seu na hora e você usa o valor como parte do pagamento para garantir um modelo mais novo.",
    span: "",
  },
  {
    icon: HandCoins,
    title: "À vista tem condição especial",
    body: "Pagamentos à vista sempre ganham condições melhores. Fale com a gente e faça as contas.",
    span: "",
  },
];

export function Guarantee() {
  return (
    <section
      id="garantia"
      className="relative bg-navy-900 py-24 sm:py-32"
      aria-labelledby="garantia-titulo"
    >
      <div aria-hidden className="rule-soft absolute inset-x-0 top-0 h-px" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-12">
            <div>
              <p
                data-reveal
                className="text-xs font-bold tracking-[0.22em] text-gold-300 uppercase"
              >
                Confiança
              </p>
              <h2
                id="garantia-titulo"
                data-reveal
                className="mt-4 font-display text-4xl font-extrabold tracking-[-0.03em] text-balance text-white sm:text-5xl"
              >
                Seminovo confiável não é sorte.
                <span className="block text-gold-gradient">É processo.</span>
              </h2>
              <p
                data-reveal
                className="mt-6 max-w-xl text-lg leading-relaxed text-white/65"
              >
                A pergunta que mais recebemos é se celular seminovo é confiável.
                A resposta é sim — porque nenhum aparelho chega até você sem
                passar por testes completos, revisão interna e externa e
                aprovação técnica. É exatamente por isso que oferecemos
                garantia.
              </p>
            </div>

            {/* 21st.dev display-cards. The stack's own cards translate right and
                down, so the wrapper reserves that offset as padding — otherwise
                the last card runs past the column edge and gets clipped. */}
            <div
              data-reveal
              className="flex justify-center overflow-hidden pt-4 pr-20 pb-24 sm:pr-24 sm:pb-20"
            >
              <DisplayCards cards={stackCards} />
            </div>
          </div>

          <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {bento.map(({ icon: Icon, title, body, span }) => (
              <li
                key={title}
                data-reveal
                className={`group rounded-[24px] border border-white/10 bg-white/[0.035] p-7 transition-all duration-[240ms] ease-[cubic-bezier(0.2,0,0,1)] hover:-translate-y-1 hover:border-gold-300/35 hover:bg-white/[0.06] ${span}`}
              >
                <span className="grid size-11 place-items-center rounded-2xl border border-gold-300/25 bg-gold-400/10">
                  <Icon className="size-5 text-gold-300" aria-hidden />
                </span>
                <h3 className="mt-5 font-display text-xl font-bold tracking-tight text-white">
                  {title}
                </h3>
                <p className="mt-2.5 leading-relaxed text-white/60">{body}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
