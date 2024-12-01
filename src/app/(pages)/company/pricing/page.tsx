import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import Testimonials from "../../about/Testimonials";
import FAQSection from "./faq";

export default function PricingPage() {
  const tiers = [
    {
      name: "Starter Pack",
      price: "$299",
      description: "Best for freelancers and personal branding",
      features: [
        "Logo design",
        "Business card design",
        "1 social media banner",
        "Up to 2 revisions",
        "Delivery within 5 days",
      ],
    },
    {
      name: "Professional Pack",
      price: "$899",
      description: "Ideal for small businesses and startups",
      features: [
        "Everything in Starter Pack",
        "Full brand kit (logo, color palette, fonts)",
        "5 social media templates",
        "Website design (3 pages)",
        "3 revision rounds",
        "Delivery within 10 days",
      ],
      highlighted: true,
    },
    {
      name: "Premium Pack",
      price: "Custom",
      description: "Tailored for enterprises and large projects",
      features: [
        "Everything in Professional Pack",
        "Custom illustration & animations",
        "Packaging and print design",
        "Unlimited revisions",
        "Dedicated project manager",
        "Priority support",
      ],
    },
  ];

  const faqs = [
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and bank transfers.",
    },
    {
      question: "Can I request additional revisions?",
      answer: "Yes, additional revisions can be requested for a small fee.",
    },
    {
      question: "What if I need a service not listed?",
      answer:
        "Our Premium Pack can be tailored to any custom requests. Contact us to learn more!",
    },
  ];

  return (
    <div className="bg-background py-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header Section */}
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
            Design Pricing Plans
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Choose a plan that fits your design needs. Our packages are tailored
            for businesses of all sizes.
          </p>
        </div>

        {/* Pricing Cards Section */}
        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {tiers.map((tier) => (
            <Card
              key={tier.name}
              className={`transform transition-transform hover:scale-105 ${tier.highlighted ? "ring-2 ring-primary" : ""}`}
            >
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  {tier.name}
                </CardTitle>
                <CardDescription className="text-sm">
                  {tier.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mt-4 flex items-baseline text-5xl font-bold">
                  {tier.price}
                  {tier.name !== "Premium Pack" && (
                    <span className="text-xl font-semibold text-muted-foreground">
                      /project
                    </span>
                  )}
                </div>
                <ul role="list" className="mt-8 space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex">
                      <Check
                        className="h-6 w-6 flex-shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      <span className="ml-3 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={tier.highlighted ? "default" : "outline"}
                >
                  {tier.name === "Premium Pack" ? "Contact us" : "Get started"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <FAQSection />

        {/* Testimonials Section */}
        <Testimonials />

        {/* Contact CTA Section */}
        <div className="mt-24 text-center">
          <p className="text-base font-semibold text-primary">
            Need a custom solution?
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight">
            Our team is here to help
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Reach out, and we&apos;ll craft a design package to meet your unique
            needs.
          </p>
          <Button className="mt-6">Contact our sales team</Button>
        </div>
      </div>
    </div>
  );
}
