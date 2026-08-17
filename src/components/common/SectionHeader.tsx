import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

interface SectionHeaderProps {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
}

function SectionHeader({ title, actionLabel, onAction }: SectionHeaderProps) {
  return (
    <div className="mb-5 flex w-full items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <h2 className="font-heading text-3xl font-bold sm:text-4xl">{title}</h2>
      </div>
      {actionLabel && (
        <button
          type="button"
          onClick={onAction}
          className="group text-current/80 flex shrink-0 items-center gap-2 text-sm font-medium hover:underline"
        >
          {actionLabel}
          <HugeiconsIcon
            icon={ArrowRight01Icon}
            className="size-5 transition-transform duration-300 group-hover:translate-x-1"
          />
        </button>
      )}
    </div>
  );
}

export { SectionHeader };
