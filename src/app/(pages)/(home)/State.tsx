"use client";

import { motion } from "framer-motion";

export default function Component() {
  // Function to split text into animated letters
  const AnimatedWord = ({
    children,
    className,
    delay = 0,
  }: {
    children: string;
    className: string;
    delay?: number;
  }) => {
    const letters = children.split("");

    return (
      <motion.div
        initial={{ opacity: 0, y: 100, rotateX: -90 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay }}
        whileHover={{ scale: 1.1 }}
        className={className}
      >
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: delay + index * 0.1,
              duration: 0.6,
              ease: "easeOut",
            }}
            whileHover={{
              y: -10,
              color: "#f59e0b",
              transition: { duration: 0.2 },
            }}
            className="inline-block cursor-pointer"
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </motion.div>
    );
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 px-4 py-20 text-center">
      <motion.a
        href="/bes-computer-training-center"
        className="block cursor-pointer"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.3, delayChildren: 0.2 }}
        >
          {/* Main heading with responsive layout */}
          <div className="mb-8">
            {/* First line: BEST COMPUTER */}
            <div className="mb-4 flex flex-col lg:flex-row lg:items-center lg:justify-center lg:gap-8">
              <AnimatedWord
                className="text-4xl font-black text-blue-900 md:text-6xl lg:text-7xl xl:text-8xl"
                delay={0}
              >
                BEST
              </AnimatedWord>
              <AnimatedWord
                className="text-3xl font-bold text-purple-700 md:text-5xl lg:text-6xl xl:text-7xl"
                delay={0.4}
              >
                COMPUTER
              </AnimatedWord>
            </div>

            {/* Second line: TRAINING CENTER */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center lg:gap-8">
              <AnimatedWord
                className="text-4xl font-black text-pink-600 md:text-6xl lg:text-7xl xl:text-8xl"
                delay={0.8}
              >
                TRAINING
              </AnimatedWord>
              <AnimatedWord
                className="text-3xl font-bold text-indigo-800 md:text-5xl lg:text-6xl xl:text-7xl"
                delay={1.2}
              >
                CENTER
              </AnimatedWord>
            </div>
          </div>

          {/* Animated decorative line with pulse */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "200px", opacity: 1 }}
            transition={{ delay: 2, duration: 1, ease: "easeOut" }}
            className="relative mx-auto mb-6 h-2 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 blur-sm"
            />
          </motion.div>

          {/* Info text with breathing animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 0.5 }}
          >
            <motion.p
              className="text-xl font-medium text-gray-700"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              ✨ Click to view details ✨
            </motion.p>
          </motion.div>

          {/* Enhanced floating elements */}
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="absolute left-10 top-10 h-4 w-4 rounded-full bg-blue-400 opacity-60"
          />

          <motion.div
            animate={{
              y: [0, 25, 0],
              rotate: [0, -360],
              scale: [1, 0.8, 1],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute right-20 top-20 h-6 w-6 rounded-full bg-purple-400 opacity-60"
          />

          <motion.div
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute bottom-10 left-1/4 h-3 w-3 rounded-full bg-pink-400 opacity-60"
          />

          <motion.div
            animate={{
              y: [0, 15, 0],
              x: [0, -15, 0],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="absolute bottom-20 right-1/3 h-5 w-5 rounded-full bg-yellow-400 opacity-50"
          />
        </motion.div>
      </motion.a>
    </div>
  );
}
