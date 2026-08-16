import resumeIcon from "@/assets/curriculum-resume-svgrepo-com.svg";
import resumePdf from "@/data/Nitin Mittapally - Resume.pdf?url";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function ResumeDownload() {
  return (
    <div className="relative flex h-full min-h-0 min-w-0 flex-col justify-between gap-4 overflow-hidden rounded-tl-[1.5rem] rounded-tr-[2.75rem] rounded-br-[1.5rem] rounded-bl-[2.75rem] bg-solar-resume p-6 text-solar-resume-foreground">
      <div className="pointer-events-none absolute -top-4 right-8 h-24 w-24 sm:h-32 sm:w-32">
        <div className="absolute inset-x-2 bottom-1 h-4 rounded-full bg-black/50 blur-md sm:h-5" />
        <img
          src={resumeIcon}
          alt=""
          className="relative h-full w-full scale-125 rotate-12"
        />
      </div>
      <div className="max-w-[55%]">
        <p className="text-[11px] font-medium tracking-wide text-solar-resume-foreground/70 uppercase">
          Resume
        </p>
        <h3 className="mt-2 font-heading text-2xl font-bold sm:text-3xl">
          Download my resume
        </h3>
      </div>
      <a
        href={resumePdf}
        download="Nitin Mittapally - Resume.pdf"
        className={cn(
          buttonVariants({ variant: "default" }),
          "w-fit bg-solar-resume-foreground text-solar-resume hover:bg-solar-resume-foreground/90",
        )}
      >
        Download PDF
      </a>
    </div>
  );
}

export { ResumeDownload };
