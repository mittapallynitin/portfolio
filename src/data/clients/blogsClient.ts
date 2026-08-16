import type { BlogsIndexResponse, BlogSummary } from "@/data/clients/types"

const BLOGS_INDEX_URL = "https://raw.githubusercontent.com/mittapallynitin/blogs/main/blogs.json"

export interface BlogContent {
  title: string
  markdown: string
}

export interface BlogsClient {
  listBlogs(signal?: AbortSignal): Promise<BlogSummary[]>
  getBlogContent(blogId: string, signal?: AbortSignal): Promise<BlogContent>
}

export function createBlogsClient(fetchImpl: typeof fetch = fetch): BlogsClient {
  return {
    async listBlogs(signal) {
      const res = await fetchImpl(BLOGS_INDEX_URL, { signal })
      if (!res.ok) {
        throw new Error(`Blogs index error: ${res.status}`)
      }
      const data: BlogsIndexResponse = await res.json()
      return data.blogs
    },
    async getBlogContent(blogId, signal) {
      const indexRes = await fetchImpl(BLOGS_INDEX_URL, { signal })
      if (!indexRes.ok) {
        throw new Error(`Blogs index error: ${indexRes.status}`)
      }
      const { url_root, blogs } = (await indexRes.json()) as BlogsIndexResponse
      const blog = blogs.find((b) => b.id === blogId)
      if (!blog) {
        throw new Error(`Blog not found: ${blogId}`)
      }
      const contentRes = await fetchImpl(`${url_root}${blog.github}`, { signal })
      if (!contentRes.ok) {
        throw new Error(`Blog content error: ${contentRes.status}`)
      }
      return { title: blog.title, markdown: await contentRes.text() }
    },
  }
}
