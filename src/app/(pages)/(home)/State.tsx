"use client";

import { cn } from "@/lib/utils";
import { Download, ImageIcon, Star, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";

export default function StatsAlt() {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 },
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [isInView]);

  const stats = [
    {
      label: "Active Users",
      value: 10,
      suffix: "K+",
      icon: Users,
      color: "from-blue-500 to-indigo-600",
    },
    {
      label: "Total Downloads",
      value: 50,
      suffix: "K+",
      icon: Download,
      color: "from-emerald-500 to-teal-600",
    },
    {
      label: "Available Assets",
      value: 100,
      suffix: "K+",
      icon: ImageIcon,
      color: "from-orange-500 to-amber-600",
    },
    {
      label: "Average Rating",
      value: 4.8,
      decimals: 1,
      icon: Star,
      color: "from-rose-500 to-pink-600",
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-[58rem] text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Our Platform in Numbers
          </h2>
          <p className="mt-4 text-muted-foreground">
            Discover why thousands of creators choose our platform every day
          </p>
        </div>

        <div
          ref={ref}
          className="mt-12 grid gap-6 sm:grid-cols-2 md:mt-16 lg:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg border bg-background p-8 text-center shadow-sm transition-all duration-300 hover:shadow-md"
              style={{ transitionDelay: isInView ? `${index * 100}ms` : "0ms" }}
            >
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-10",
                  stat.color,
                )}
              />

              <div className="relative">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>

                <div className="space-y-2">
                  <p className="text-3xl font-bold tracking-tight md:text-4xl">
                    {isInView && (
                      <CountUp
                        start={0}
                        end={stat.value}
                        duration={2.5}
                        decimals={stat.decimals || 0}
                        suffix={stat.suffix || ""}
                        useEasing
                      />
                    )}
                  </p>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
