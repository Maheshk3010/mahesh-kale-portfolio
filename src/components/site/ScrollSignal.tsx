import { motion, useScroll, useSpring, useTransform } from "motion/react";

export function ScrollSignal() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 28, mass: 0.35 });
  const markerPosition = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <div
      className="pointer-events-none fixed inset-y-0 left-5 z-40 hidden w-px bg-border xl:block"
      aria-hidden="true"
    >
      <motion.div
        className="absolute inset-x-0 top-0 h-full origin-top bg-primary"
        style={{ scaleY: progress }}
      />
      <motion.span
        className="absolute -left-[3px] top-0 h-[7px] w-[7px] border border-primary bg-background"
        style={{ top: markerPosition }}
      />
    </div>
  );
}
