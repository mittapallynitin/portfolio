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
      className="flex min-h-0 w-full flex-1 flex-col gap-6"
    >
      {state.status === "loading" && (
        <p className="mx-auto w-full max-w-2xl text-sm text-muted-foreground">
          Loading...
        </p>
      )}
      {state.status === "error" && (
        <p className="mx-auto w-full max-w-2xl text-sm text-destructive">
          Couldn't load content.
        </p>
      )}
      {state.status === "success" && (
        <>
          <DialogHeader className="mx-auto w-full max-w-2xl">
            <DialogTitle className={cn("text-lg font-bold", READER_TINT[target.type].accent)}>
              {state.data.title}
            </DialogTitle>
          </DialogHeader>
          <div className="min-h-0 flex-1 overflow-y-auto pr-10">
            <div className="prose prose-invert mx-auto max-w-2xl rounded-3xl bg-black/20 p-8 ring-1 ring-white/5 shadow-2xl shadow-black/40">
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
        className={cn(
          "flex h-[92vh] w-[80vw] max-w-[80vw] flex-col overflow-hidden pl-10 pr-2 backdrop-blur-xl sm:max-w-[80vw]",
          target ? READER_TINT[target.type].bg : "bg-popover/85"
        )}
      >
        {target && <ReaderBody target={target} />}
      </DialogContent>
    </Dialog>
  );
}

export { Reader };
