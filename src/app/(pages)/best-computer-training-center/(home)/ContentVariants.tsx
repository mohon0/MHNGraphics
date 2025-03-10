// Define multiple content animation variants
export const contentVariants = [
  {
    id: 1,
    name: "green",
    title: {
      initial: { y: 100, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      transition: { delay: 1.2 },
    },
    description: {
      initial: { x: 100, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      transition: { delay: 1.5 },
    },
    image: {
      initial: { rotateX: 90, opacity: 0 },
      animate: { rotateX: 0, opacity: 1 },
      transition: { delay: 0.5, duration: 1 },
    },
    button: {
      initial: { opacity: 0, rotate: -45 },
      animate: { opacity: 1, rotate: 0 },
      transition: { delay: 1.7 },
    },
  },
  {
    id: 2,
    name: "blue",
    title: {
      initial: { x: -200, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      transition: { delay: 1.2 },
    },
    description: {
      initial: { y: -100, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      transition: { delay: 1.5 },
    },
    image: {
      initial: { rotate: 360, scale: 0.1, opacity: 0 },
      animate: { rotate: 0, scale: 1, opacity: 1 },
      transition: { delay: 1, duration: 2 },
    },
    button: {
      initial: { scale: 0 },
      animate: { scale: 1 },
      transition: { delay: 1.7 },
    },
  },
  {
    id: 1,
    name: "yellow",
    title: {
      initial: { x: -200, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      transition: { delay: 1.2 },
    },
    description: {
      initial: { y: -100, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      transition: { delay: 1.5 },
    },
    image: {
      initial: { x: -200, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      transition: { delay: 1, duration: 1 },
    },
    button: {
      initial: { x: 200, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      transition: { delay: 1.7, duration: 1 },
    },
  },
];
