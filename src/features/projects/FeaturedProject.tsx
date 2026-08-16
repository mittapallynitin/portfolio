import { AsyncBoundary } from "@/components/common/AsyncBoundary"
import { Carousel } from "@/components/common/Carousel"
import { SectionHeader } from "@/components/common/SectionHeader"
import { ProjectCard } from "@/features/projects/ProjectCard"
import { useProjects } from "@/features/projects/useProjects"

function FeaturedProject() {
  const projects = useProjects()

  return (
    <div className="flex h-full min-h-0 min-w-0 flex-col overflow-hidden rounded-tl-[2rem] rounded-tr-[2rem] rounded-br-[2rem] rounded-bl-[3rem] bg-solar-projects p-6 text-solar-projects-foreground sm:p-8">
      <SectionHeader title="Projects" actionLabel="View All Projects" />
      <AsyncBoundary state={projects} loadingLabel="Loading projects..." errorLabel="Couldn't load projects" limit={6}>
        {(repos) => (
          <Carousel items={repos} keyFor={(repo) => repo.name} renderItem={(repo, index) => <ProjectCard repo={repo} index={index} />} />
        )}
      </AsyncBoundary>
    </div>
  )
}

export { FeaturedProject }
