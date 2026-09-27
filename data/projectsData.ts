export interface ProjectData {
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  type: string;
  year: string;
  client: string;
  liveUrl: string;
  imagePair1: [string, string]; // [leftImage, rightImage]
  challenge: {
    heading: string;
    paragraph1: string;
    paragraph2: string;
  };
  imagePair2: [string, string];
  outcome: {
    heading: string;
    paragraph1: string;
    paragraph2: string;
  };
}

export const projectsData: Record<string, ProjectData> = {
  "aster-bloom": {
    title: "Aster Bloom",
    subtitle:
      "A botanical identity for a skincare brand rooted in slow, seasonal rituals.",
    description:
      "Aster Bloom needed a brand that felt as considered as its formulations. We built an identity around pressed-botanical marks and a soft, tactile palette. The result feels calm, premium, and unmistakably its own.",
    heroImage: "/assets/asset01.webp",
    type: "BRANDING",
    year: "2025",
    client: "Aster Bloom Co.",
    liveUrl: "#",
    imagePair1: ["/assets/asset62.webp", "/assets/asset64.webp"],
    challenge: {
      heading: "A living identity for Aster Bloom",
      paragraph1:
        "We designed the logotype and botanical marks to breathe, shifting subtly across packaging so no two products feel identical. The system stays recognizable while giving each formulation its own quiet personality.",
      paragraph2:
        "Every touchpoint was drawn from real pressed flora, then refined into a flexible library. That grounding kept the brand honest and made the premium price feel earned rather than styled on.",
    },
    imagePair2: ["/assets/asset65.webp", "/assets/asset63.webp"],
    outcome: {
      heading: "Rituals, not products",
      paragraph1:
        "The tone of voice was written to slow readers down, framing each product as part of a daily ritual instead of a transaction. Copy and imagery move at the same unhurried pace.",
      paragraph2:
        "We paired muted typography with generous space so the packaging felt like an object worth keeping. That restraint is what makes the shelf presence feel expensive.",
    },
  },
  "nova-grid": {
    title: "Nova Grid",
    subtitle:
      "A crisp visual system for a data platform that wanted to feel human.",
    description:
      "Nova Grid was drowning in charts and jargon. We built a clean, confident design language that turns dense data into something approachable. It now reads as clear as it is capable.",
    heroImage: "/assets/asset06.webp",
    type: "DESIGN",
    year: "2024",
    client: "NOVA GRID",
    liveUrl: "#",
    imagePair1: ["/assets/asset09.webp", "/assets/asset55.webp"],
    challenge: {
      heading: "Clarity first",
      paragraph1:
        "We rebuilt the interface language around a strict grid and a restrained palette, letting the data itself carry the color. Removing decoration made complex dashboards finally feel legible.",
      paragraph2:
        "Type and spacing were tuned for long working sessions, reducing the visual noise that used to tire people out. The product now feels calm even when the numbers are not.",
    },
    imagePair2: ["/assets/asset12.webp", "/assets/asset56.webp"],
    outcome: {
      heading: "A warmer machine",
      paragraph1:
        "To soften the technical edge, we introduced friendly illustration and plain-language microcopy across the platform. It made a powerful tool feel like it was on the user's side.",
      paragraph2:
        "We documented everything as a living system so the team could scale without drifting. Consistency became the thing that made Nova Grid feel trustworthy.",
    },
  },
  "marrow-coffee": {
    title: "Marrow Coffee",
    subtitle:
      "A bold, honest identity for a roaster obsessed with origin and craft.",
    description:
      "Marrow wanted a brand as direct as their espresso. We leaned into heavy type, raw texture, and unfiltered storytelling. The identity feels warm, confident, and built to last.",
    heroImage: "/assets/asset07.webp",
    type: "BRANDING",
    year: "2025",
    client: "MARROW ROASTERS",
    liveUrl: "#",
    imagePair1: ["/assets/asset61.webp", "/assets/asset59.webp"],
    challenge: {
      heading: "Bold to the bone",
      paragraph1:
        "We anchored the identity in a heavyweight wordmark and a stripped-back palette that reads instantly across a busy cafe counter. It gives Marrow presence without shouting.",
      paragraph2:
        "Textured, tactile packaging references the roasting process itself, so the brand feels made rather than manufactured. That craft cue is what earns a second look on the shelf.",
    },
    imagePair2: ["/assets/asset60.webp", "/assets/asset57.webp"],
    outcome: {
      heading: "Origin as story",
      paragraph1:
        "Each bag carries the farm, the altitude, and the hands behind the harvest, turning packaging into a small piece of storytelling. Transparency became the brand's whole personality.",
      paragraph2:
        "We built a flexible label system so new single-origins slot in without a redesign. It keeps the range feeling fresh while staying unmistakably Marrow.",
    },
  },
  "fern-field": {
    title: "Fern Field",
    subtitle:
      "A content system that lets an architecture studio speak in its own quiet voice.",
    description:
      "Fern Studio had beautiful work but no words to match. We shaped a content strategy and editorial voice around their process. Now the writing feels as intentional as the buildings.",
    heroImage: "/assets/asset46.webp",
    type: "CONTENT",
    year: "2024",
    client: "FERN STUDIO.",
    liveUrl: "#",
    imagePair1: ["/assets/asset58.webp", "/assets/asset53.webp"],
    challenge: {
      heading: "Words for the work",
      paragraph1:
        "We developed an editorial voice that mirrors the studio's restraint, favoring precise, unadorned language over industry jargon. It lets the architecture stay the loudest thing in the room.",
      paragraph2:
        "Project narratives were restructured around process and place, giving each build a clear story arc. Clients finally understood the thinking, not just the outcome.",
    },
    imagePair2: ["/assets/asset67.webp", "/assets/asset66.webp"],
    outcome: {
      heading: "A publishing rhythm",
      paragraph1:
        "We set up a lightweight content calendar so the studio could share work without it becoming a burden. Consistency turned an occasional post into a genuine audience.",
      paragraph2:
        "Every piece was templated for tone and structure, keeping quality high even when time was short. The voice now stays steady no matter who is writing.",
    },
  },
  "halden-press": {
    title: "Halden Press",
    subtitle:
      "An editorial voice and content strategy for an independent literary press.",
    description:
      "Halden Press needed to sound like the books it champions. We built a literary content system with a distinct, unhurried voice. It turned casual browsers into a loyal readership.",
    heroImage: "/assets/asset47.webp",
    type: "CONTENT",
    year: "2025",
    client: "HALDEN PRESS.",
    liveUrl: "#",
    imagePair1: ["/assets/asset69.webp", "/assets/asset70.webp"],
    challenge: {
      heading: "A voice worth reading",
      paragraph1:
        "We crafted a house voice that treats every blurb and newsletter as a small piece of literature in itself. Readers started staying for the writing, not just the catalog.",
      paragraph2:
        "Tone guidelines kept that voice consistent across editors and seasons, so the press always sounds like one considered person. That coherence is what built trust.",
    },
    imagePair2: ["/assets/asset58.webp", "/assets/asset68.webp"],
    outcome: {
      heading: "A publishing rhythm",
      paragraph1:
        "We set up a lightweight content calendar so the studio could share work without it becoming a burden. Consistency turned an occasional post into a genuine audience.",
      paragraph2:
        "Every piece was templated for tone and structure, keeping quality high even when time was short. The voice now stays steady no matter who is writing.",
    },
  },
  "ostara-wine": {
    title: "Ostara Wine",
    subtitle:
      "An expressive label system for a natural wine label that refuses to sit still.",
    description:
      "Ostara wanted labels as alive as their wine. We designed an ever-changing illustrative system tied to each vintage. Every bottle now feels collectible.",
    heroImage: "/assets/asset51.webp",
    type: "DESIGN",
    year: "2023",
    client: "OSTARA.",
    liveUrl: "#",
    imagePair1: ["/assets/asset71.webp", "/assets/asset72.webp"],
    challenge: {
      heading: "A label that moves",
      paragraph1:
        "We built an illustrative system that shifts with every vintage, so each release feels like a limited edition worth keeping. The bottle became part of the appeal.",
      paragraph2:
        "A flexible frame holds the wildness together, keeping the range coherent even as the artwork changes. Structure is what lets the expression run free.",
    },
    imagePair2: ["/assets/asset74.webp", "/assets/asset73.webp"],
    outcome: {
      heading: "Playful, not precious",
      paragraph1:
        "The tone leans irreverent and warm, inviting curious drinkers rather than intimidating them. Natural wine finally felt approachable on the shelf.",
      paragraph2:
        "We designed the system to work at small scale and in dim bars, where these bottles actually get chosen. Legibility kept the personality from getting lost.",
    },
  },
};
