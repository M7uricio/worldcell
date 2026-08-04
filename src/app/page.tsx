import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsappFab } from "@/components/whatsapp-fab";
import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { Models } from "@/components/sections/models";
import { Guarantee } from "@/components/sections/guarantee";
import { TradeIn } from "@/components/sections/trade-in";
import { SocialProof } from "@/components/sections/social-proof";
import { Faq } from "@/components/sections/faq";
import { Store } from "@/components/sections/store";

/**
 * Section order follows the "Hero + Social proof + CTA" landing pattern:
 * objection-handling (guarantee, trade-in, FAQ) sits between the offer and the
 * final ask, and social proof always precedes a CTA rather than following it.
 */
export default function Home() {
  return (
    <>
      <SiteHeader />

      <main id="conteudo" className="flex-1">
        <Hero />
        <TrustBar />
        <Models />
        <Guarantee />
        <TradeIn />
        <SocialProof />
        <Faq />
        <Store />
      </main>

      <SiteFooter />
      <WhatsappFab />
    </>
  );
}
