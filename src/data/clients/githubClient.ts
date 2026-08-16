import type { GithubRepo } from "@/data/clients/types"

export interface GithubClient {
  listRepos(username: string, signal?: AbortSignal): Promise<GithubRepo[]>
  getReadme(username: string, repo: string, signal?: AbortSignal): Promise<string>
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
    async getReadme(username, repo, signal) {
      const res = await fetchImpl(`https://raw.githubusercontent.com/${username}/${repo}/main/README.md`, { signal })
      if (!res.ok) {
        throw new Error(`GitHub README error: ${res.status}`)
      }
      return res.text()
    },
  }
}
