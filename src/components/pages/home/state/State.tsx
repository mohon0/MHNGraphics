import React from 'react'
import { Search, ArrowRight, Star, Download, Users, ImageIcon } from 'lucide-react'

export default function State() {
  return (
    <section className="py-12 bg-black/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: 'Active Users', value: '10K+', icon: Users },
            { label: 'Total Downloads', value: '50K+', icon: Download },
            { label: 'Available Assets', value: '100K+', icon: ImageIcon },
            { label: 'Average Rating', value: '4.8', icon: Star },
          ].map((stat, index) => (
            <div key={index} className="space-y-2">
              <stat.icon className="h-6 w-6 mx-auto text-primary" />
              <h3 className="text-2xl md:text-3xl font-bold">{stat.value}</h3>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

