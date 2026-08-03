/**
 * Single source of truth for every store fact rendered on the page.
 * Everything here came from the owner: Google Business listing, the Instagram
 * highlights, and the logo. Nothing is invented — if a value is unknown it is
 * absent rather than guessed.
 */

export const site = {
  name: "World Cell",
  tagline: "iPhones seminovos com garantia, em Diadema",
  url: "https://worldcell.com.br",

  phone: {
    display: "(11) 91648-4900",
    e164: "+5511916484900",
    digits: "5511916484900",
  },

  instagram: {
    handle: "@worldcell.sp",
    url: "https://www.instagram.com/worldcell.sp/",
  },

  address: {
    venue: "Dentro do Mercado Atacadão",
    street: "Av. Antônio Piranga, 2085",
    district: "Canhema",
    city: "Diadema",
    state: "SP",
    zip: "09942-000",
    country: "BR",
    full: "Av. Antônio Piranga, 2085 — Canhema, Diadema - SP, 09942-000",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=World+Cell+Av.+Ant%C3%B4nio+Piranga+2085+Canhema+Diadema+SP",
    mapsEmbedUrl:
      "https://www.google.com/maps?q=Av.+Ant%C3%B4nio+Piranga,+2085+-+Canhema,+Diadema+-+SP,+09942-000&output=embed",
  },

  rating: {
    value: 5.0,
    count: 1440,
  },

  /** Google Business hours. Sunday is closed. */
  hours: [
    { label: "Segunda-feira", short: "Seg", open: "09:00", close: "19:00" },
    { label: "Terça-feira", short: "Ter", open: "09:00", close: "19:00" },
    { label: "Quarta-feira", short: "Qua", open: "09:00", close: "19:00" },
    { label: "Quinta-feira", short: "Qui", open: "09:00", close: "19:00" },
    { label: "Sexta-feira", short: "Sex", open: "09:00", close: "19:00" },
    { label: "Sábado", short: "Sáb", open: "09:00", close: "19:00" },
    { label: "Domingo", short: "Dom", open: null, close: null },
  ] as const,

  hoursSummary: "Segunda a sábado, das 9h às 19h",
} as const;

/** Pre-fills the WhatsApp composer so the lead arrives with context attached. */
export function whatsappUrl(message: string) {
  return `https://wa.me/${site.phone.digits}?text=${encodeURIComponent(message)}`;
}

export const wa = {
  general: whatsappUrl(
    "Olá! Vim pelo site da World Cell e quero saber mais sobre os iPhones disponíveis.",
  ),
  catalog: whatsappUrl(
    "Olá! Vim pelo site e gostaria de ver a lista de iPhones disponíveis com valores.",
  ),
  tradeIn: whatsappUrl(
    "Olá! Quero avaliar o meu aparelho para dar como parte do pagamento em um iPhone.",
  ),
  model: (model: string) =>
    whatsappUrl(
      `Olá! Vim pelo site e tenho interesse no ${model}. Pode me passar o valor e as condições?`,
    ),
};

/** JSON-LD consumed by Google for the local pack / rich results. */
export function localBusinessJsonLd() {
  const dayMap: Record<string, string> = {
    "Segunda-feira": "Monday",
    "Terça-feira": "Tuesday",
    "Quarta-feira": "Wednesday",
    "Quinta-feira": "Thursday",
    "Sexta-feira": "Friday",
    Sábado: "Saturday",
    Domingo: "Sunday",
  };

  return {
    "@context": "https://schema.org",
    "@type": "MobilePhoneStore",
    name: site.name,
    description: `${site.name} — iPhones seminovos e novos com garantia, teste antes de comprar e avaliação do seu aparelho na troca. ${site.address.venue}, ${site.address.city}/${site.address.state}.`,
    url: site.url,
    telephone: site.phone.e164,
    image: `${site.url}/logo.png`,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.zip,
      addressCountry: site.address.country,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.rating.value,
      reviewCount: site.rating.count,
      bestRating: 5,
    },
    sameAs: [site.instagram.url],
    openingHoursSpecification: site.hours
      .filter((d) => d.open !== null)
      .map((d) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: dayMap[d.label],
        opens: d.open,
        closes: d.close,
      })),
  };
}
