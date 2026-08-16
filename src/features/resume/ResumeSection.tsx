import { resume } from "@/data/resume"

function ResumeSection() {
  return (
    <div className="flex w-full max-w-4xl flex-col gap-8">
      <div>
        <h2 className="font-heading text-2xl font-medium">Summary</h2>
        <p className="mt-2 text-muted-foreground">{resume.summary}</p>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="font-heading text-2xl font-medium">Experience</h2>
        <div className="flex flex-col gap-10 border-l-2 border-brand-indigo/20 pl-8">
          {resume.experience.map((entry) => (
            <div
              key={`${entry.company}-${entry.position}`}
              className="relative grid grid-cols-1 gap-2 md:grid-cols-[200px_1fr] md:gap-8"
            >
              <span className="absolute top-1 -left-9.25 h-3 w-3 rounded-full bg-brand-indigo" />
              <div>
                <p className="font-medium text-foreground">{entry.company}</p>
                <p className="text-sm text-muted-foreground">{entry.location}</p>
                <p className="text-sm text-muted-foreground">{entry.duration}</p>
              </div>
              <div>
                <h3 className="font-heading text-lg font-medium">{entry.position}</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                  {entry.description.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-2">
                  {entry.technologies.map((tech) => (
                    <span key={tech} className="rounded-full bg-muted px-2 py-1 text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="font-heading text-2xl font-medium">Skills</h2>
        <div className="mt-2 flex flex-col gap-3">
          {resume.skills.technical.map((group) => (
            <div key={group.category}>
              <h3 className="text-sm font-medium text-foreground">{group.category}</h3>
              <div className="mt-1 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="rounded-full bg-muted px-2 py-1 text-xs">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export { ResumeSection }
