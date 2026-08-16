import { ContentCard } from "@/components/common/ContentCard";
import { useReaderTarget } from "@/features/reader/useReaderTarget";
import type { BlogSummary } from "@/data/clients/types";

interface BlogCardProps {
  blog: BlogSummary;
  index?: number;
}

function BlogCard({ blog, index }: BlogCardProps) {
  const { open } = useReaderTarget();

  return (
    <div
      onClick={() => open({ type: "blog", id: blog.id })}
      className="h-full min-h-0 cursor-pointer transition-transform duration-150 hover:scale-[1.02] active:scale-[0.98]"
    >
      <ContentCard
        title={blog.title}
        description={blog.description}
        index={index}
        className="bg-[#4a2708]"
        descriptionClassName="text-amber-200/70"
        footerExtra
      />
    </div>
  );
}

export { BlogCard };
