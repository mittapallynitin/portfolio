import type { Variants } from "motion/react";

export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.2, staggerChildren: 0.18 } },
};

const ENTRANCE_OFFSET = 48;
const ENTRANCE_TRANSITION = { duration: 0.75, ease: "easeOut" } as const;

export const staggerItemFromLeft: Variants = {
  hidden: { opacity: 0, x: -ENTRANCE_OFFSET },
  show: { opacity: 1, x: 0, transition: ENTRANCE_TRANSITION },
};

export const staggerItemFromRight: Variants = {
  hidden: { opacity: 0, x: ENTRANCE_OFFSET },
  show: { opacity: 1, x: 0, transition: ENTRANCE_TRANSITION },
};

export const staggerItemFromTop: Variants = {
  hidden: { opacity: 0, y: -ENTRANCE_OFFSET },
  show: { opacity: 1, y: 0, transition: ENTRANCE_TRANSITION },
};

export const staggerItemFromBottom: Variants = {
  hidden: { opacity: 0, y: ENTRANCE_OFFSET },
  show: { opacity: 1, y: 0, transition: ENTRANCE_TRANSITION },
};
