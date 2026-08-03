"use client";

import { useEffect, useState } from "react";
import { Clock, MapPin, Navigation, Phone } from "lucide-react";

import { InstagramIcon } from "@/components/brand/icons";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { site, wa } from "@/lib/site";

/**
 * Reads "now" in the store's own timezone rather than the visitor's, so a
 * customer browsing from another state still sees the shop's real status.
 * Returns null on the server pass to keep hydration deterministic.
 */
function useStoreStatus() {
  const [status, setStatus] = useState<{
    todayIndex: number;
    isOpen: boolean;
  } | null>(null);

  useEffect(() => {
    const compute = () => {
      const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Sao_Paulo",
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).formatToParts(new Date());

      const get = (type: string) =>
        parts.find((p) => p.type === type)?.value ?? "";

      const weekdayOrder = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      const todayIndex = weekdayOrder.indexOf(get("weekday"));
      const minutes = Number(get("hour")) * 60 + Number(get("minute"));

      const today = site.hours[todayIndex];
      const isOpen = Boolean(
        today?.open && minutes >= 9 * 60 && minutes < 19 * 60,
      );

      setStatus({ todayIndex, isOpen });
    };

    compute();
    const id = window.setInterval(compute, 60_000);
    return () => window.clearInterval(id);
  }, []);

  return status;
}

export function Store() {
  const status = useStoreStatus();

  return (
    <section
      id="loja"
      className="relative bg-navy-950 py-24 sm:py-32"
      aria-labelledby="loja-titulo"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <header className="max-w-2xl">
            <p
              data-reveal
              className="text-xs font-bold tracking-[0.22em] text-gold-300 uppercase"
            >
              A loja
            </p>
            <h2
              id="loja-titulo"
              data-reveal
              className="mt-4 font-display text-4xl font-extrabold tracking-[-0.03em] text-balance text-white sm:text-5xl"
            >
              Loja física, dentro do Atacadão de Diadema.
            </h2>
            <p
              data-reveal
              className="mt-5 text-lg leading-relaxed text-white/65"
            >
              Não somos anúncio de rede social: tem endereço, vitrine e gente
              para te atender. Venha testar o aparelho pessoalmente.
            </p>
          </header>

          <div className="mt-14 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
            {/* Info column */}
            <div className="grid gap-4">
              <div
                data-reveal
                className="rounded-[24px] border border-white/10 bg-white/[0.04] p-7"
              >
                <span className="grid size-11 place-items-center rounded-2xl border border-gold-300/25 bg-gold-400/10">
                  <MapPin className="size-5 text-gold-300" aria-hidden />
                </span>
                <h3 className="mt-5 font-display text-xl font-bold text-white">
                  Endereço
                </h3>
                <address className="mt-2.5 leading-relaxed text-white/65 not-italic">
                  {site.address.venue}
                  <br />
                  {site.address.street}
                  <br />
                  {site.address.district}, {site.address.city} —{" "}
                  {site.address.state}
                  <br />
                  CEP {site.address.zip}
                </address>
                <Button asChild variant="ghostLight" className="mt-5">
                  <a
                    href={site.address.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Navigation aria-hidden />
                    Traçar rota
                  </a>
                </Button>
              </div>

              <div
                data-reveal
                className="rounded-[24px] border border-white/10 bg-white/[0.04] p-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="grid size-11 place-items-center rounded-2xl border border-gold-300/25 bg-gold-400/10">
                    <Clock className="size-5 text-gold-300" aria-hidden />
                  </span>

                  {/* Live status. Renders only after mount, so no hydration gap. */}
                  {status && (
                    <span
                      className={cn(
                        "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[13px] font-semibold",
                        status.isOpen
                          ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                          : "border-white/15 bg-white/5 text-white/60",
                      )}
                    >
                      <span
                        aria-hidden
                        className={cn(
                          "size-2 rounded-full",
                          status.isOpen ? "bg-emerald-400" : "bg-white/40",
                        )}
                      />
                      {status.isOpen ? "Aberto agora" : "Fechado agora"}
                    </span>
                  )}
                </div>

                <h3 className="mt-5 font-display text-xl font-bold text-white">
                  Horário de funcionamento
                </h3>

                <ul className="mt-4 space-y-0.5">
                  {site.hours.map((day, i) => {
                    const isToday = status?.todayIndex === i;
                    return (
                      <li
                        key={day.label}
                        className={cn(
                          "flex items-center justify-between rounded-lg px-3 py-2 text-[15px]",
                          isToday
                            ? "bg-white/8 font-semibold text-white"
                            : "text-white/60",
                        )}
                      >
                        <span>{day.label}</span>
                        <span className={day.open ? "" : "text-white/35"}>
                          {day.open ? `${day.open}–${day.close}` : "Fechado"}
                        </span>
                      </li>
                    );
                  })}
                </ul>

                <p className="mt-4 px-3 text-[13px] text-white/40">
                  Feriados podem ter horário diferente — confirme no WhatsApp.
                </p>
              </div>

              <div
                data-reveal
                className="grid gap-3 rounded-[24px] border border-white/10 bg-white/[0.04] p-7 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"
              >
                <a
                  href={`tel:${site.phone.e164}`}
                  className="group flex items-center gap-3.5 rounded-2xl p-3 transition-colors hover:bg-white/5"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-full border border-white/15">
                    <Phone className="size-4.5 text-gold-300" aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[13px] text-white/45">
                      Telefone
                    </span>
                    <span className="block font-semibold text-white">
                      {site.phone.display}
                    </span>
                  </span>
                </a>

                <a
                  href={site.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3.5 rounded-2xl p-3 transition-colors hover:bg-white/5"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-full border border-white/15">
                    <InstagramIcon className="size-4.5 text-gold-300" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[13px] text-white/45">
                      Instagram
                    </span>
                    <span className="block truncate font-semibold text-white">
                      {site.instagram.handle}
                    </span>
                  </span>
                </a>
              </div>
            </div>

            {/* Map */}
            <div
              data-reveal
              className="min-h-[26rem] overflow-hidden rounded-[24px] border border-white/10 lg:min-h-full"
            >
              <iframe
                src={site.address.mapsEmbedUrl}
                title={`Mapa com a localização da ${site.name}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="h-full min-h-[26rem] w-full border-0 grayscale-[35%] contrast-[1.05]"
              />
            </div>
          </div>

          <div
            data-reveal
            className="mt-4 flex flex-col items-start gap-5 rounded-[28px] surface-gold p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9"
          >
            <div>
              <h3 className="font-display text-2xl font-extrabold tracking-tight text-navy-900 sm:text-3xl">
                Quer garantir o modelo antes de vir?
              </h3>
              <p className="mt-2 text-navy-900/75">
                {site.hoursSummary}. Mandamos fotos reais e separamos o aparelho
                para você.
              </p>
            </div>
            <Button
              asChild
              size="lg"
              className="w-full shrink-0 bg-navy-900 text-white hover:bg-navy-800 sm:w-auto"
            >
              <a href={wa.general} target="_blank" rel="noopener noreferrer">
                Chamar no WhatsApp
              </a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
