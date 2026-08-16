import { createGithubClient, type GithubClient } from "@/data/clients/githubClient"
import { useAsync, type AsyncState } from "@/hooks/useAsync"
import type { GithubRepo } from "@/data/clients/types"

export const GITHUB_USERNAME = "mittapallynitin"

const defaultGithubClient = createGithubClient()

export function useProjects(client: GithubClient = defaultGithubClient): AsyncState<GithubRepo[]> {
  return useAsync(
    (signal) =>
      client
        .listRepos(GITHUB_USERNAME, signal)
        .then((repos) => repos.sort((a, b) => b.stargazers_count - a.stargazers_count)),
    [client]
  )
}
