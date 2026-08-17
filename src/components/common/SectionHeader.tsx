import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"

interface SectionHeaderProps {
  title: string
  actionLabel?: string
  live?: boolean
}

function SectionHeader({ title, actionLabel, live = false }: SectionHeaderProps) {
  return (
    <div className="mb-5 flex w-full items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <h2 className="font-heading text-3xl font-bold sm:text-4xl">{title}</h2>
        {live && (
          <span className="flex items-center gap-1.5 text-current/70">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-current opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-current" />
            </span>
            <span className="text-[11px] font-medium tracking-wide uppercase">
              Live
            </span>
          </span>
        )}
      </div>
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
