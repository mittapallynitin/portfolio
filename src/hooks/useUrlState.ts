import { useCallback, useSyncExternalStore } from "react"

function subscribe(callback: () => void) {
  window.addEventListener("popstate", callback)
  return () => window.removeEventListener("popstate", callback)
}

export function useUrlState(key: string): [string | null, (value: string | null) => void] {
  const getSnapshot = useCallback(() => new URLSearchParams(window.location.search).get(key), [key])
  const value = useSyncExternalStore(subscribe, getSnapshot)

  const setValue = useCallback(
    (next: string | null) => {
      const params = new URLSearchParams(window.location.search)
      if (next === null) {
        params.delete(key)
      } else {
        params.set(key, next)
      }
      const query = params.toString()
      window.history.pushState(null, "", `${window.location.pathname}${query ? `?${query}` : ""}`)
      window.dispatchEvent(new PopStateEvent("popstate"))
    },
    [key]
  )

  return [value, setValue]
}
