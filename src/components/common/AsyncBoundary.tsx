import type { ReactNode } from "react"

import type { AsyncState } from "@/hooks/useAsync"

interface AsyncBoundaryProps<T> {
  state: AsyncState<T[]>
  loadingLabel: string
  errorLabel: string
  limit?: number
  children: (items: T[]) => ReactNode
}

function AsyncBoundary<T>({ state, loadingLabel, errorLabel, limit, children }: AsyncBoundaryProps<T>) {
  if (state.status === "loading") {
    return <p>{loadingLabel}</p>
  }

  if (state.status === "error") {
    return (
      <p>
        {errorLabel}: {state.error}
      </p>
    )
  }

  const items = limit ? state.data.slice(0, limit) : state.data

  return <>{children(items)}</>
}

export { AsyncBoundary }
