import { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import type { IconType } from 'react-icons';
import { useInView } from 'react-intersection-observer';

interface InsightsModelProps {
  end: number;
  label: string;
  start?: number;
  icon: IconType;
  duration?: number;
}

export default function InsightsModel({
  end,
  label,
  icon: Icon,
  start = 0,

  duration = 4,
}: InsightsModelProps) {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView && !shouldAnimate) {
      setShouldAnimate(true);
    }
  }, [inView, shouldAnimate]);

  return (
    <div ref={ref} className='flex flex-col items-center justify-center gap-3'>
      <div
        className={`rounded-full  bg-primary/10 p-4 text-primary`}
        role='img'
        aria-label={label}
      >
        <Icon size={30} />
      </div>
      <div className='text-3xl font-bold text-primary md:text-4xl'>
        {shouldAnimate && (
          <CountUp
            start={start}
            end={end}
            duration={duration}
            separator=','
            decimals={0}
          />
        )}
      </div>
      <div className='text-xl font-bold md:text-2xl'>{label}</div>
    </div>
  );
}
