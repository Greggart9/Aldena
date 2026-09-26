"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RevealOnScroll from "../ui/RevealOnScroll";
import DropTextOnScroll from "../ui/DropTextOnScroll";

gsap.registerPlugin(ScrollTrigger);

type TeamMember = {
  name: string;
  role: string;
  bio: string;
  image: string;
  socials?: {
    label: string;
    href: string;
  }[];
};

const teamMembers: TeamMember[] = [
  {
    name: "Aldena Rhodes",
    role: "FOUNDER & CREATIVE DIRECTOR",
    bio: "Aldena started the studio after a decade leading brand work across London and Berlin. She sets the creative vision for every project, happiest when a rough idea clicks into a clear, ownable identity. Outside the studio, she collects vintage type specimens.",
    image: "/assets/asset30.png",
    socials: [
      { label: "in", href: "#" },
      { label: "f", href: "#" },
      { label: "𝕏", href: "#" },
    ],
  },

  {
    name: "Maya Carter",
    role: "BRAND STRATEGIST",
    bio: "Maya turns research, culture, and sharp observations into strategies that give brands a clear point of view. She is always looking for the idea that makes everything else fall into place.",
    image: "/assets/asset43.png",
    socials: [
      { label: "in", href: "#" },
      { label: "f", href: "#" },
      { label: "𝕏", href: "#" },
    ],
  },

  {
    name: "Leo Bennett",
    role: "DESIGN DIRECTOR",
    bio: "Leo brings ideas to life through typography, art direction, and visual systems. His work balances expressive details with identities that remain clear and useful across every touchpoint.",
    image: "/assets/asset42.png",
    socials: [
      { label: "in", href: "#" },
      { label: "f", href: "#" },
      { label: "𝕏", href: "#" },
    ],
  },

  {
    name: "Nora Hayes",
    role: "DIGITAL DESIGNER",
    bio: "Nora creates digital experiences where motion, interaction, and visual design work as one. She cares about the tiny details that make an interface feel considered rather than simply polished.",
    image: "/assets/asset44.png",
    socials: [
      { label: "in", href: "#" },
      { label: "f", href: "#" },
      { label: "𝕏", href: "#" },
    ],
  },
];

export default function TeamSection() {
  const containerRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const ctx = gsap.context(() => {

      const teamCards = gsap.utils.toArray<HTMLElement>(".team-card");

      teamCards.forEach((card) => {

        const image = card.querySelector<HTMLElement>(
          ".card-image-inner"
        );

        if (image) {
          gsap.fromTo(
            image,
            {
              scale: 1.3,
            },
            {
              scale: 1,
              duration: 1.4,
              ease: "power3.out",
              clearProps: "transform",

              scrollTrigger: {
                trigger: card,
                start: "top 75%",
                toggleActions: "play none none none",
              },
            }
          );
        }

        const text = card.querySelectorAll<HTMLElement>(
          ".team-copy"
        );

        if (text.length) {
          gsap.fromTo(
            text,
            {
              y: 30,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              stagger: 0.12,
              ease: "power3.out",

              scrollTrigger: {
                trigger: card,
                start: "top 70%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full bg-white px-6 py-20 text-black md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-[1680px]">

        <header className="flex flex-col items-center text-center">
          <DropTextOnScroll as="h2" className="max-w-5xl text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[0.95] tracking-[-0.055em]">
            The team behind Aldena.
          </DropTextOnScroll>

          <RevealOnScroll>
            <p className="mt-7 max-w-2xl text-base font-medium leading-6 text-zinc-400 ">
              A small studio of designers, strategists, and makers
              shaping every brand we touch.
            </p>
          </RevealOnScroll>
        </header>

        <div className="mt-20 border-t border-black/10">

          {teamMembers.map((member, index) => (
            <article
              key={member.name}
              className="
                team-card
                grid
                
                grid-cols-1
                items-center
                gap-12
                border-b
                border-black/10
                py-10

                lg:grid-cols-[minmax(260px,1fr)_minmax(348px,465px)_minmax(260px,1fr)]
                lg:gap-16
                lg:py-7">
              <RevealOnScroll>
              <div
                className="
                  team-copy
                  max-w-[330px]
                  text-[15px]
                  leading-[1.35]
                  font-medium
                  text-zinc-600
                ">
                <p>{member.bio}</p>
              </div>
              </RevealOnScroll>

              
              <div
                className="relative aspect-[4/3] w-full overflow-hidden bg-black/5">
                <div
                    className="
                      relative
                      w-full
                      h-full
                      overflow-hidden
                      bg-black/5
                    "
                  >
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 465px"
                    className="card-image-inner object-cover object-center"
                    style={{ transformOrigin: 'center center' }}
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-black/5"></div>
                  <div className="grain opacity-10"></div>
                </div>
              </div>
              
               
               <RevealOnScroll>
              <div
                className="
                  team-copy
                  flex
                  flex-col
                  lg:ml-22
                ">

                <h3
                  className="
                    font-serif
                    text-4xl
                    leading-none
                    tracking-[-0.035em]
                  ">
                  {member.name}
                </h3>

                <p
                  className="
                    mt-4
                    text-xs
                    font-semibold
                    tracking-[-0.01em]
                    text-black/45
                  ">
                  {member.role}
                </p>

                {member.socials && (
                  <div className="mt-9 flex items-center gap-3">

                    {member.socials.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        aria-label={`${member.name} ${social.label}`}
                        className="
                          flex
                          h-12
                          w-12
                          items-center
                          justify-center
                          rounded-full
                          bg-black
                          text-sm
                          font-medium
                          text-white
                          transition-transform
                          duration-300
                          hover:scale-105
                        ">
                        {social.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
              </RevealOnScroll>

            </article>
          ))}

        </div>
      </div>
    </section>
  );
}