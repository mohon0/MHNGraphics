import { Button } from "@/components/ui/button";
export default function Cta() {
  return (
    <section className="py-16">
      <div className="px-4">
        <div className="rounded-2xl bg-primary p-8 text-center md:p-12">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            Ready to Start Creating?
          </h2>
          <p className="mx-auto mb-8 text-white/90">
            Join thousands of creators who are already using Oylkka Graphics to
            bring their ideas to life.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" className="border border-white">
              Get Started Free
            </Button>
            <Button size="lg" variant="outline">
              View Pricing
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
