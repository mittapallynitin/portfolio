import { useEffect, useState, type DependencyList } from "react"

export type AsyncState<T> =
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: string }

export function useAsync<T>(
  fetcher: (signal: AbortSignal) => Promise<T>,
  deps: DependencyList
): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T>>({ status: "loading" })

  useEffect(() => {
    const controller = new AbortController()

    fetcher(controller.signal)
      .then((data) => setState({ status: "success", data }))
      .catch((err) => {
        if (controller.signal.aborted) return
        setState({ status: "error", error: String(err) })
      })

    return () => controller.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return state
}
