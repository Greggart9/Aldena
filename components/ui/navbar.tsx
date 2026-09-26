"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import TextSwap from "./FlipButton";
import { motion, AnimatePresence } from "framer-motion";

export default function FuturisticNavbar() {
  const [isAtTop, setIsAtTop] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isSlugPage =
    pathname.split("/").filter(Boolean).length === 2 &&
    pathname.startsWith("/projects/");

  useEffect(() => {
    const updateVisibility = () => setIsAtTop(window.scrollY <= 8);
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Close menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const navItems = [
    { name: "HOME", href: "/" },
    { name: "ABOUT", href: "/about" },
    { name: "PROJECTS", href: "/projects" },
    { name: "CONTACT", href: "/contact" },
    { name: "RESUME", href: "/resume" },
  ];

  return (
    <>
      {/* ── DESKTOP NAV ─────────────────────────────────────── */}
      <header
        className={`fixed top-6 left-1/2 z-50 w-full max-w-5xl -translate-x-1/2 px-6 transition-transform duration-300 ${
          isAtTop
            ? "translate-y-0"
            : "-translate-y-[calc(100%+1.5rem)] pointer-events-none"
        }`}
      >
        <nav className="relative flex items-center justify-center">
          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                scroll={false}
                className={`relative px-2 py-2 text-[11px] font-mono font-bold ${
                  isSlugPage ? "text-black" : "text-white"
                } uppercase tracking-wider duration-300}`}
              >
                <TextSwap text={item.name} hoverOn="parent" />
              </Link>
            ))}
          </div>
          <div className="px-2 hidden md:block">
            {/* Add a CTA button here if needed */}
          </div>
        </nav>
      </header>

      {/* ── MOBILE HAMBURGER BUTTON ──────────────────────────── */}
      <button
        onClick={() => setMobileOpen((o) => !o)}
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
        className={`fixed top-5 right-5 z-[9999] flex md:hidden h-10 w-10 flex-col items-center justify-center gap-[6px] transition-opacity duration-300 ${
          isAtTop || mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <span
          className={`block h-[1.5px] w-6 bg-white origin-center transition-all duration-300 ${
            mobileOpen ? "translate-y-[7.5px] rotate-45" : ""
          }`}
        />
        <span
          className={`block h-[1.5px] w-6 bg-white transition-all duration-300 ${
            mobileOpen ? "opacity-0 scale-x-0" : ""
          }`}
        />
        <span
          className={`block h-[1.5px] w-6 bg-white origin-center transition-all duration-300 ${
            mobileOpen ? "-translate-y-[7.5px] -rotate-45" : ""
          }`}
        />
      </button>

      {/* ── MOBILE FULL-SCREEN OVERLAY ───────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[9998] flex flex-col justify-center items-start px-8 bg-black md:hidden"
          >
            {/* Grain overlay */}
            <div className="grain pointer-events-none absolute inset-0 opacity-40" />

            {/* Nav links */}
            <nav className="relative z-10 flex flex-col gap-2 w-full">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{
                    duration: 0.35,
                    delay: 0.1 + i * 0.07,
                    ease: [0.76, 0, 0.24, 1],
                  }}
                >
                  <Link
                    href={item.href}
                    scroll={false}
                    onClick={() => setMobileOpen(false)}
                    className="group flex items-baseline gap-3 py-3 border-b border-white/10"
                  >
                    <span className="text-white/30 font-mono text-xs tabular-nums">
                      0{i + 1}
                    </span>
                    <span className="text-white font-baskervville text-[clamp(2rem,10vw,3.5rem)] leading-none tracking-tight transition-opacity duration-200 group-hover:opacity-50">
                      {item.name.charAt(0) + item.name.slice(1).toLowerCase()}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Footer */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5, duration: 0.3 }}
              className="relative z-10 mt-12 text-white/30 font-mono text-[10px] uppercase tracking-widest"
            >
              Aldena Studio © 2025
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}