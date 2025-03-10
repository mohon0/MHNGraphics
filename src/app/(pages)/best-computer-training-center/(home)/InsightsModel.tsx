import NumberCounter from "number-counter";
import { useState } from "react";
import { IconType } from "react-icons";
import { useInView } from "react-intersection-observer";

interface InsightsModelProps {
  number: number;
  label: string;
  number2: number;
  icon: IconType;
  bgColor?: string;
  borderColor?: string;
}

export default function InsightsModel({
  number,
  label,
  icon: Icon,
  number2,
  bgColor = "bg-gray-800",
  borderColor = "border-gray-500",
}: InsightsModelProps) {
  const [startCounter, setStartCounter] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger only once
    threshold: 0.1, // Trigger when 10% of the component is in view
  });

  // Start the counter when the component is in view
  if (inView && !startCounter) {
    setStartCounter(true);
  }

  return (
    <div ref={ref} className="flex flex-col items-center justify-center gap-3">
      <div
        className={`rounded-full border-4 ${borderColor} ${bgColor} p-3 text-white`}
        aria-label={`${label} Icon`}
      >
        <Icon size={30} />
      </div>
      <div className="text-primary-200 text-3xl font-bold md:text-4xl">
        {startCounter && (
          <NumberCounter end={number} start={number2} delay={4} />
        )}
      </div>
      <div className="text-primary-100 text-xl font-bold md:text-2xl">
        {label}
      </div>
    </div>
  );
}
