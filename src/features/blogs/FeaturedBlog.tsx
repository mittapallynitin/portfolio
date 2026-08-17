import { useRef } from "react"
import { motion } from "motion/react"

import { AsyncBoundary } from "@/components/common/AsyncBoundary"
import { Carousel } from "@/components/common/Carousel"
import { SectionHeader } from "@/components/common/SectionHeader"
import { BlogCard } from "@/features/blogs/BlogCard"
import { useBlogs } from "@/features/blogs/useBlogs"
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock"
import { useEscapeKey } from "@/hooks/useEscapeKey"
import { usePullToDismiss } from "@/hooks/usePullToDismiss"
import { useUrlState } from "@/hooks/useUrlState"
import { cn } from "@/lib/utils"
import { staggerItemFromRight } from "@/lib/motion"

function FeaturedBlog() {
  const blogs = useBlogs()
  const [view, setView] = useUrlState("blogsView")
  const isOpen = view === "all"
  const close = () => setView(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useBodyScrollLock(isOpen)
  useEscapeKey(isOpen, close)
  const { y, onPan, onPanEnd } = usePullToDismiss(scrollRef, close)

  return (
    <motion.div
      layout
      variants={staggerItemFromRight}
      transition={{ layout: { type: "spring", stiffness: 260, damping: 28 } }}
      style={isOpen ? { y } : undefined}
      onPan={isOpen ? onPan : undefined}
      onPanEnd={isOpen ? onPanEnd : undefined}
      className={cn(
        "flex flex-col overflow-hidden rounded-tl-[2rem] rounded-tr-[2rem] rounded-br-[3rem] rounded-bl-[2rem] bg-solar-blogs p-6 text-solar-blogs-foreground transition-shadow duration-300 hover:shadow-[0_0_90px_-9px_var(--solar-blogs)] sm:p-8 lg:justify-center-safe",
        isOpen
          ? "fixed inset-0 z-50 h-screen w-screen touch-pan-x rounded-none"
          : "h-full min-h-0 min-w-0",
      )}
    >
      {isOpen && (
        <div className="mx-auto mb-2 h-1 w-10 shrink-0 rounded-full bg-current/20" />
      )}
      <SectionHeader
        title="Blogs"
        actionLabel={isOpen ? undefined : "View All Blogs"}
        onAction={() => setView("all")}
      />
      <AsyncBoundary state={blogs} loadingLabel="Loading blogs..." errorLabel="Couldn't load blogs" limit={isOpen ? undefined : 6}>
        {(items) =>
          isOpen ? (
            <div
              ref={scrollRef}
              className="grid min-h-0 flex-1 grid-cols-1 gap-4 overflow-y-auto pr-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {items.map((blog, index) => (
                <div key={blog.id} className="h-56">
                  <BlogCard blog={blog} index={index} />
                </div>
              ))}
            </div>
          ) : (
            <Carousel items={items} keyFor={(blog) => blog.id} renderItem={(blog, index) => <BlogCard blog={blog} index={index} />} />
          )
        }
      </AsyncBoundary>
    </motion.div>
  )
}

export { FeaturedBlog }
