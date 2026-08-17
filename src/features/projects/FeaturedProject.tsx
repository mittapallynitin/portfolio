import { useRef } from "react";
import { motion } from "motion/react";

import { AsyncBoundary } from "@/components/common/AsyncBoundary";
import { Carousel } from "@/components/common/Carousel";
import { SectionHeader } from "@/components/common/SectionHeader";
import { ProjectCard } from "@/features/projects/ProjectCard";
import { useProjects } from "@/features/projects/useProjects";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useEscapeKey } from "@/hooks/useEscapeKey";
import { usePullToDismiss } from "@/hooks/usePullToDismiss";
import { useUrlState } from "@/hooks/useUrlState";
import { cn } from "@/lib/utils";
import { staggerItemFromLeft } from "@/lib/motion";

function FeaturedProject() {
  const projects = useProjects();
  const [view, setView] = useUrlState("projectsView");
  const isOpen = view === "all";
  const close = () => setView(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useBodyScrollLock(isOpen);
  useEscapeKey(isOpen, close);
  const { y, onPan, onPanEnd } = usePullToDismiss(scrollRef, close);

  return (
    <motion.div
      layout
      variants={staggerItemFromLeft}
      transition={{ layout: { type: "spring", stiffness: 260, damping: 28 } }}
      style={isOpen ? { y } : undefined}
      onPan={isOpen ? onPan : undefined}
      onPanEnd={isOpen ? onPanEnd : undefined}
      className={cn(
        "panel-tonal flex flex-col overflow-hidden rounded-tl-[2rem] rounded-tr-[2rem] rounded-br-[2rem] rounded-bl-[3rem] bg-solar-projects p-6 text-solar-projects-foreground transition-shadow duration-300 hover:shadow-[0_0_110px_-10px_var(--solar-projects)] sm:p-8 lg:justify-center-safe",
        isOpen
          ? "fixed inset-0 z-50 h-screen w-screen touch-pan-x rounded-none"
          : "h-full min-h-0 min-w-0",
      )}
    >
      {isOpen && (
        <div className="mx-auto mb-2 h-1 w-10 shrink-0 rounded-full bg-current/20" />
      )}
      <SectionHeader
        title="Projects"
        actionLabel={isOpen ? undefined : "View All Projects"}
        onAction={() => setView("all")}
      />
      <AsyncBoundary
        state={projects}
        loadingLabel="Loading projects..."
        errorLabel="Couldn't load projects"
        limit={isOpen ? undefined : 6}
      >
        {(repos) =>
          isOpen ? (
            <div
              ref={scrollRef}
              className="grid min-h-0 flex-1 grid-cols-1 gap-4 overflow-y-auto pr-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {repos.map((repo, index) => (
                <div key={repo.name} className="h-56">
                  <ProjectCard repo={repo} index={index} />
                </div>
              ))}
            </div>
          ) : (
            <Carousel
              items={repos}
              keyFor={(repo) => repo.name}
              renderItem={(repo, index) => (
                <ProjectCard repo={repo} index={index} />
              )}
            />
          )
        }
      </AsyncBoundary>
    </motion.div>
  );
}

export { FeaturedProject };
