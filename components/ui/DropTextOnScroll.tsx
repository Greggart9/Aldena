'use client';

import { Fragment, isValidElement, type ReactNode } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

type Tag = 'div' | 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4';

interface DropTextOnScrollProps {
  children: ReactNode;
  className?: string;
  /** Element to render, e.g. "h1" or "p" */
  as?: Tag;
  /** Delay before the animation starts (seconds) */
  delay?: number;
  /** Time between each character (seconds) */
  stagger?: number;
  /** Cap on total stagger time so long text doesn't drag on (seconds) */
  maxStaggerTotal?: number;
}

function extractText(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractText).join('');
  if (isValidElement<{ children?: ReactNode }>(node)) {
    return extractText(node.props.children);
  }
  return '';
}

export default function DropTextOnScroll({
  children,
  className = '',
  as = 'div',
  delay = 0,
  stagger = 0.02,
  maxStaggerTotal = 1,
}: DropTextOnScrollProps) {
  const reduceMotion = useReducedMotion();

  const text = extractText(children).trim();
  const words = text.split(/\s+/).filter(Boolean);
  const charCount = words.join('').length || 1;
  const perChar = Math.min(stagger, maxStaggerTotal / charCount);

  const MotionTag = motion[as] as typeof motion.div;

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: perChar, delayChildren: delay },
    },
  };

  const charVariants: Variants = {
    // Reduced motion: fade only, no movement
    hidden: reduceMotion ? { opacity: 0 } : { opacity: 0, y: '-100%' },
    visible: {
      opacity: 1,
      y: '0%',
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={containerVariants}
      className={`relative ${className}`}
    >
      {/* Screen readers read the text once, as normal words */}
      <span className="sr-only">{text}</span>

      <span aria-hidden="true">
        {words.map((word, wordIndex) => (
          <Fragment key={wordIndex}>
            {/* nowrap keeps a word together; the real space below allows line breaks */}
            <span className="inline-block whitespace-nowrap">
              {[...word].map((char, charIndex) => (
                <span
                  key={charIndex}
                  // Padding + negative margin stops descenders/ascenders being clipped
                  // without changing the line height
                  className="inline-block overflow-hidden align-top py-[0.1em] -my-[0.1em]"
                >
                  <motion.span variants={charVariants} className="inline-block">
                    {char}
                  </motion.span>
                </span>
              ))}
            </span>
            {wordIndex < words.length - 1 && ' '}
          </Fragment>
        ))}
      </span>
    </MotionTag>
  );
}