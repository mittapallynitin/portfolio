import { ContentCard } from "@/components/common/ContentCard";
import type { BlogSummary } from "@/data/clients/types";

interface BlogCardProps {
  blog: BlogSummary;
  index?: number;
}

function BlogCard({ blog, index }: BlogCardProps) {
  return (
    <ContentCard
      title={blog.title}
      description={blog.description}
      index={index}
      className="bg-[#4a2708]"
      descriptionClassName="text-amber-200/70"
      footerExtra
    />
  );
}

export { BlogCard };
