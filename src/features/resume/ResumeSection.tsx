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
        <div className="flex flex-col gap-10">
          {resume.experience.map((entry) => (
            <div
              key={`${entry.company}-${entry.position}`}
              className="grid grid-cols-1 gap-2 md:grid-cols-[200px_1fr] md:gap-8"
            >
              <div>
                <p className="font-medium text-foreground">{entry.company}</p>
                <p className="text-sm text-muted-foreground">{entry.location}</p>
                <p className="text-sm text-muted-foreground">{entry.duration}</p>
              </div>
              <div className="relative border-l-2 border-pink-300/30 pl-8">
                <span className="absolute top-1 -left-2.25 h-3 w-3 rounded-full bg-pink-300 ring-4 ring-[#3a0e26]" />
                <h3 className="font-heading text-lg font-medium">{entry.position}</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                  {entry.description.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-2">
                  {entry.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-pink-400/15 px-2 py-1 text-xs text-pink-200 ring-1 ring-pink-300/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="font-heading text-2xl font-medium">Education</h2>
        <div className="flex flex-col gap-10">
          {resume.education.map((edu) => (
            <div
              key={`${edu.institution}-${edu.degree}`}
              className="grid grid-cols-1 gap-2 md:grid-cols-[200px_1fr] md:gap-8"
            >
              <div>
                <p className="font-medium text-foreground">{edu.institution}</p>
                <p className="text-sm text-muted-foreground">{edu.location}</p>
                <p className="text-sm text-muted-foreground">{edu.duration}</p>
              </div>
              <div className="relative border-l-2 border-pink-300/30 pl-8">
                <span className="absolute top-1 -left-2.25 h-3 w-3 rounded-full bg-pink-300 ring-4 ring-[#3a0e26]" />
                <h3 className="font-heading text-lg font-medium">{edu.degree}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {edu.relevantCoursework.map((course) => (
                    <span
                      key={course}
                      className="rounded-full bg-cyan-400/15 px-2 py-1 text-xs text-cyan-200 ring-1 ring-cyan-300/30"
                    >
                      {course}
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
        <div className="mt-4 grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
          {resume.skills.technical.map((group) => (
            <div key={group.category}>
              <h3 className="text-sm font-medium text-foreground">{group.category}</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-amber-400/15 px-2 py-1 text-xs text-amber-200 ring-1 ring-amber-300/30"
                  >
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
