import { resume, type ExperienceEntry } from "@/data/resume";

const MONTH_ABBREVIATIONS: Record<string, number> = {
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dec: 11,
};

function parseDurationStart(
  duration: ExperienceEntry["duration"],
): Date | null {
  const [start] = duration.split("–").map((part) => part.trim());
  const [monthAbbr, yearText] = start.split(" ");
  const month = MONTH_ABBREVIATIONS[monthAbbr.slice(0, 3).toLowerCase()];
  const year = Number(yearText);
  if (month === undefined || Number.isNaN(year)) return null;
  return new Date(year, month, 1);
}

function calculateYearsOfExperience(
  experience: readonly ExperienceEntry[],
  now = new Date(),
): number {
  const startDates = experience
    .map((entry) => parseDurationStart(entry.duration))
    .filter((date): date is Date => date !== null);
  const earliest = startDates.reduce(
    (min, date) => (date < min ? date : min),
    startDates[0] ?? now,
  );

  let years = now.getFullYear() - earliest.getFullYear();
  const hasNotHadAnniversaryYet =
    now.getMonth() < earliest.getMonth() ||
    (now.getMonth() === earliest.getMonth() &&
      now.getDate() < earliest.getDate());
  if (hasNotHadAnniversaryYet) years -= 1;

  return Math.max(years, 0);
}

const HIGHLIGHT_TAGS = ["LLMs", "RAG", "AI/ML", "NLP"];

function ExperienceHighlight() {
  const latest = resume.experience[0];
  const years = calculateYearsOfExperience(resume.experience);

  return (
    <div className="panel-tonal flex h-full min-h-0 min-w-0 flex-col justify-between gap-2 overflow-hidden rounded-tl-[2rem] rounded-tr-[3rem] rounded-br-[2rem] rounded-bl-[2rem] bg-solar-experience p-6 text-solar-experience-foreground">
      <p className="text-[11px] font-medium tracking-wide text-solar-experience-foreground/70 uppercase">
        Experience
      </p>

      <div className="flex items-baseline gap-2">
        <span className="font-heading text-5xl font-bold sm:text-6xl">
          {years}+
        </span>
        <span className="text-[11px] font-medium tracking-wide text-solar-experience-foreground/70 uppercase">
          Years Experience
        </span>
      </div>

      <div className="min-w-0">
        <h3 className="truncate font-heading text-base font-medium">
          {latest.position}
        </h3>
        <p className="truncate text-xs text-solar-experience-foreground/70">
          {latest.company}
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {HIGHLIGHT_TAGS.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-solar-experience-foreground/15 px-2.5 py-1 text-xs font-medium"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export { calculateYearsOfExperience, ExperienceHighlight };
