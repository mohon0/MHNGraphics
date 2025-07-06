"use client";

import { useEffect, useState } from "react";

export default function Component() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative px-2 sm:px-4 md:px-6">
      {/* Main heading - clickable */}
      <a
        href="/best-computer-training-center" // Replace with your external URL
        className="group block cursor-pointer"
      >
        <div className="relative pt-6 text-center sm:pt-8 md:pt-10">
          {/* First line with slide-in from left - responsive sizing */}
          <h1
            className={`mb-4 mt-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text py-4 text-3xl font-black leading-tight tracking-tight text-transparent transition-all duration-1000 group-hover:from-orange-500 group-hover:via-red-500 group-hover:to-pink-500 sm:mb-6 sm:mt-6 sm:py-6 sm:text-4xl sm:leading-relaxed md:mb-8 md:mt-8 md:py-8 md:text-5xl lg:py-10 lg:text-6xl xl:text-7xl 2xl:text-8xl ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-full opacity-0"
            }`}
          >
            <span className="inline-block animate-bounce [animation-delay:0ms]">
              B
            </span>
            <span className="inline-block animate-bounce [animation-delay:100ms]">
              E
            </span>
            <span className="inline-block animate-bounce [animation-delay:200ms]">
              S
            </span>
            <span className="inline-block animate-bounce [animation-delay:300ms]">
              T
            </span>
            <span className="inline-block w-2 sm:w-4 md:w-6 lg:w-8"></span>
            <span className="inline-block animate-bounce [animation-delay:400ms]">
              C
            </span>
            <span className="inline-block animate-bounce [animation-delay:500ms]">
              O
            </span>
            <span className="inline-block animate-bounce [animation-delay:600ms]">
              M
            </span>
            <span className="inline-block animate-bounce [animation-delay:700ms]">
              P
            </span>
            <span className="inline-block animate-bounce [animation-delay:800ms]">
              U
            </span>
            <span className="inline-block animate-bounce [animation-delay:900ms]">
              T
            </span>
            <span className="inline-block animate-bounce [animation-delay:1000ms]">
              E
            </span>
            <span className="inline-block animate-bounce [animation-delay:1100ms]">
              R
            </span>
          </h1>

          {/* Second line with slide-in from right - responsive sizing */}
          <h1
            className={`mb-6 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 bg-clip-text text-4xl font-black leading-tight tracking-tight text-transparent transition-all delay-300 duration-1000 group-hover:from-cyan-500 group-hover:via-blue-500 group-hover:to-indigo-500 sm:mb-8 sm:text-5xl sm:leading-relaxed md:mb-10 md:text-6xl lg:mb-12 lg:text-7xl xl:text-8xl 2xl:text-9xl ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-full opacity-0"
            }`}
          >
            <span className="inline-block animate-pulse [animation-delay:200ms]">
              T
            </span>
            <span className="inline-block animate-pulse [animation-delay:300ms]">
              R
            </span>
            <span className="inline-block animate-pulse [animation-delay:400ms]">
              A
            </span>
            <span className="inline-block animate-pulse [animation-delay:500ms]">
              I
            </span>
            <span className="inline-block animate-pulse [animation-delay:600ms]">
              N
            </span>
            <span className="inline-block animate-pulse [animation-delay:700ms]">
              I
            </span>
            <span className="inline-block animate-pulse [animation-delay:800ms]">
              N
            </span>
            <span className="inline-block animate-pulse [animation-delay:900ms]">
              G
            </span>
            <span className="inline-block w-2 sm:w-4 md:w-6 lg:w-8"></span>
            <span className="inline-block animate-pulse [animation-delay:1000ms]">
              C
            </span>
            <span className="inline-block animate-pulse [animation-delay:1100ms]">
              E
            </span>
            <span className="inline-block animate-pulse [animation-delay:1200ms]">
              N
            </span>
            <span className="inline-block animate-pulse [animation-delay:1300ms]">
              T
            </span>
            <span className="inline-block animate-pulse [animation-delay:1400ms]">
              E
            </span>
            <span className="inline-block animate-pulse [animation-delay:1500ms]">
              R
            </span>
          </h1>

          {/* Animated decorative elements - responsive */}
          <div
            className={`delay-600 mb-4 flex items-center justify-center gap-2 transition-all duration-1000 sm:mb-6 sm:gap-3 md:mb-8 md:gap-4 ${
              isVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"
            }`}
          >
            <div className="flex gap-0.5 sm:gap-1">
              <div className="h-1.5 w-1.5 animate-ping rounded-full bg-emerald-500 sm:h-2 sm:w-2"></div>
              <div className="h-1.5 w-1.5 animate-ping rounded-full bg-teal-500 [animation-delay:200ms] sm:h-2 sm:w-2"></div>
              <div className="h-1.5 w-1.5 animate-ping rounded-full bg-cyan-500 [animation-delay:400ms] sm:h-2 sm:w-2"></div>
            </div>
            <div className="h-0.5 w-16 animate-pulse rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 transition-all duration-500 group-hover:w-20 group-hover:from-orange-500 group-hover:via-red-500 group-hover:to-pink-500 sm:h-1 sm:w-24 sm:group-hover:w-32 md:w-32 md:group-hover:w-48"></div>
            <div className="flex gap-0.5 sm:gap-1">
              <div className="h-1.5 w-1.5 animate-ping rounded-full bg-purple-500 [animation-delay:600ms] sm:h-2 sm:w-2"></div>
              <div className="h-1.5 w-1.5 animate-ping rounded-full bg-pink-500 [animation-delay:800ms] sm:h-2 sm:w-2"></div>
              <div className="h-1.5 w-1.5 animate-ping rounded-full bg-rose-500 [animation-delay:1000ms] sm:h-2 sm:w-2"></div>
            </div>
          </div>

          {/* Hover indicator - responsive text */}
          <div
            className={`opacity-0 transition-all duration-500 group-hover:opacity-100 ${
              isVisible ? "translate-y-0" : "translate-y-4"
            }`}
          >
            <p className="animate-bounce bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text px-2 text-sm font-semibold text-transparent sm:text-base md:text-lg">
              ✨ Click to explore our courses ✨
            </p>
          </div>

          {/* Floating elements on hover - responsive positioning */}
          <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <div className="absolute left-[15%] top-[20%] h-2 w-2 animate-spin rounded-full bg-emerald-400 [animation-duration:3s] sm:left-1/4 sm:top-1/4 sm:h-3 sm:w-3"></div>
            <div className="absolute right-[15%] top-[25%] h-1.5 w-1.5 animate-spin rounded-full bg-pink-400 [animation-delay:300ms] [animation-duration:2s] sm:right-1/4 sm:top-1/3 sm:h-2 sm:w-2"></div>
            <div className="absolute bottom-[35%] left-[25%] h-3 w-3 animate-spin rounded-full bg-cyan-400 [animation-delay:600ms] [animation-duration:4s] sm:bottom-1/3 sm:left-1/3 sm:h-4 sm:w-4"></div>
            <div className="absolute bottom-[20%] right-[25%] h-1.5 w-1.5 animate-spin rounded-full bg-purple-400 [animation-delay:900ms] [animation-duration:2.5s] sm:bottom-1/4 sm:right-1/3 sm:h-2 sm:w-2"></div>
          </div>
        </div>
      </a>
    </div>
  );
}
