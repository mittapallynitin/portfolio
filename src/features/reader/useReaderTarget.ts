import { useUrlState } from "@/hooks/useUrlState"
import { decodeReaderTarget, encodeReaderTarget, type ReaderTarget } from "@/features/reader/readerState"

const READER_PARAM = "reader"

export function useReaderTarget() {
  const [value, setValue] = useUrlState(READER_PARAM)
  const target = decodeReaderTarget(value)

  const open = (next: ReaderTarget) => setValue(encodeReaderTarget(next))
  const close = () => setValue(null)

  return { target, open, close }
}
