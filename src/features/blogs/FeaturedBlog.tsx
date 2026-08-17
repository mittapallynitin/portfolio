import { motion } from "motion/react"

import { AsyncBoundary } from "@/components/common/AsyncBoundary"
import { Carousel } from "@/components/common/Carousel"
import { SectionHeader } from "@/components/common/SectionHeader"
import { BlogCard } from "@/features/blogs/BlogCard"
import { useBlogs } from "@/features/blogs/useBlogs"
import { staggerItemFromRight } from "@/lib/motion"

function FeaturedBlog() {
  const blogs = useBlogs()

  return (
    <motion.div
      variants={staggerItemFromRight}
      className="flex h-full min-h-0 min-w-0 flex-col overflow-hidden rounded-tl-[2rem] rounded-tr-[2rem] rounded-br-[3rem] rounded-bl-[2rem] bg-solar-blogs p-6 text-solar-blogs-foreground transition-shadow duration-300 hover:shadow-[0_0_90px_-9px_var(--solar-blogs)] sm:p-8"
    >
      <SectionHeader title="Blogs" actionLabel="View All Blogs" />
      <AsyncBoundary state={blogs} loadingLabel="Loading blogs..." errorLabel="Couldn't load blogs" limit={6}>
        {(items) => (
          <Carousel items={items} keyFor={(blog) => blog.id} renderItem={(blog, index) => <BlogCard blog={blog} index={index} />} />
        )}
      </AsyncBoundary>
    </motion.div>
  )
}

export { FeaturedBlog }
