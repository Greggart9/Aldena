"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface TextSwapProps {
  text: string;
  className?: string;
  duration?: number;
  stagger?: number;
  /** "self" = hover the text itself, "parent" = hover the element it's inside (e.g. a button or link) */
  hoverOn?: "self" | "parent";
}

export default function TextSwap({
  text,
  className = "",
  duration = 0.5,
  stagger = 0.025,
  hoverOn = "self",
}: TextSwapProps) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const topRef = useRef<HTMLSpanElement>(null);
  const bottomRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const top = topRef.current;
    const bottom = bottomRef.current;
    if (!root || !top || !bottom) return;

    const target = hoverOn === "parent" ? root.parentElement : root;
    if (!target) return;

    // Respect reduced motion: no animation
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const topChars = top.querySelectorAll("[data-char]");
    const bottomChars = bottom.querySelectorAll("[data-char]");

    const ctx = gsap.context(() => {
      gsap.set(bottomChars, { yPercent: 100 });

      const tl = gsap.timeline({
        paused: true,
        defaults: { duration, ease: "power2.inOut" },
      });

      tl.to(topChars, { yPercent: -100, stagger }, 0);
      tl.to(bottomChars, { yPercent: 0, stagger }, 0);

      const enter = () => tl.play();
      const leave = () => tl.reverse();

      target.addEventListener("mouseenter", enter);
      target.addEventListener("mouseleave", leave);
      target.addEventListener("focusin", enter);
      target.addEventListener("focusout", leave);

      return () => {
        target.removeEventListener("mouseenter", enter);
        target.removeEventListener("mouseleave", leave);
        target.removeEventListener("focusin", enter);
        target.removeEventListener("focusout", leave);
      };
    }, root);

    return () => ctx.revert();
  }, [text, duration, stagger, hoverOn]);

  // Safely cast to string to prevent "value is not iterable" runtime errors
  const renderChars = (value: string | React.ReactNode) => {
    const stringValue = typeof value === "string" ? value : String(value ?? "");

    return [...stringValue].map((char, i) => (
      <span key={i} data-char className="inline-block">
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <span
      ref={rootRef}
      className={`relative inline-block overflow-hidden align-bottom whitespace-nowrap ${className}`}
    >
      {/* Screen readers read this once */}
      <span className="sr-only">{text}</span>

      {/* Visible layer (sets the size of the component) */}
      <span ref={topRef} aria-hidden="true" className="block">
        {renderChars(text)}
      </span>

      {/* Duplicate layer that slides in from below */}
      <span
        ref={bottomRef}
        aria-hidden="true"
        className="absolute left-0 top-0 block"
      >
        {renderChars(text)}
      </span>
    </span>
  );
}