/**
 * Models the store works with, plus factual Apple specs for each.
 *
 * No prices and no stock counts live here on purpose: the owner didn't supply
 * them, and inventory for seminovos turns over constantly. Every card sends the
 * lead to WhatsApp for the current value instead of showing a number that could
 * be wrong.
 */

export type PhoneModel = {
  id: string;
  name: string;
  line: "Pro" | "Padrão" | "Plus/Max";
  chip: string;
  screen: string;
  camera: string;
  storages: string[];
  highlight?: string;
  /** Body/frame tint used for the card artwork. */
  tint: string;
};

export const models: PhoneModel[] = [
  {
    id: "16-pro-max",
    name: "iPhone 16 Pro Max",
    line: "Pro",
    chip: "A18 Pro",
    screen: '6,9" Super Retina XDR',
    camera: "Tripla 48 MP · Fusion",
    storages: ["256 GB", "512 GB", "1 TB"],
    highlight: "Topo de linha",
    tint: "#8f8b84",
  },
  {
    id: "16",
    name: "iPhone 16",
    line: "Padrão",
    chip: "A18",
    screen: '6,1" Super Retina XDR',
    camera: "Dupla 48 MP · Fusion",
    storages: ["128 GB", "256 GB", "512 GB"],
    tint: "#2f4f6b",
  },
  {
    id: "15-pro-max",
    name: "iPhone 15 Pro Max",
    line: "Pro",
    chip: "A17 Pro",
    screen: '6,7" Super Retina XDR',
    camera: "Tripla 48 MP · zoom 5x",
    storages: ["256 GB", "512 GB", "1 TB"],
    highlight: "Mais procurado",
    tint: "#8b8378",
  },
  {
    id: "15",
    name: "iPhone 15",
    line: "Padrão",
    chip: "A16 Bionic",
    screen: '6,1" Super Retina XDR',
    camera: "Dupla 48 MP",
    storages: ["128 GB", "256 GB", "512 GB"],
    tint: "#2f5f52",
  },
  {
    id: "14-pro",
    name: "iPhone 14 Pro",
    line: "Pro",
    chip: "A16 Bionic",
    screen: '6,1" com Dynamic Island',
    camera: "Tripla 48 MP",
    storages: ["128 GB", "256 GB", "512 GB"],
    tint: "#4a3f63",
  },
  {
    id: "14",
    name: "iPhone 14",
    line: "Padrão",
    chip: "A15 Bionic",
    screen: '6,1" Super Retina XDR',
    camera: "Dupla 12 MP",
    storages: ["128 GB", "256 GB"],
    tint: "#1f3a5f",
  },
  {
    id: "13",
    name: "iPhone 13",
    line: "Padrão",
    chip: "A15 Bionic",
    screen: '6,1" Super Retina XDR',
    camera: "Dupla 12 MP",
    storages: ["128 GB", "256 GB"],
    highlight: "Melhor custo-benefício",
    tint: "#3d4a6b",
  },
  {
    id: "12",
    name: "iPhone 12",
    line: "Padrão",
    chip: "A14 Bionic",
    screen: '6,1" Super Retina XDR',
    camera: "Dupla 12 MP",
    storages: ["64 GB", "128 GB", "256 GB"],
    tint: "#5b6b7d",
  },
];
