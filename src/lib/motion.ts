import type { Variants } from "motion/react";

export const motionEase = [0.22, 1, 0.36, 1] as const;

export const motionDuration = {
  micro: 0.24,
  reveal: 0.58,
  cinematic: 0.82,
} as const;

export const revealUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: motionDuration.reveal, ease: motionEase },
  },
};

export const revealLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: motionDuration.reveal, ease: motionEase },
  },
};

export const revealScale: Variants = {
  hidden: { opacity: 0, scale: 0.975, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: motionDuration.cinematic, ease: motionEase },
  },
};

export const stagger = (delayChildren = 0.08, staggerChildren = 0.08): Variants => ({
  hidden: {},
  visible: { transition: { delayChildren, staggerChildren } },
});

export const inView = { once: true, margin: "-64px" } as const;

export const heroEnter = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 22, clipPath: "inset(0 0 100% 0)" },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: motionDuration.cinematic, delay, ease: motionEase },
  },
});
