import type { BlogsIndexResponse, BlogSummary } from "@/data/clients/types"

const BLOGS_INDEX_URL = "https://raw.githubusercontent.com/mittapallynitin/blogs/main/blogs.json"

export interface BlogsClient {
  listBlogs(signal?: AbortSignal): Promise<BlogSummary[]>
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
  }
}
