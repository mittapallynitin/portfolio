import { createBlogsClient, type BlogsClient } from "@/data/clients/blogsClient"
import { useAsync, type AsyncState } from "@/hooks/useAsync"
import type { BlogSummary } from "@/data/clients/types"

const defaultBlogsClient = createBlogsClient()

export function useBlogs(client: BlogsClient = defaultBlogsClient): AsyncState<BlogSummary[]> {
  return useAsync((signal) => client.listBlogs(signal), [client])
}
