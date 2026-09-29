export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  socials?: {
    label: string;
    href: string;
  }[];
};

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Aldena Rhodes",
    role: "FOUNDER & CREATIVE DIRECTOR",
    bio: "Aldena started the studio after a decade leading brand work across London and Berlin. She sets the creative vision for every project, happiest when a rough idea clicks into a clear, ownable identity. Outside the studio, she collects vintage type specimens.",
    image: "/assets/asset30.webp",
    socials: [
      { label: "in", href: "#" },
      { label: "f", href: "#" },
      { label: "𝕏", href: "#" },
    ],
  },
  {
    id: "2",
    name: "Maya Carter",
    role: "BRAND STRATEGIST",
    bio: "Maya turns research, culture, and sharp observations into strategies that give brands a clear point of view. She is always looking for the idea that makes everything else fall into place.",
    image: "/assets/asset43.webp",
    socials: [
      { label: "in", href: "#" },
      { label: "f", href: "#" },
      { label: "𝕏", href: "#" },
    ],
  },
  {
    id: "3",
    name: "Leo Bennett",
    role: "DESIGN DIRECTOR",
    bio: "Leo brings ideas to life through typography, art direction, and visual systems. His work balances expressive details with identities that remain clear and useful across every touchpoint.",
    image: "/assets/asset42.webp",
    socials: [
      { label: "in", href: "#" },
      { label: "f", href: "#" },
      { label: "𝕏", href: "#" },
    ],
  },
  {
    id: "4",
    name: "Nora Hayes",
    role: "DIGITAL DESIGNER",
    bio: "Nora creates digital experiences where motion, interaction, and visual design work as one. She cares about the tiny details that make an interface feel considered rather than simply polished.",
    image: "/assets/asset44.webp",
    socials: [
      { label: "in", href: "#" },
      { label: "f", href: "#" },
      { label: "𝕏", href: "#" },
    ],
  },
];
