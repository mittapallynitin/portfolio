import { useRef } from "react";
import { motion } from "motion/react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ResumeSection } from "@/features/resume/ResumeSection";
import { useUrlState } from "@/hooks/useUrlState";
import { usePullToDismiss } from "@/hooks/usePullToDismiss";

function ResumeOverlay() {
  const [value, setValue] = useUrlState("resume");
  const open = value === "open";
  const close = () => setValue(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { y, onPan, onPanEnd } = usePullToDismiss(scrollRef, close);

  return (
    <Dialog open={open} onOpenChange={(next) => !next && close()}>
      <DialogContent
        showCloseButton={false}
        className="flex h-screen w-screen max-w-full flex-col overflow-hidden rounded-none bg-[#3a0e26]/90 px-0 pt-6 pb-0 backdrop-blur-xl sm:h-[92vh] sm:w-[80vw] sm:max-w-[80vw] sm:rounded-4xl sm:px-6 sm:pt-10 sm:pb-6"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          style={{ y }}
          onPan={onPan}
          onPanEnd={onPanEnd}
          className="flex min-h-0 flex-1 touch-pan-x flex-col gap-6"
        >
          <div className="mx-auto mb-1 h-1 w-10 shrink-0 rounded-full bg-current/20 sm:hidden" />
          <DialogHeader className="px-4 sm:px-10">
            <DialogTitle className="text-lg font-bold text-pink-300">
              Full Resume
            </DialogTitle>
          </DialogHeader>
          <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto px-4 pb-6 sm:px-10 sm:pb-10">
            <div className="w-full rounded-2xl bg-black/20 p-4 ring-1 ring-white/5 shadow-2xl shadow-black/40 sm:mx-auto sm:max-w-4xl sm:rounded-3xl sm:p-8">
              <ResumeSection />
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}

export { ResumeOverlay };
