"use client";
import blue from "@/images/best-computer/blue.jpg";
import green from "@/images/best-computer/green.jpg";
import yellow from "@/images/best-computer/yellow.jpg";
import { AnimatePresence, motion, wrap } from "framer-motion";
import Image from "next/image";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { contentVariants } from "./ContentVariants";
import { revealVariants } from "./RevealVariants";
import { contentData } from "./SliderData";

// Array of images
const images = [green, blue, yellow];

type Direction = 1 | -1;

const variants = {
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
};

const swipeConfidenceThreshold = 500;
const swipePower = (offset: number, velocity: number) =>
  Math.abs(offset) * velocity;

export const Slider: React.FC = () => {
  const [[page, direction], setPage] = useState<[number, Direction]>([0, 1]);
  const [progressKey, setProgressKey] = useState(0); // Key to trigger progress bar reset
  const imageIndex = useMemo(() => wrap(0, images.length, page), [page]);

  const paginate = useCallback(
    (newDirection: Direction) => {
      setPage([page + newDirection, newDirection]);
    },
    [page],
  );

  const goToPage = (index: number) => {
    setPage([index, index > imageIndex ? 1 : -1]);
  };

  useEffect(() => {
    const intervalDuration = 8000; // Duration in milliseconds
    const interval = setInterval(() => {
      paginate(1);
    }, intervalDuration);

    // Reset progress animation by changing the key
    setProgressKey((prev) => prev + 1);

    return () => clearInterval(interval);
  }, [paginate, page]);

  const randomVariantIndex = useMemo(
    () => Math.floor(Math.random() * revealVariants.length),
    [],
  );
  const selectedVariant = revealVariants[randomVariantIndex];

  const selectedContentVariant = contentVariants[imageIndex];

  const previousImageIndex =
    imageIndex === 0 ? images.length - 1 : imageIndex - 1;

  return (
    <div className="relative h-[36rem] w-full overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
            delay: 2,
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(_e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className="absolute left-0 top-0 h-full w-full"
        >
          {/* Image Reveal Mask */}
          <motion.div
            className="absolute left-0 top-0 h-full w-full"
            initial={selectedVariant.initial}
            animate={selectedVariant.animate}
            transition={selectedVariant.transition}
            style={{
              backgroundImage: `url(${images[previousImageIndex].src})`,
              backgroundPosition: "center",
              backgroundRepeat: "repeat",
              zIndex: 1,
            }}
          ></motion.div>

          {/* Background Image */}
          <div
            className="absolute left-0 top-0 h-full w-full bg-center"
            style={{
              backgroundImage: `url(${images[imageIndex].src})`,
              backgroundRepeat: "repeat",
              zIndex: 0,
            }}
          ></div>

          {/* Content Over the Image */}
          <div className="absolute left-1/2 top-20 z-10 mx-auto grid w-full max-w-6xl -translate-x-1/2 justify-center gap-10 px-2 text-white md:top-32 md:h-full md:grid-cols-2">
            <div
              style={{
                perspective: 1000,
              }}
            >
              <motion.div
                whileInView={selectedContentVariant.image.animate}
                initial={selectedContentVariant.image.initial}
                animate={selectedContentVariant.image.animate}
                transition={selectedContentVariant.image.transition}
              >
                <Image
                  src={contentData[imageIndex].img}
                  alt=""
                  className="mx-auto rounded-lg drop-shadow-2xl"
                />
              </motion.div>
            </div>

            <div className="flex flex-col gap-3 md:gap-20">
              <motion.h1
                initial={selectedContentVariant.title.initial}
                animate={selectedContentVariant.title.animate}
                transition={selectedContentVariant.title.transition}
                className="text-2xl font-bold md:text-4xl"
              >
                {contentData[imageIndex].title}
              </motion.h1>
              <motion.p
                initial={selectedContentVariant.description.initial}
                animate={selectedContentVariant.description.animate}
                transition={selectedContentVariant.description.transition}
                className="text-sm md:text-lg"
              >
                {contentData[imageIndex].description}
              </motion.p>
              <motion.button
                initial={selectedContentVariant.button.initial}
                animate={selectedContentVariant.button.animate}
                transition={selectedContentVariant.button.transition}
                className="w-fit rounded bg-slate-100 px-3 py-2 font-bold text-black shadow-lg md:px-6 md:py-3 md:text-lg"
              >
                শেখা শুরু করুন
              </motion.button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progress Bar */}
      <div className="absolute left-0 top-0 z-50 h-1 w-full">
        <div
          key={progressKey} // Trigger animation reset
          className="h-full bg-gray-600 opacity-50"
          style={{ animation: `progress 8s linear` }}
        ></div>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-1/2 z-50 flex -translate-x-1/2 space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToPage(index)}
            className={`h-3 w-3 rounded-full transition-colors ${
              imageIndex === index ? "bg-white" : "border"
            }`}
          />
        ))}
      </div>

      {/* Progress Bar Animation */}
      <style>
        {`
          @keyframes progress {
            from { width: 0%; }
            to { width: 100%; }
          }
        `}
      </style>
    </div>
  );
};
