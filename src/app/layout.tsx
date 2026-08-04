import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";

import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { localBusinessJsonLd, site } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — iPhones seminovos com garantia em Diadema`,
    template: `%s · ${site.name}`,
  },
  description:
    "iPhones novos e seminovos com garantia, revisão interna e externa e teste antes de comprar. Avaliamos o seu aparelho na troca. Dentro do Mercado Atacadão, Canhema — Diadema/SP. Nota 5,0 no Google.",
  keywords: [
    "iPhone seminovo Diadema",
    "loja de iPhone Diadema",
    "comprar iPhone Canhema",
    "troca de iPhone São Paulo",
    "iPhone com garantia ABC",
    "World Cell Diadema",
  ],
  applicationName: site.name,
  authors: [{ name: site.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — iPhones seminovos com garantia em Diadema`,
    description:
      "Teste o aparelho antes de comprar, dê o seu usado na troca e leve com garantia. Nota 5,0 no Google com 1.440 avaliações.",
    images: [{ url: "/logo.png", width: 1352, height: 1145, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — iPhones seminovos com garantia`,
    description:
      "iPhones testados, com garantia e avaliação do seu aparelho na troca. Diadema/SP.",
    images: ["/logo.png"],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/logo.png", apple: "/logo.png" },
};

export const viewport: Viewport = {
  themeColor: "#05071c",
  width: "device-width",
  initialScale: 1,
  // Never cap zoom — pinch-zoom is an accessibility requirement.
  maximumScale: 5,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          // Static, author-controlled object — no user input reaches this.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd()),
          }}
        />
        <SmoothScrollProvider />
        {children}
      </body>
    </html>
  );
}
