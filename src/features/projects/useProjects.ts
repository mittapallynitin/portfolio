import { createGithubClient, GITHUB_USERNAME, type GithubClient } from "@/data/clients/githubClient"
import { resume } from "@/data/resume"
import { useAsync, type AsyncState } from "@/hooks/useAsync"
import type { GithubRepo } from "@/data/clients/types"

const defaultGithubClient = createGithubClient()

export function useProjects(client: GithubClient = defaultGithubClient): AsyncState<GithubRepo[]> {
  return useAsync(
    (signal) =>
      client
        .listRepos(GITHUB_USERNAME, signal)
        .then((repos) =>
          repos
            .filter((repo) => !(resume.projectsToExclude as readonly string[]).includes(repo.name))
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
        ),
    [client]
  )
}
