import { MapPin, Phone } from "lucide-react";

import { InstagramIcon } from "@/components/brand/icons";
import { Wordmark } from "@/components/brand/wordmark";
import { site } from "@/lib/site";

const nav = [
  { href: "#modelos", label: "Modelos" },
  { href: "#garantia", label: "Garantia" },
  { href: "#troca", label: "Troca" },
  { href: "#duvidas", label: "Dúvidas" },
  { href: "#loja", label: "A loja" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/8 bg-navy-950 pt-16 pb-28 sm:pb-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <Wordmark tone="light" className="h-11" />
            <p className="mt-6 max-w-sm leading-relaxed text-white/55">
              iPhones novos e seminovos com garantia, revisão completa e
              avaliação do seu aparelho na troca. Loja física em Diadema, no
              ABC paulista.
            </p>
          </div>

          <nav aria-label="Rodapé">
            <h2 className="text-xs font-bold tracking-[0.2em] text-gold-300 uppercase">
              Navegar
            </h2>
            <ul className="mt-5 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="-my-1 inline-flex min-h-11 items-center text-white/60 transition-colors duration-[130ms] hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-xs font-bold tracking-[0.2em] text-gold-300 uppercase">
              Contato
            </h2>
            <ul className="mt-5 space-y-4">
              <li>
                <a
                  href={`tel:${site.phone.e164}`}
                  className="flex min-h-11 items-start gap-3 py-1 text-white/60 transition-colors hover:text-white"
                >
                  <Phone className="mt-0.5 size-4.5 shrink-0" aria-hidden />
                  {site.phone.display}
                </a>
              </li>
              <li>
                <a
                  href={site.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 items-start gap-3 py-1 text-white/60 transition-colors hover:text-white"
                >
                  <InstagramIcon className="mt-0.5 size-4.5 shrink-0" />
                  {site.instagram.handle}
                </a>
              </li>
              <li>
                <a
                  href={site.address.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 items-start gap-3 py-1 text-white/60 transition-colors hover:text-white"
                >
                  <MapPin className="mt-0.5 size-4.5 shrink-0" aria-hidden />
                  <span>
                    {site.address.street}
                    <br />
                    {site.address.district}, {site.address.city}/
                    {site.address.state}
                  </span>
                </a>
              </li>
            </ul>
            <p className="mt-6 text-sm text-white/40">{site.hoursSummary}</p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/8 pt-7 text-sm text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. Todos os direitos
            reservados.
          </p>
          <p>
            Imagens e nomes de produtos são marcas registradas da Apple Inc.
            Esta loja não possui vínculo com a Apple.
          </p>
        </div>
      </div>
    </footer>
  );
}
