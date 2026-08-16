import { renderHook, waitFor } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import type { GithubClient } from "@/data/clients/githubClient"
import type { GithubRepo } from "@/data/clients/types"
import { useProjects } from "@/features/projects/useProjects"

function fakeClient(repos: GithubRepo[]): GithubClient {
  return {
    async listRepos() {
      return repos
    },
    async getReadme() {
      return ""
    },
  }
}

describe("useProjects", () => {
  it("starts in loading state, then resolves to sorted repos", async () => {
    const repos: GithubRepo[] = [
      { name: "low-stars", description: null, html_url: "https://github.com/x/low-stars", stargazers_count: 1 },
      { name: "high-stars", description: null, html_url: "https://github.com/x/high-stars", stargazers_count: 10 },
    ]

    const { result } = renderHook(() => useProjects(fakeClient(repos)))

    expect(result.current.status).toBe("loading")

    await waitFor(() => expect(result.current.status).toBe("success"))

    if (result.current.status !== "success") throw new Error("expected success")
    expect(result.current.data.map((r) => r.name)).toEqual(["high-stars", "low-stars"])
  })
})
