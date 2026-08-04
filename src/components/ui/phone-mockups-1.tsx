import React from "react";
import {
  ImageItem,
  PhoneCarousel,
} from "@/components/ui/phone-mockups-1-utils/phone-carousel";

/**
 * 21st.dev — @solaceui/phone-mockups-1, wired to World Cell's own screens
 * instead of the demo app screenshots.
 */
const worldCellScreens: ImageItem[] = [
  {
    src: "/screens/catalogo.svg",
    alt: "Catálogo de iPhones disponíveis na World Cell",
  },
  {
    src: "/screens/laudo.svg",
    alt: "Laudo técnico do aparelho aprovado na revisão",
  },
  {
    src: "/screens/troca.svg",
    alt: "Avaliação do seu aparelho usado como parte do pagamento",
  },
  {
    src: "/screens/avaliacoes.svg",
    alt: "Nota 5,0 no Google com 1.440 avaliações",
  },
];

export default function PhoneMockupBasic() {
  return <PhoneCarousel images={worldCellScreens} />;
}
