"use client";
import { TypeAnimation } from "react-type-animation";

export default function AnimatedText() {
  return (
    <TypeAnimation
      cursor
      sequence={[
        "I Am A Freelancer",
        3500,
        "I Am A Graphics Designer",
        3500,
        "I Am An IT Teacher",
        3500,
        "A Passionate Learner",
        3500,
      ]}
      wrapper="p"
      speed={50}
      repeat={Infinity}
      className="mt-2 text-xl md:mt-3 md:text-3xl"
    />
  );
}
