import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import resumeIcon from "@/assets/curriculum-resume-svgrepo-com.svg";
import resumePdf from "@/data/Nitin Mittapally - Resume.pdf?url";
import { buttonVariants } from "@/components/ui/button";
import { staggerItemFromBottom } from "@/lib/motion";
import { cn } from "@/lib/utils";

function ResumeDownload() {
  const [dropKey, setDropKey] = useState(0);
  const downloadLinkRef = useRef<HTMLAnchorElement>(null);

  return (
    <motion.div
      variants={staggerItemFromBottom}
      onClick={() => {
        downloadLinkRef.current?.click();
        setDropKey((key) => key + 1);
      }}
      className="relative flex h-full min-h-0 min-w-0 cursor-pointer flex-col justify-between gap-4 overflow-hidden rounded-tl-[1.5rem] rounded-tr-[2.75rem] rounded-br-[1.5rem] rounded-bl-[2.75rem] bg-solar-resume p-6 text-solar-resume-foreground transition-shadow duration-300 hover:shadow-[0_0_60px_-8px_var(--solar-resume)]"
    >
      <div className="pointer-events-none absolute -top-4 right-8 h-24 w-24 sm:h-32 sm:w-32">
        <div className="absolute inset-x-2 bottom-1 h-4 rounded-full bg-black/50 blur-md sm:h-5" />
        <AnimatePresence mode="popLayout">
          <motion.div
            key={dropKey}
            initial={dropKey === 0 ? false : { y: "-120%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "120%", opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeIn" }}
            className="relative h-full w-full"
          >
            <motion.img
              src={resumeIcon}
              alt=""
              animate={{ rotate: [8, 16, 8], y: [0, -6, 0] }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="h-full w-full scale-125"
            />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="max-w-[55%]">
        <p className="text-[11px] font-medium tracking-wide text-solar-resume-foreground/70 uppercase">
          Resume
        </p>
        <h3 className="mt-2 font-heading text-xl font-bold sm:text-2xl lg:text-3xl">
          Download my resume
        </h3>
      </div>
      <a
        ref={downloadLinkRef}
        href={resumePdf}
        download="Nitin Mittapally - Resume.pdf"
        onClick={(e) => e.stopPropagation()}
        className={cn(
          buttonVariants({ variant: "default" }),
          "w-fit bg-solar-resume-foreground text-solar-resume hover:bg-solar-resume-foreground/90",
        )}
      >
        Download PDF
      </a>
    </motion.div>
  );
}

export { ResumeDownload };
