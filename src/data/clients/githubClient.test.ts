import { describe, expect, it, vi } from "vitest"

import { createGithubClient } from "@/data/clients/githubClient"
import type { GithubRepo } from "@/data/clients/types"

function fakeFetch(repos: GithubRepo[]) {
  return vi.fn(async () => new Response(JSON.stringify(repos), { status: 200 }))
}

describe("githubClient", () => {
  it("returns repos parsed from the response", async () => {
    const repos: GithubRepo[] = [
      { name: "portfolio", description: "my site", html_url: "https://github.com/x/portfolio", stargazers_count: 3 },
    ]
    const client = createGithubClient(fakeFetch(repos))

    const result = await client.listRepos("mittapallynitin")

    expect(result).toEqual(repos)
  })

  it("throws when the response is not ok", async () => {
    const failingFetch = vi.fn(async () => new Response(null, { status: 500 }))
    const client = createGithubClient(failingFetch)

    await expect(client.listRepos("mittapallynitin")).rejects.toThrow("GitHub API error: 500")
  })
})
