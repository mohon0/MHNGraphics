import React from 'react'
import { Button } from '@/components/ui/button'
export default function Cta() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-primary to-primary/95 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Creating?
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of creators who are already using MHN Graphics to bring their ideas to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className='border-white border'>
              Get Started Free
            </Button>
            <Button size="lg" variant="outline">
              View Pricing
            </Button>
          </div>
        </div>
      </div>
    </section>)
}

