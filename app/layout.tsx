import FuturisticNavbar from "@/components/ui/navbar"; 
import MouseEffects from "@/components/ui/MouseEffects";
import SmoothScroll from "@/components/ui/SmoothScroll";
import Footer from "@/components/sections/footer";
import PageTransition from "@/components/ui/PageTransition";
import FloatingBottomNav from "@/components/ui/FloatingBottomNav"; // Import added here
import "./globals.css";
import { Bodoni_Moda, Instrument_Serif, Playfair_Display } from 'next/font/google';
import { Baskervville } from 'next/font/google';

const baskervville = Baskervville({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-baskervville',
  display: 'swap',
});

const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  variable: '--font-bodoni',
  display: 'swap',
});

const instrument = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-instrument',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bodoni.variable} ${instrument.variable} ${playfair.variable} ${baskervville.variable}`}>
      <body suppressHydrationWarning>
        <SmoothScroll />
        
        {/* Place the navbar here so it stays fixed across all pages */}
        <FuturisticNavbar />

        {/* The PageTransition handles the slide-up elevator effect on route changes */}
        <PageTransition>
          {children}
        </PageTransition>

        {/* Global Click Effects Overlay */}
        <div className="fixed inset-0 z-[9999] pointer-events-none">
          <MouseEffects 
            interactionMode="burst" 
            color="#ffffffff"  
            showLabel={false} 
          />
        </div>
          
        {/* Footer */}
        <Footer />

        {/* Floating Bottom Navigation */}
        <FloatingBottomNav />
      </body>
    </html>
  );
}