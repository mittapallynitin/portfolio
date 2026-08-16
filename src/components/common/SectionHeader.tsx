import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"

interface SectionHeaderProps {
  title: string
  actionLabel?: string
}

function SectionHeader({ title, actionLabel }: SectionHeaderProps) {
  return (
    <div className="mb-5 flex w-full items-center justify-between gap-4">
      <h2 className="font-heading text-3xl font-bold sm:text-4xl">{title}</h2>
      {actionLabel && (
        <span className="group text-current/80 flex shrink-0 items-center gap-2 text-sm font-medium hover:underline">
          {actionLabel}
          <HugeiconsIcon
            icon={ArrowRight01Icon}
            className="size-5 transition-transform duration-300 group-hover:translate-x-1"
          />
        </span>
      )}
    </div>
  )
}

export { SectionHeader }
