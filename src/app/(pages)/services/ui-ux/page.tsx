import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import img1 from "@/images/services/ui.jpg";
import img2 from "@/images/services/ui1.jpg";
import img3 from "@/images/services/ui2.jpg";
import img4 from "@/images/services/ui3.jpg";
import {
  ArrowRight,
  CheckCircle,
  Layout,
  Lightbulb,
  Palette,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Testimonials from "../../about/Testimonials";

const uiuxServices = [
  {
    title: "User Research",
    description:
      "Understand your users' needs, behaviors, and motivations through in-depth research.",
    icon: Users,
  },
  {
    title: "Information Architecture",
    description:
      "Organize and structure your product's content for optimal user experience.",
    icon: Layout,
  },
  {
    title: "Interaction Design",
    description:
      "Create intuitive and engaging user interactions that delight your users.",
    icon: Lightbulb,
  },
  {
    title: "Visual Design",
    description:
      "Craft beautiful and consistent visual elements that align with your brand.",
    icon: Palette,
  },
];

const designProcess = [
  {
    title: "Empathize",
    description:
      "Understand user needs and pain points through research and analysis.",
  },
  {
    title: "Define",
    description: "Clearly articulate the problem we're solving for users.",
  },
  {
    title: "Ideate",
    description: "Generate a wide range of creative solutions and ideas.",
  },
  {
    title: "Prototype",
    description: "Build interactive mockups to test and refine our solutions.",
  },
  {
    title: "Test",
    description:
      "Validate our designs with real users and iterate based on feedback.",
  },
];

export default function UIUXPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background to-background/95 text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="container relative z-10 mx-auto px-4">
          <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-start">
            <div className="lg:w-1/2">
              <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                Crafting Digital Experiences That Inspire
              </h1>
              <p className="mb-8 text-xl text-muted-foreground">
                Elevate your digital presence with our expert UI/UX design
                services. We create intuitive, engaging, and user-centered
                designs that drive results.
              </p>
              <Button asChild size="lg" className="group">
                <Link href="#contact">
                  Start Your Project
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
            <div className="lg:w-1/2">
              <div className="relative">
                <Image
                  src={img1}
                  alt="UI/UX Design Illustration"
                  width={700}
                  height={500}
                  className="rounded-lg shadow-2xl transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-primary/20 backdrop-blur-md"></div>
                <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-secondary/20 backdrop-blur-md"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-background via-background to-background/50"></div>
      </section>

      {/* Services Section */}
      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Our UI/UX Services
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {uiuxServices.map((service, index) => (
              <Card
                key={service.title}
                className="bg-card transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
              >
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{service.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Design Process Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Our Design Process
          </h2>
          <div className="flex flex-wrap items-start justify-center gap-8">
            {designProcess.map((step, index) => (
              <div
                key={step.title}
                className="group flex w-full flex-col items-center sm:w-1/2 md:w-1/3 lg:w-1/5"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                  {index + 1}
                </div>
                <h3 className="mb-2 text-center text-xl font-semibold">
                  {step.title}
                </h3>
                <p className="text-center text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Case Studies</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="overflow-hidden">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={img2}
                  alt="E-commerce Redesign"
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle>E-commerce Website Redesign</CardTitle>
                <CardDescription>
                  Increasing conversions through improved user experience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  We redesigned the user interface of an e-commerce platform,
                  focusing on streamlining the checkout process and improving
                  product discovery.
                </p>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center text-sm">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span>35% increase in conversions</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span>25% decrease in cart abandonment</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={img3}
                  alt="Mobile App UX"
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle>Mobile App UX Enhancement</CardTitle>
                <CardDescription>
                  Boosting user engagement and retention
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Our team revamped the user experience of a mobile fitness app,
                  introducing personalized workout plans and social features.
                </p>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center text-sm">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span>50% increase in daily active users</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span>40% boost in user retention</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={img4}
                  alt="SaaS Dashboard"
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle>SaaS Dashboard Optimization</CardTitle>
                <CardDescription>
                  Simplifying complex data for better decision-making
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  We redesigned a complex SaaS dashboard, focusing on data
                  visualization and user-friendly controls.
                </p>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center text-sm">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span>60% reduction in learning curve</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span>45% increase in feature adoption</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <Testimonials />

      {/* Call to Action Section */}
      <section id="contact" className="bg-muted py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">
            Ready to Elevate Your User Experience?
          </h2>
          <p className="mb-8 text-xl text-muted-foreground">
            Let&#39;s create intuitive and engaging designs that your users will
            love
          </p>
          <Button asChild size="lg" className="group">
            <Link href="/contact">
              Get a Free Consultation
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
