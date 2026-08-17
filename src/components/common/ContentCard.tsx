import type { ReactNode } from "react";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const RADIUS_VARIANTS = [
  "rounded-tl-[1.75rem] rounded-tr-[1rem] rounded-br-[1.75rem] rounded-bl-[1rem]",
  "rounded-tl-[1rem] rounded-tr-[1.75rem] rounded-br-[1rem] rounded-bl-[1.75rem]",
  "rounded-tl-[1rem] rounded-tr-[1rem] rounded-br-[1.75rem] rounded-bl-[1.75rem]",
  "rounded-tl-[1.75rem] rounded-tr-[1.75rem] rounded-br-[1rem] rounded-bl-[1rem]",
];

interface ContentCardProps {
  title: ReactNode;
  description: ReactNode;
  footerExtra: ReactNode;
  index?: number;
  className?: string;
  descriptionClassName?: string;
}

function ContentCard({
  title,
  description,
  footerExtra,
  index = 0,
  className,
  descriptionClassName,
}: ContentCardProps) {
  return (
    <Card
      size="sm"
      className={cn(
        "glass-card flex h-full min-h-0 flex-col justify-between bg-card/90 [--card-spacing:--spacing(5)]",
        RADIUS_VARIANTS[index % RADIUS_VARIANTS.length],
        className,
      )}
    >
      <CardHeader className="flex min-h-0 flex-1 flex-col gap-1.5 overflow-hidden">
        <CardTitle className="line-clamp-2 shrink-0">{title}</CardTitle>
        <CardDescription
          className={cn("line-clamp-2 shrink-0", descriptionClassName)}
        >
          {description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto flex shrink-0 items-center justify-between">
        <span
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "border-primary/25 bg-transparent text-primary hover:bg-primary/10",
          )}
        >
          Read More →
        </span>
        {footerExtra}
      </CardFooter>
    </Card>
  );
}

export { ContentCard };
