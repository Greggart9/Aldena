import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { projectsData } from '@/data/projectsData';
import DropTextOnScroll from "@/components/ui/DropTextOnScroll";
import EditorialProjectCard from "@/components/sections/projectCard";
import RevealOnScroll from '@/components/ui/RevealOnScroll';

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return Object.keys(projectsData).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData[slug];
  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: project.title,
    description: project.subtitle,
    openGraph: {
      title: `${project.title} | Aldena Studio`,
      description: project.subtitle,
      images: [
        {
          url: project.heroImage,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Aldena Studio`,
      description: project.subtitle,
      images: [project.heroImage],
    },
  };
}

export default async function ProjectTemplatePage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projectsData[slug];

  // 1. Calculate the next project dynamically before rendering
  const slugs = Object.keys(projectsData);
  const currentIndex = slugs.indexOf(slug);
  const nextSlug = slugs[(currentIndex + 1) % slugs.length];
  const nextProject = projectsData[nextSlug];

  if (!project) {
    return (
      <main className="min-h-screen bg-white text-black flex flex-col items-center justify-center p-6">
        <h1 className="text-3xl font-bold mb-4 font-serif">Project Not Found</h1>
        <p className="text-zinc-500 mb-8 font-mono text-sm">The project &ldquo;{slug}&rdquo; does not exist.</p>
        <Link 
          href="/projects" 
          className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white text-xs font-mono uppercase tracking-widest hover:bg-zinc-800 transition-colors"
        >
          <ArrowLeft size={14} /> Back to Projects
        </Link>
      </main>
    );
  }

  return (
    <main className="h-fit text-black pt-15 md:pt-32">
      <article className="mx-auto space-y-16">
        
        {/* 1. Navigation Back */}
        <div className="px-6 md:px-11 ">
          <Link 
            href="/projects" 
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-zinc-600 hover:text-zinc-400 transition-colors"
          >
            <ArrowLeft size={14} /> Back to Projects
          </Link>
        </div>

        <section className="flex flex-col gap-16 px-6 md:px-11 -mt-10">
            <div className="flex flex-col lg:flex-row justify-between gap-6">
                <span className="flex">
                  <DropTextOnScroll as='p' className='font-serif text-[2.5rem] md:text-7xl'>
                    {project.title}
                  </DropTextOnScroll>
                </span>

                 <div className="w-full lg:w-[600px] max-w-full lg:pr-20">
                    <RevealOnScroll><p className='text-xl sm:text-[25px] font-bold leading-7 sm:leading-8 tracking-tight'>{project.subtitle}</p></RevealOnScroll>
                    <RevealOnScroll><p className='text-zinc-500 text-sm leading-6 font-medium pt-4 sm:pt-5'>{project.description}</p></RevealOnScroll>
                 </div>
            </div>

            <div className="relative h-[200px] sm:h-[400px] xl:h-[800px] w-full">
                <Image
                  fill
                  src={project.heroImage}
                  alt={`${project.title} Hero`}
                  sizes="100vw"
                  className="object-cover object-center"
                />
            </div>

            <div className="w-full max-w-2xl space-y-8 self-end">
                <RevealOnScroll>
                <div className="border-t border-zinc-300">
                    <div className="flex items-center justify-between py-4 border-b border-zinc-300 font-mono text-sm tracking-wider">
                      <span className="text-zinc-600 font-semibold text-[13px]">TYPE</span>
                      <span className="text-black font-bold">{project.type}</span>
                    </div>
                    <div className="flex items-center justify-between py-4 border-b border-zinc-300 font-mono text-sm tracking-wider">
                      <span className="text-zinc-600 font-semibold text-[13px]">YEAR</span>
                      <span className="text-black font-bold">{project.year}</span>
                    </div>
                    <div className="flex items-center justify-between py-4 border-b border-zinc-300 font-mono text-sm tracking-wider">
                      <span className="text-zinc-600 font-semibold text-[13px]">CLIENT</span>
                      <span className="text-black font-bold">{project.client}</span>
                    </div>
                </div>
                </RevealOnScroll>

                <div>
                    <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-4 bg-black text-white font-mono text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors"
                    >
                    VIEW LIVE SITE
                    </a>
                </div>
            </div>
        </section>

        <section className="px-6 md:px-11">
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative h-[350px] sm:h-[500px] xl:h-[800px] w-full"> 
                    <Image
                      fill
                      src={project.imagePair1[0]}
                      alt={`${project.title} gallery 1`}
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover object-center"
                    />
                </div>
                <div className="relative h-[350px] sm:h-[500px] xl:h-[800px] w-full">
                    <Image
                      fill
                      src={project.imagePair1[1]}
                      alt={`${project.title} gallery 2`}
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover object-center"
                    />
                </div>
            </div>
            <RevealOnScroll>
            <div className="flex flex-col lg:flex-row justify-between gap-8 py-10 sm:py-15">
                <div><p className='text-2xl font-serif text-zinc-500'>The Challenge</p></div>

                <div className="w-full max-w-[1000px]">
                    <span><p className='font-semibold text-2xl sm:text-3xl'>{project.challenge.heading}</p></span>
                    <span className='text-zinc-500 font-medium'>
                        <p className='pt-3 leading-relaxed'>{project.challenge.paragraph1}</p>
                        <p className='pt-5 leading-relaxed'>{project.challenge.paragraph2}</p>
                    </span>
                </div>
            </div>
            </RevealOnScroll>

            <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative h-[350px] sm:h-[500px] xl:h-[800px] w-full">
                    <Image
                      fill
                      src={project.imagePair2[0]}
                      alt={`${project.title} gallery 3`}
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover object-center"
                    />
                </div>
                <div className="relative h-[350px] sm:h-[500px] xl:h-[800px] w-full">
                    <Image
                      fill
                      src={project.imagePair2[1]}
                      alt={`${project.title} gallery 4`}
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover object-center"
                    />
                </div>
            </div>
            <RevealOnScroll>
            <div className="flex flex-col lg:flex-row justify-between gap-8 py-10 sm:py-15">
                <div><p className='text-2xl font-serif text-zinc-500'>The Outcome</p></div>

                <div className="w-full max-w-[1000px]">
                    <span><p className='font-semibold text-2xl sm:text-3xl'>{project.outcome.heading}</p></span>
                    <span className='text-zinc-500 font-medium'>
                        <p className='pt-3 leading-relaxed'>{project.outcome.paragraph1}</p>
                        <p className='pt-5 leading-relaxed'>{project.outcome.paragraph2}</p>
                    </span>
                </div>
            </div>
            </RevealOnScroll>
        </section>
          
        {/* Next Project Intro Banner */}
        <section className="">
            <div className="flex items-center justify-center bg-[#f4f4f4] w-full py-16 sm:py-24 px-6">
                <div className="w-full max-w-[380px] text-center sm:text-left">
                  <RevealOnScroll><p className='text-4xl sm:text-6xl font-bold tracking-tighter'>Next Project.</p></RevealOnScroll>
                  <RevealOnScroll><p className='text-sm sm:text-base font-medium text-gray-500 pt-3 sm:pt-5 leading-5 sm:leading-6'>Keep exploring—here’s another project from our studio, shaped by the same care and craft.</p></RevealOnScroll>
                </div>
            </div>

            {/* NEXT PROJECT / EDITORIAL CARD */}
                <EditorialProjectCard
                  backgroundImage={nextProject.imagePair1?.[0] || nextProject.heroImage}
                  image={nextProject.heroImage}
                  href={`/projects/${nextSlug}`}
                  title={nextProject.title}
                  scrollingText={nextProject.title}
                  description={nextProject.subtitle}
                  year={nextProject.year}
                />
        </section>



      </article>
    </main>
  );
}