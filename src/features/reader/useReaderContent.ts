import { createBlogsClient, type BlogsClient } from "@/data/clients/blogsClient"
import { createGithubClient, GITHUB_USERNAME, type GithubClient } from "@/data/clients/githubClient"
import type { ReaderTarget } from "@/features/reader/readerState"
import { useAsync, type AsyncState } from "@/hooks/useAsync"

interface ReaderContent {
  title: string
  markdown: string
}

const defaultGithubClient = createGithubClient()
const defaultBlogsClient = createBlogsClient()

export function useReaderContent(
  target: ReaderTarget,
  githubClient: GithubClient = defaultGithubClient,
  blogsClient: BlogsClient = defaultBlogsClient
): AsyncState<ReaderContent> {
  return useAsync<ReaderContent>(
    async (signal) => {
      if (target.type === "project") {
        const markdown = await githubClient.getReadme(GITHUB_USERNAME, target.id, signal)
        return { title: target.id, markdown }
      }
      return blogsClient.getBlogContent(target.id, signal)
    },
    [target.type, target.id, githubClient, blogsClient]
  )
}
