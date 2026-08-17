import { useRef, type RefObject } from "react"
import { animate, useMotionValue, type PanInfo } from "motion/react"

const CLOSE_DISTANCE = 120
const CLOSE_VELOCITY = 800

export function usePullToDismiss(scrollRef: RefObject<HTMLElement | null>, onClose: () => void) {
  const y = useMotionValue(0)
  const pulling = useRef(false)

  function onPan(_event: PointerEvent, info: PanInfo) {
    const atTop = (scrollRef.current?.scrollTop ?? 0) <= 0
    if (!pulling.current && atTop && info.offset.y > 0) {
      pulling.current = true
    }
    if (pulling.current) {
      y.set(Math.max(0, info.offset.y))
    }
  }

  function onPanEnd(_event: PointerEvent, info: PanInfo) {
    if (pulling.current && (info.offset.y > CLOSE_DISTANCE || info.velocity.y > CLOSE_VELOCITY)) {
      onClose()
    }
    animate(y, 0, { type: "spring", stiffness: 400, damping: 40 })
    pulling.current = false
  }

  return { y, onPan, onPanEnd }
}
