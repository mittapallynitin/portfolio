export type ReaderTarget = { type: "project"; id: string } | { type: "blog"; id: string }

export function encodeReaderTarget(target: ReaderTarget): string {
  return `${target.type}:${target.id}`
}

export function decodeReaderTarget(value: string | null): ReaderTarget | null {
  if (!value) return null

  const separatorIndex = value.indexOf(":")
  if (separatorIndex === -1) return null

  const type = value.slice(0, separatorIndex)
  const id = value.slice(separatorIndex + 1)
  if (!id || (type !== "project" && type !== "blog")) return null

  return { type, id }
}
