// Define multiple reveal animations
export const revealVariants = [
  {
    initial: { height: "100%", width: "100%", rotate: -45 },
    animate: { height: "0%", width: "0%", rotate: 0 },
    transition: { duration: 1, ease: "easeInOut" },
  },
  {
    initial: { scale: 1, borderRadius: "0%" },
    animate: { scale: 0, borderRadius: "100%" },
    transition: { duration: 1, ease: "easeInOut" },
  },
  {
    initial: { rotateX: 0, rotateY: 0, scale: 1 },
    animate: { rotateX: 180, rotateY: 180, scale: 0 },
    transition: { duration: 1.5, ease: "easeInOut" },
  },
  {
    initial: { rotateY: 0, opacity: 1 },
    animate: { rotateY: 180, opacity: 0 },
    transition: { duration: 1, ease: "easeInOut" },
  },
  {
    initial: { rotateX: 0, rotateY: 0, rotateZ: 0, opacity: 1 },
    animate: { rotateX: 180, rotateY: 180, rotateZ: 180, opacity: 0 },
    transition: { duration: 1.5, ease: "easeInOut" },
  },
  {
    initial: { x: "0%", scale: 0.8 },
    animate: { x: "100%", scale: 1 },
    transition: { duration: 1, ease: "easeInOut" },
  },
];
