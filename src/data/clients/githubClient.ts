import type { GithubRepo } from "@/data/clients/types"

export interface GithubClient {
  listRepos(username: string, signal?: AbortSignal): Promise<GithubRepo[]>
}

export function createGithubClient(fetchImpl: typeof fetch = fetch): GithubClient {
  return {
    async listRepos(username, signal) {
      const res = await fetchImpl(`https://api.github.com/users/${username}/repos`, { signal })
      if (!res.ok) {
        throw new Error(`GitHub API error: ${res.status}`)
      }
      return res.json()
    },
  }
}
