import { BadgeCheck, HandCoins, Repeat2, ShieldCheck, Smartphone, Wrench } from "lucide-react";

const items = [
  { icon: ShieldCheck, label: "Garantia da loja" },
  { icon: Wrench, label: "Revisão interna e externa" },
  { icon: Smartphone, label: "Você testa antes de comprar" },
  { icon: Repeat2, label: "Avaliamos seu aparelho na troca" },
  { icon: HandCoins, label: "Condições especiais à vista" },
  { icon: BadgeCheck, label: "Só vende após aprovação técnica" },
];

/**
 * Infinite marquee. The track is duplicated and translated -50%, so the loop
 * is seamless; the copy is `aria-hidden` to keep it out of the a11y tree.
 * Freezes entirely under `prefers-reduced-motion` (see globals.css).
 */
export function TrustBar() {
  return (
    <section
      aria-label="Diferenciais da loja"
      className="relative border-y border-white/8 bg-navy-950 py-5"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-linear-to-r from-navy-950 to-transparent sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-linear-to-l from-navy-950 to-transparent sm:w-32" />

      <div className="flex overflow-hidden">
        <div className="marquee-track flex w-max shrink-0 items-center">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              aria-hidden={copy === 1}
              className="flex shrink-0 items-center"
            >
              {items.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-2.5 px-6 text-sm font-medium whitespace-nowrap text-white/60 sm:px-8"
                >
                  <Icon className="size-4 shrink-0 text-gold-300" aria-hidden />
                  {label}
                  <span
                    aria-hidden
                    className="ml-6 size-1 rounded-full bg-white/20 sm:ml-8"
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
