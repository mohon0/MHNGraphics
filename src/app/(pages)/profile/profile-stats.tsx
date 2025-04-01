"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Award, CalendarIcon, ImageIcon, Users } from "lucide-react";

interface ProfileStatsProps {
  designCount: number;
  joinDate: string;
  status: string;
}

export default function ProfileStats({
  designCount,
  joinDate,
  status,
}: ProfileStatsProps) {
  const formattedJoinDate = new Date(joinDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const stats = [
    {
      icon: <ImageIcon className="h-5 w-5 text-primary" />,
      label: "Designs",
      value: designCount,
    },
    {
      icon: <Users className="h-5 w-5 text-primary" />,
      label: "Followers",
      value: Math.floor(Math.random() * 1000), // Placeholder value
    },
    {
      icon: <Award className="h-5 w-5 text-primary" />,
      label: "Status",
      value: status,
    },
    {
      icon: <CalendarIcon className="h-5 w-5 text-primary" />,
      label: "Joined",
      value: formattedJoinDate,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-6"
    >
      <Card>
        <CardContent className="p-0">
          <div className="grid grid-cols-2 divide-x divide-border md:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 * index }}
                className="flex flex-col items-center justify-center p-4 text-center hover:bg-muted/50"
              >
                <div className="mb-2 flex items-center justify-center gap-2">
                  {stat.icon}
                  <span className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </span>
                </div>
                <div className="text-xl font-bold">{stat.value}</div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
