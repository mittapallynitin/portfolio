import { motion } from "motion/react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ResumeSection } from "@/features/resume/ResumeSection";
import { useUrlState } from "@/hooks/useUrlState";

function ResumeOverlay() {
  const [value, setValue] = useUrlState("resume");
  const open = value === "open";

  return (
    <Dialog open={open} onOpenChange={(next) => !next && setValue(null)}>
      <DialogContent className="flex h-[80vh] w-[80vw] max-w-[80vw] flex-col overflow-hidden bg-[#3a0e26]/90 px-10 backdrop-blur-xl sm:max-w-[80vw]">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="flex min-h-0 flex-1 flex-col gap-6"
        >
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-pink-300">
              Full Resume
            </DialogTitle>
          </DialogHeader>
          <div className="mx-auto w-full max-w-4xl overflow-y-auto">
            <ResumeSection />
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}

export { ResumeOverlay };
