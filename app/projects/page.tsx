import React from 'react'
import DropTextOnScroll from '@/components/ui/DropTextOnScroll';
import { ProjectSection } from '@/components/sections/projectCard';


const AboutPage = () => {
  return (
    <>
      <main>

         {/* HERO SECTION */}
         <section className="relative  h-[50vh] md:h-[60vh] xl:h-[82vh]  flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0"></div>

            <div className="absolute inset-0 bg-black"></div>
            
            <div className="absolute bottom-10 sm:bottom-15 left-4 sm:left-7 z-10 text-white px-4">
              <div>
                <DropTextOnScroll as="h1" className='font-baskervville text-[clamp(3rem,10vw,100px)] font-bold -mb-6 sm:-mb-10'>Selected Works</DropTextOnScroll>
                <p className='max-w-sm pt-8 sm:pt-10 text-sm sm:text-base'>A selection of work for brands with something to say, crafted to look sharp and read even sharper.</p>
              </div>
            </div>
        </section>

        {/* SECOND SECTION */}
        <div>
          <ProjectSection />
        </div>

      </main>
    </>
  )
}

export default AboutPage
