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
import { cn } from "@/lib/utils";

const READER_TINT: Record<ReaderTarget["type"], { bg: string; accent: string }> = {
  project: { bg: "bg-[#051f1a]/90", accent: "text-teal-300" },
  blog: { bg: "bg-[#2e1704]/90", accent: "text-amber-300" },
};

function ReaderBody({ target }: { target: ReaderTarget }) {
  const state = useReaderContent(target);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="mx-auto flex min-h-0 w-full max-w-2xl flex-1 flex-col gap-6"
    >
      {state.status === "loading" && (
        <p className="text-sm text-muted-foreground">Loading...</p>
      )}
      {state.status === "error" && (
        <p className="text-sm text-destructive">Couldn't load content.</p>
      )}
      {state.status === "success" && (
        <>
          <DialogHeader>
            <DialogTitle className={cn("text-lg font-bold", READER_TINT[target.type].accent)}>
              {state.data.title}
            </DialogTitle>
          </DialogHeader>
          <div className="prose prose-invert max-w-none overflow-y-auto">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {state.data.markdown}
            </ReactMarkdown>
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
        className={cn(
          "flex h-[80vh] w-[80vw] max-w-[80vw] flex-col overflow-hidden px-10 backdrop-blur-xl sm:max-w-[80vw]",
          target ? READER_TINT[target.type].bg : "bg-popover/85"
        )}
      >
        {target && <ReaderBody target={target} />}
      </DialogContent>
    </Dialog>
  );
}

export { Reader };
