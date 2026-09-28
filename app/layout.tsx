import type { Metadata } from "next";
import FuturisticNavbar from "@/components/ui/navbar";
import MouseEffects from "@/components/ui/MouseEffects";
import SmoothScroll from "@/components/ui/SmoothScroll";
import Footer from "@/components/sections/footer";
import PageTransition from "@/components/ui/PageTransition";
import CustomCursor from "@/components/ui/CustomCursor"
import FloatingBottomNav from "@/components/ui/FloatingBottomNav";
import "./globals.css";

import {
  Bodoni_Moda,
  Instrument_Serif,
  Playfair_Display,
  Baskervville,
} from "next/font/google";

export const metadata: Metadata = {
  metadataBase: new URL("https://aldena.oluwadamilare.xyz"),

  title: {
    default: "Aldena — Editorial Creative Agency & Digital Brand Showcase",
    template: "%s | Aldena Studio",
  },

  description:
    "Aldena is an editorial-grade creative agency and digital design studio crafting timeless visual identities, digital products, and motion-driven web experiences.",

  keywords: [
    "Aldena",
    "Creative Agency",
    "Digital Studio",
    "Brand Identity",
    "UI/UX Design",
    "Web Development",
    "Next.js Portfolio",
    "GSAP Motion",
    "Editorial Design",
  ],

  authors: [{ name: "Aldena Studio" }],
  creator: "Aldena Studio",
  publisher: "Aldena Studio",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aldena.oluwadamilare.xyz",
    title: "Aldena — Editorial Creative Agency & Digital Brand Showcase",
    description:
      "Aldena is an editorial-grade creative agency and digital design studio crafting timeless visual identities, digital products, and motion-driven web experiences.",
    siteName: "Aldena Studio",
    images: [
      {
        url: "/assets/asset51.webp",
        width: 1200,
        height: 630,
        alt: "Aldena — Editorial Creative Agency & Digital Brand Showcase",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Aldena — Editorial Creative Agency & Digital Brand Showcase",
    description:
      "Aldena is an editorial-grade creative agency and digital design studio crafting timeless visual identities, digital products, and motion-driven web experiences.",
    images: ["/assets/asset51.webp"],
  },

  icons: {
    icon: "/favicon.ico",
  },
};

const baskervville = Baskervville({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-baskervville",
  display: "swap",
});

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bodoni.variable} ${instrument.variable} ${playfair.variable} ${baskervville.variable}`}
    >
      <body suppressHydrationWarning className="w-full overflow-x-hidden">
        <SmoothScroll />
        <CustomCursor />

        <FuturisticNavbar />

        {/* Global application width */}
        <div className="mx-auto w-full max-w-[1920px] overflow-x-hidden">
          <PageTransition>{children}</PageTransition>

          <Footer />
        </div>

        {/* Global Click Effects Overlay */}
        <div className="pointer-events-none fixed inset-0 z-[9999]">
          <MouseEffects
            interactionMode="burst"
            color="#ffffffff"
            showLabel={false}
          />
        </div>

        <FloatingBottomNav />
      </body>
    </html>
  );
}