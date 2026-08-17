import { useEffect, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { AnimatePresence, motion } from "motion/react";

import { resume } from "@/data/resume";
import { useUrlState } from "@/hooks/useUrlState";
import { staggerItemFromTop } from "@/lib/motion";

const ROTATION_INTERVAL_MS = 4000;

function ExperienceHighlight() {
  const [kpiIndex, setKpiIndex] = useState(0);
  const [, setResume] = useUrlState("resume");

  useEffect(() => {
    const id = setInterval(() => {
      setKpiIndex((index) => (index + 1) % resume.kpiHighlights.length);
    }, ROTATION_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      variants={staggerItemFromTop}
      onClick={() => setResume("open")}
      className="panel-tonal flex h-full min-h-0 min-w-0 cursor-pointer flex-col justify-between gap-2 overflow-hidden rounded-tl-[2rem] rounded-tr-[3rem] rounded-br-[2rem] rounded-bl-[2rem] bg-solar-experience p-6 text-solar-experience-foreground transition-shadow duration-300 hover:shadow-[0_0_60px_-8px_var(--solar-experience)]"
    >
      <div className="flex items-center justify-between gap-2">
        <p className="text-[11px] font-medium tracking-wide text-solar-experience-foreground/70 uppercase">
          Experience
        </p>
        <span className="group flex shrink-0 items-center gap-1 text-[11px] font-medium text-solar-experience-foreground/70">
          View Full Resume
          <HugeiconsIcon
            icon={ArrowRight01Icon}
            className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
          />
        </span>
      </div>

      <div className="flex min-h-10 min-w-0 items-center justify-between gap-2 sm:gap-3">
        <h3 className="min-w-0 shrink truncate font-heading text-xl font-semibold tracking-wide sm:text-2xl lg:text-3xl">
          {resume.personalInfo.title}
        </h3>

        <div className="min-w-0 shrink-0 overflow-hidden text-right">
          <AnimatePresence mode="wait">
            <motion.div
              key={kpiIndex}
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -24, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <p className="truncate font-heading text-2xl font-bold tracking-wide sm:text-3xl lg:text-4xl">
                {resume.kpiHighlights[kpiIndex].value}
              </p>
              <p className="truncate text-xs font-medium tracking-wide text-solar-experience-foreground/70 uppercase">
                {resume.kpiHighlights[kpiIndex].label}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div
        className="overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div className="flex w-max animate-ticker gap-1.5 hover:paused">
          {[...resume.expertiseTags, ...resume.expertiseTags].map(
            (tag, index) => (
              <span
                key={`${tag}-${index}`}
                className="shrink-0 rounded-full bg-solar-experience-foreground/15 px-2.5 py-1 text-xs font-medium"
              >
                {tag}
              </span>
            ),
          )}
        </div>
      </div>
    </motion.div>
  );
}

export { ExperienceHighlight };
