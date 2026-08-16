import { FeaturedBlog } from "@/features/blogs/FeaturedBlog";
import { Hero } from "@/features/hero/Hero";
import { FeaturedProject } from "@/features/projects/FeaturedProject";
import { ExperienceHighlight } from "@/features/resume/ExperienceHighlight";
import { ResumeDownload } from "@/features/resume/ResumeDownload";

function App() {
  return (
    <div className="flex h-dvh w-full flex-col overflow-hidden">
      <main className="mx-auto flex min-h-0 w-full max-w-[1600px] flex-1 flex-col gap-4 overflow-hidden px-6 py-6 sm:px-10">
        <div id="hero" className="grid min-h-0 min-w-0 flex-4 grid-cols-1 gap-4 lg:grid-cols-[2fr_1fr]">
          <Hero />
          <div className="grid min-h-0 min-w-0 grid-rows-2 gap-5">
            <ExperienceHighlight />
            <ResumeDownload />
          </div>
        </div>

        <div className="grid min-h-0 min-w-0 flex-3 grid-cols-1 gap-4 lg:grid-cols-[2fr_1fr]">
          <div id="projects" className="min-h-0 min-w-0">
            <FeaturedProject />
          </div>
          <div id="blogs" className="min-h-0 min-w-0">
            <FeaturedBlog />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
