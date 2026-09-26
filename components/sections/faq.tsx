'use client';

import { useState } from 'react';
import Image from 'next/image';
import RevealOnScroll from '../ui/RevealOnScroll';
import LiquidCarveButton from '../ui/LiquidCarveButton';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  imageSrc?: string;
  imageAlt?: string;
  contactHref?: string;
}

const faqs: FAQItem[] = [
  {
    question: 'What services do you actually offer?',
    answer:
      'We offer brand identity, visual design, web design, creative direction, and other design services tailored to your project.',
  },
  {
    question: 'How long does a typical project take?',
    answer:
      'Project timelines depend on the scope and complexity, but most projects typically take between 2–6 weeks from kickoff to delivery.',
  },
  {
    question: 'What do you need from me to get started?',
    answer:
      'A clear idea of what you need, your goals, any existing brand assets, and relevant references are usually enough to get the conversation started.',
  },
  {
    question: 'Do you offer ongoing support after launch?',
    answer:
      'Yes. Ongoing design, updates, improvements, and support can be arranged after the initial project is completed.',
  },
  {
    question: 'How does pricing and payment work?',
    answer:
      'Pricing is based on the scope of the project. After discussing your requirements, you will receive a clear project quote and payment structure before work begins.',
  },
  {
    question: 'Do you work with clients outside New York?',
    answer:
      'Absolutely. Most of the process can be handled remotely, so we can work together regardless of location.',
  },
];

export default function FAQSection({
  imageSrc = '/assets/faq-image.png',
  imageAlt = 'Workspace',
  contactHref = '#contact',
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section className="w-full bg-white px-5 py-16 sm:px-8 sm:py-24 md:px-[40px] md:py-32">
      <div className="mx-auto max-w-[1800px]">
        {/* Header */}
        <div className="mb-12 md:mb-20">
          <RevealOnScroll>
          <h2 className="max-w-[650px] text-[clamp(2.5rem,7vw,76px)] font-semibold leading-[1] tracking-[-0.055em] text-black">
            Your questions,
            <br />
            answered.
          </h2>
          </RevealOnScroll>
          <RevealOnScroll>
          <p className="mt-6 text-base text-zinc-600 ">
            A quick rundown of how we work and what to expect.
          </p>
          </RevealOnScroll>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 xl:gap-24 lg:justify-between bg-white text-black">
          {/* FAQ List */}
          <div className="w-full lg:w-[75%]">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <RevealOnScroll key={faq.question}>
                <div
                  className="border-b border-zinc-200"
                >
                  <button
                    type="button"
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-8 py-5 text-left "
                  >
                    <span className="font-sans text-[16px] font-semibold leading-tight tracking-[-0.025em] text-black sm:text-[19px]">
                      {faq.question}
                    </span>

                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center font-sans text-2xl font-extralight leading-none text-zinc-400 transition-transform duration-300 ${
                        isOpen ? 'rotate-45' : 'rotate-0'
                      }`}
                    >
                      +
                    </span>
                  </button>

                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-500 ease-in-out ${
                      isOpen
                        ? 'grid-rows-[1fr] opacity-100'
                        : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-lg pb-4 pr-10 font-sans text-sm leading-5 text-zinc-500 sm:text-base">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
                </RevealOnScroll>
              );
            })}
          </div>

          {/* Right Side */}
          <div className="w-full lg:w-[25%] lg:sticky lg:top-32 lg:self-start">
            <RevealOnScroll>
              <div className="flex flex-col gap-8">

                {/* Image */}
                <div className="relative h-[280px] sm:h-[345px] w-full overflow-hidden">
                  <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 345px"
                    className="object-cover brightness-110 contrast-75"
                  />
                  <div className="grain" />
                </div>

                {/* CTA */}
                <div className="flex flex-col gap-4">
                  <p className="font-sans text-base leading-6 text-black">
                    Still looking for answers or need a good chat?
                  </p>
                  <LiquidCarveButton
                    variant="black"
                    label="CONTACT US"
                    link="/contact"
                    newTab={false}
                  />
                </div>

              </div>
            </RevealOnScroll>
          </div>

        </div>
      </div>
    </section>
  );
}