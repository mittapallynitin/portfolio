import { motion } from "motion/react";

import { FeaturedBlog } from "@/features/blogs/FeaturedBlog";
import { Hero } from "@/features/hero/Hero";
import { FeaturedProject } from "@/features/projects/FeaturedProject";
import { Reader } from "@/features/reader/Reader";
import { ExperienceHighlight } from "@/features/resume/ExperienceHighlight";
import { ResumeDownload } from "@/features/resume/ResumeDownload";
import { ResumeOverlay } from "@/features/resume/ResumeOverlay";
import { staggerContainer } from "@/lib/motion";

function App() {
  return (
    <div className="flex h-dvh w-full flex-col overflow-y-auto overflow-x-hidden lg:justify-center-safe">
      <motion.main
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col gap-4 px-6 py-6 sm:px-10 lg:max-h-237.5"
      >
        <div
          id="hero"
          className="grid min-w-0 grid-cols-1 gap-4 lg:min-h-0 lg:flex-4 lg:grid-cols-[2fr_1fr]"
        >
          <Hero />
          <div className="grid min-w-0 grid-cols-1 gap-5 lg:grid-cols-1 lg:grid-rows-2">
            <ExperienceHighlight />
            <ResumeDownload />
          </div>
        </div>

        <div
          className="grid min-w-0 grid-cols-1 gap-4 lg:min-h-0 lg:flex-3 lg:grid-cols-[2fr_1fr]"
        >
          <div id="projects" className="min-w-0 lg:min-h-0">
            <FeaturedProject />
          </div>
          <div id="blogs" className="min-w-0 lg:min-h-0">
            <FeaturedBlog />
          </div>
        </div>
      </motion.main>
      <Reader />
      <ResumeOverlay />
    </div>
  );
}

export default App;
