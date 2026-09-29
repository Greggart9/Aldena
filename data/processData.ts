export interface ProcessItem {
  id: string;
  number: string;
  title: string;
  duration: string;
  description: string;
}

export const processData: ProcessItem[] = [
  {
    id: "1",
    number: "001",
    title: "Discovery",
    duration: "1 - 2 WEEKS",
    description:
      "We start by getting under the skin of your business — interviewing stakeholders, auditing your current brand, and mapping the competitive landscape. The goal is a clear, shared understanding of where you are and where you want to go.",
  },
  {
    id: "2",
    number: "002",
    title: "Strategy",
    duration: "1 WEEK",
    description:
      "With the research in hand, we define the strategic foundation — your positioning, messaging, and the core narrative that sets you apart. This becomes the blueprint that guides every creative and design decision that follows.",
  },
  {
    id: "3",
    number: "003",
    title: "Design",
    duration: "2 - 3 WEEKS",
    description:
      "This is where the vision takes shape. We explore directions, refine the details, and craft a distinctive visual identity — from typography and colour to the finer moments that make the work feel unmistakably yours.",
  },
  {
    id: "4",
    number: "004",
    title: "Development",
    duration: "2 - 4 WEEKS",
    description:
      "We bring the designs to life with clean, performant build work. Every interaction is considered and every breakpoint tested, so the final product feels as good as it looks across every device and screen.",
  },
  {
    id: "5",
    number: "005",
    title: "Launch",
    duration: "1 WEEK",
    description:
      "With everything polished and approved, we prepare for a smooth launch. We handle the final checks, hand over the assets and guidelines, and make sure you are set up to carry the work forward with confidence.",
  },
];
