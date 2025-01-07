import { Download, ImageIcon, Star, Users } from "lucide-react";

export default function State() {
  return (
    <section className="bg-black/5 py-6 md:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
          {[
            { label: "Active Users", value: "10K+", icon: Users },
            { label: "Total Downloads", value: "50K+", icon: Download },
            { label: "Available Assets", value: "100K+", icon: ImageIcon },
            { label: "Average Rating", value: "4.8", icon: Star },
          ].map((stat, index) => (
            <div key={index} className="space-y-2">
              <stat.icon className="mx-auto h-6 w-6 text-primary" />
              <p className="text-xl font-bold md:text-3xl">{stat.value}</p>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
