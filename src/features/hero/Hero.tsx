import { motion } from "motion/react";

import profilePhoto from "@/assets/profile-no-bg.webp";
import { buttonVariants } from "@/components/ui/button";
import { resume } from "@/data/resume";
import { staggerItemFromLeft } from "@/lib/motion";
import { cn } from "@/lib/utils";

function Hero() {
  const { personalInfo, summary } = resume;

  return (
    <motion.div
      variants={staggerItemFromLeft}
      className="flex h-full min-h-0 min-w-0 flex-col items-center gap-4 overflow-hidden rounded-tl-[3.5rem] rounded-tr-[2.5rem] rounded-br-[2.5rem] rounded-bl-[2.5rem] bg-solar-hero p-5 text-center text-solar-hero-foreground shadow-[0_0_0_0_var(--solar-hero)] transition-shadow duration-300 hover:shadow-[0_0_140px_-10px_var(--solar-hero)] sm:p-10 lg:flex-row lg:items-center lg:gap-10 lg:text-left"
    >
      <div className="relative h-20 w-20 shrink-0 xs:h-28 xs:w-28 sm:h-40 sm:w-40 md:h-48 md:w-48">
        <div className="animate-blob scale-300 absolute inset-0 bg-solar-hero-foreground/20" />
        <div className="animate-blob-reverse scale-150 absolute inset-0 bg-solar-experience-foreground/10" />
        <img
          src={profilePhoto}
          alt={personalInfo.name}
          className="relative h-full w-full scale-125 object-contain drop-shadow-xl transition-transform duration-500 hover:-translate-y-2 hover:scale-150"
        />
      </div>

      <div className="flex min-w-0 flex-col items-center gap-2 lg:items-start">
        <h1 className="font-heading text-3xl font-bold tracking-tight xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl">
          {personalInfo.name}
        </h1>
        <p className="mt-1 max-w-xl text-sm text-solar-hero-foreground/70 sm:text-base lg:line-clamp-3">
          <strong>{personalInfo.title}</strong> {summary}
        </p>
        <div className="mt-2 flex gap-3">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noreferrer"
            className={cn(
              buttonVariants({ variant: "default" }),
              "scale-100 bg-solar-hero-foreground/10 text-current shadow-sm transition-all duration-200 hover:scale-105 hover:bg-solar-resume hover:text-solar-resume-foreground hover:shadow-lg active:scale-95",
            )}
          >
            GitHub
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noreferrer"
            className={cn(
              buttonVariants({ variant: "default" }),
              "scale-100 bg-solar-hero-foreground/10 text-current shadow-sm transition-all duration-200 hover:scale-105 hover:bg-solar-resume hover:text-solar-resume-foreground hover:shadow-lg active:scale-95",
            )}
          >
            LinkedIn
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export { Hero };
