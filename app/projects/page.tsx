import React from "react";
import DropTextOnScroll from "@/components/ui/DropTextOnScroll";
import { ProjectSection } from "@/components/sections/projectCard";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const ProjectsPage = () => {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[65vh] sm:h-[68vh] md:h-[72vh] xl:h-[85vh] flex items-end justify-start overflow-hidden">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
        <div className="relative z-10 w-full px-5 sm:px-8 md:px-11 pb-10 sm:pb-14 md:pb-16 text-white">
          <DropTextOnScroll as="h1" className="font-baskervville text-[clamp(2.8rem,9vw,100px)] font-bold leading-none tracking-tight mb-4 sm:mb-6">
            Selected Works
          </DropTextOnScroll>
          <p className="max-w-xs sm:max-w-sm text-sm sm:text-base text-white/85 leading-relaxed">
            A selection of work for brands with something to say, crafted to look sharp and read even sharper.
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <div>
        <ProjectSection />
      </div>
    </main>
  );
};

export default ProjectsPage;
