import profilePhoto from "@/assets/profile-no-bg.webp";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { resume } from "@/data/resume";

function Hero() {
  const { personalInfo, summary } = resume;

  return (
    <div className="flex h-full min-h-0 min-w-0 items-center gap-6 overflow-hidden rounded-tl-[3.5rem] rounded-tr-[2.5rem] rounded-br-[2.5rem] rounded-bl-[2.5rem] bg-solar-hero p-6 text-solar-hero-foreground sm:gap-10 sm:p-10">
      <div className="relative h-28 w-28 shrink-0 sm:h-40 sm:w-40 md:h-48 md:w-48">
        <div className="animate-blob scale-300 absolute inset-0 bg-solar-hero-foreground/20" />
        <div className="animate-blob-reverse scale-150 absolute inset-0 bg-solar-experience-foreground/10" />
        <img
          src={profilePhoto}
          alt={personalInfo.name}
          className="relative h-full w-full scale-125 object-contain drop-shadow-xl transition-transform duration-500 hover:-translate-y-2 hover:scale-150"
        />
      </div>

      <div className="flex min-w-0 flex-col gap-2 text-left">
        <h1 className="font-heading text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
          {personalInfo.name}
        </h1>
        <p className="text-base text-solar-hero-foreground/80 sm:text-lg">
          {personalInfo.title}
        </p>
        <p className="mt-1 line-clamp-3 max-w-xl text-sm text-solar-hero-foreground/70 sm:text-base">
          {summary}
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
    </div>
  );
}

export { Hero };
