import { motion } from "motion/react"

import { AsyncBoundary } from "@/components/common/AsyncBoundary"
import { Carousel } from "@/components/common/Carousel"
import { SectionHeader } from "@/components/common/SectionHeader"
import { ProjectCard } from "@/features/projects/ProjectCard"
import { useProjects } from "@/features/projects/useProjects"
import { staggerItemFromLeft } from "@/lib/motion"

function FeaturedProject() {
  const projects = useProjects()

  return (
    <motion.div
      variants={staggerItemFromLeft}
      className="panel-tonal flex h-full min-h-0 min-w-0 flex-col overflow-hidden rounded-tl-[2rem] rounded-tr-[2rem] rounded-br-[2rem] rounded-bl-[3rem] bg-solar-projects p-6 text-solar-projects-foreground transition-shadow duration-300 hover:shadow-[0_0_110px_-10px_var(--solar-projects)] sm:p-8"
    >
      <SectionHeader title="Projects" actionLabel="View All Projects" live />
      <AsyncBoundary state={projects} loadingLabel="Loading projects..." errorLabel="Couldn't load projects" limit={6}>
        {(repos) => (
          <Carousel items={repos} keyFor={(repo) => repo.name} renderItem={(repo, index) => <ProjectCard repo={repo} index={index} />} />
        )}
      </AsyncBoundary>
    </motion.div>
  )
}

export { FeaturedProject }
