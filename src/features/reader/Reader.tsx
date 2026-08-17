import { useRef } from "react";
import { motion } from "motion/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ReaderTarget } from "@/features/reader/readerState";
import { useReaderContent } from "@/features/reader/useReaderContent";
import { useReaderTarget } from "@/features/reader/useReaderTarget";
import { usePullToDismiss } from "@/hooks/usePullToDismiss";
import { cn } from "@/lib/utils";

const READER_TINT: Record<ReaderTarget["type"], { bg: string; accent: string }> = {
  project: { bg: "bg-[#051f1a]/90", accent: "text-teal-300" },
  blog: { bg: "bg-[#2e1704]/90", accent: "text-amber-300" },
};

function ReaderBody({ target, onClose }: { target: ReaderTarget; onClose: () => void }) {
  const state = useReaderContent(target);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { y, onPan, onPanEnd } = usePullToDismiss(scrollRef, onClose);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      style={{ y }}
      onPan={onPan}
      onPanEnd={onPanEnd}
      className="flex min-h-0 w-full flex-1 touch-pan-x flex-col gap-6"
    >
      <div className="mx-auto mb-1 h-1 w-10 shrink-0 rounded-full bg-current/20 sm:hidden" />
      {state.status === "loading" && (
        <p className="w-full sm:mx-auto sm:max-w-2xl text-sm text-muted-foreground">
          Loading...
        </p>
      )}
      {state.status === "error" && (
        <p className="w-full sm:mx-auto sm:max-w-2xl text-sm text-destructive">
          Couldn't load content.
        </p>
      )}
      {state.status === "success" && (
        <>
          <DialogHeader className="w-full sm:mx-auto sm:max-w-2xl">
            <DialogTitle className={cn("text-lg font-bold", READER_TINT[target.type].accent)}>
              {state.data.title}
            </DialogTitle>
          </DialogHeader>
          <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto pr-3 sm:pr-10">
            <div className="prose prose-sm sm:prose-base lg:prose-lg prose-invert w-full max-w-none rounded-2xl sm:mx-auto sm:max-w-2xl bg-black/20 p-4 ring-1 ring-white/5 shadow-2xl shadow-black/40 sm:rounded-3xl sm:p-8">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {state.data.markdown}
              </ReactMarkdown>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}

function Reader() {
  const { target, close } = useReaderTarget();

  return (
    <Dialog open={target !== null} onOpenChange={(open) => !open && close()}>
      <DialogContent
        showCloseButton={false}
        className={cn(
          "flex h-screen w-screen max-w-full flex-col overflow-hidden rounded-none pt-4 pr-1 pb-2 pl-3 backdrop-blur-xl sm:h-[92vh] sm:w-[80vw] sm:max-w-[80vw] sm:rounded-4xl sm:pt-10 sm:pr-2 sm:pb-6 sm:pl-10",
          target ? READER_TINT[target.type].bg : "bg-popover/85"
        )}
      >
        {target && <ReaderBody target={target} onClose={close} />}
      </DialogContent>
    </Dialog>
  );
}

export { Reader };
