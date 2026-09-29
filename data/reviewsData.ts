export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  image: string;
}

export const testimonialsData: Testimonial[] = [
  {
    quote:
      "From day one they understood exactly who we wanted to become. The identity they crafted feels bold, timeless, and unmistakably ours-it has completely changed how people recognise and remember us.",
    name: "Marcus Bennett",
    role: "Founder of Northlight Studio",
    image: "/assets/asset16.webp",
  },
  {
    quote:
      "Every screen they touched came back sharper, cleaner, and more considered. The visual system they built gives our product a sense of polish and clarity we simply could not achieve on our own.",
    name: "Elena Ruiz",
    role: "Head of Product at Cadence Labs",
    image: "/assets/asset17.webp",
  },
  {
    quote:
      "They found the words we had been struggling to say for years. Our messaging finally sounds human, confident, and consistent everything we publish now feels like it speaks with one clear voice.",
    name: "Priya Nair",
    role: "Brand Lead at Veritas Group",
    image: "/assets/asset18.webp",
  },
];
