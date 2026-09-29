export interface Service {
  category: string;
  title: string;
  description: string;
  price: string;
  serviceNumber: string;
  bgImage: string;
  hoverImage: string;
}

export const servicesData: Service[] = [
  {
    category: "WHAT WE OFFER",
    title: "Brand Identity",
    description:
      "A complete visual identity built from strategy up — logo suite, type and color systems, and a flexible design language. We deliver a brand that stays recognizable everywhere while giving each touchpoint room to breathe. Includes a full guidelines document so your team can apply it with confidence.",
    price: "$6,000",
    serviceNumber: "SERVICE 01",
    bgImage: "/assets/asset08.webp",
    hoverImage: "/assets/asset10.webp",
  },
  {
    category: "WHAT WE OFFER",
    title: "Visual Design",
    description:
      "Design work that turns your brand into real, usable assets — packaging, web layouts, social templates, and marketing collateral. We keep every piece coherent so your brand feels considered at every scale. Ideal for studios who have an identity and need it brought to life.",
    price: "$3,500",
    serviceNumber: "SERVICE 02",
    bgImage: "/assets/asset09.webp",
    hoverImage: "/assets/asset11.webp",
  },
  {
    category: "WHAT WE OFFER",
    title: "Content & Voice",
    description:
      "An editorial voice and content strategy that make your brand sound as intentional as it looks. We define tone guidelines, shape your key messaging, and set up a publishing rhythm your team can sustain. Great for brands with strong visuals but no words to match.",
    price: "$2,500",
    serviceNumber: "SERVICE 03",
    bgImage: "/assets/asset12.webp",
    hoverImage: "/assets/asset14.webp",
  },
  {
    category: "WHAT WE OFFER",
    title: "Brand Refresh",
    description:
      "A focused evolution for brands that are close but not quite there — sharpening your identity, tightening the system, and modernizing without losing what people already recognize. We audit what's working, then refine the rest. A lower-commitment path to a brand that feels current.",
    price: "$4,000",
    serviceNumber: "SERVICE 04",
    bgImage: "/assets/asset13.webp",
    hoverImage: "/assets/asset15.webp",
  },
];
