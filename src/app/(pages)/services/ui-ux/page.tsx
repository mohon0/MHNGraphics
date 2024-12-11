import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

const uiuxServices = [
  {
    title: "User Research",
    description:
      "Understand your users needs, behaviors, and motivations through in-depth research.",
    icon: Users,
  },
  {
    title: "Information Architecture",
    description:
      "Organize and structure your products content for optimal user experience.",
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
    description: "Clearly articulate the problem were solving for users.",
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
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="container relative z-10 mx-auto px-4">
          <div className="flex flex-col items-center gap-12 lg:flex-row">
            <div className="lg:w-1/2">
              <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                Crafting Digital Experiences That{" "}
                <span className="text-primary">Inspire</span>
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
              <Image
                src="https://img.freepik.com/free-vector/gradient-ui-ux-background_23-2149065288.jpg?w=1380&h=980&t=st=1701702614~exp=1701703214~hmac=b99ccd0351a8dea77d6e5e9d48c5b65f6cb0834e7c28d4f03b9e84b8f8f8f8f8"
                alt="UI/UX Design Illustration"
                width={700}
                height={500}
                className="rounded-lg shadow-2xl"
              />
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
            {uiuxServices.map((service) => (
              <Card
                key={service.title}
                className="bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
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
                className="flex w-full flex-col items-center sm:w-1/2 md:w-1/3 lg:w-1/5"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
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
      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Case Studies</h2>
          <Tabs defaultValue="study1" className="w-full">
            <TabsList className="mb-8 grid w-full grid-cols-3">
              <TabsTrigger value="study1">E-commerce Redesign</TabsTrigger>
              <TabsTrigger value="study2">Mobile App UX</TabsTrigger>
              <TabsTrigger value="study3">SaaS Dashboard</TabsTrigger>
            </TabsList>
            <TabsContent value="study1">
              <Card>
                <CardHeader>
                  <CardTitle>E-commerce Website Redesign</CardTitle>
                  <CardDescription>
                    Increasing conversions through improved user experience
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Image
                    src="https://img.freepik.com/free-vector/app-development-illustration_52683-47931.jpg?w=1380&h=980&t=st=1701702698~exp=1701703298~hmac=b99ccd0351a8dea77d6e5e9d48c5b65f6cb0834e7c28d4f03b9e84b8f8f8f8f8"
                    alt="E-commerce Redesign"
                    width={1000}
                    height={600}
                    className="rounded-lg"
                  />
                  <p className="text-muted-foreground">
                    We redesigned the user interface of an e-commerce platform,
                    focusing on streamlining the checkout process and improving
                    product discovery. The result was a 35% increase in
                    conversion rate and a 25% decrease in cart abandonment.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-4">
                    <div className="flex items-center">
                      <CheckCircle className="mr-2 text-green-500" />
                      <span>35% increase in conversions</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="mr-2 text-green-500" />
                      <span>25% decrease in cart abandonment</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="study2">
              <Card>
                <CardHeader>
                  <CardTitle>Mobile App UX Enhancement</CardTitle>
                  <CardDescription>
                    Boosting user engagement and retention
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Image
                    src="https://img.freepik.com/free-vector/gradient-ui-ux-background_23-2149065292.jpg?w=1380&h=980&t=st=1701702734~exp=1701703334~hmac=b99ccd0351a8dea77d6e5e9d48c5b65f6cb0834e7c28d4f03b9e84b8f8f8f8f8"
                    alt="Mobile App UX"
                    width={1000}
                    height={600}
                    className="rounded-lg"
                  />
                  <p className="text-muted-foreground">
                    Our team revamped the user experience of a mobile fitness
                    app, introducing personalized workout plans and social
                    features. These improvements led to a 50% increase in daily
                    active users and a 40% boost in user retention.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-4">
                    <div className="flex items-center">
                      <CheckCircle className="mr-2 text-green-500" />
                      <span>50% increase in daily active users</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="mr-2 text-green-500" />
                      <span>40% boost in user retention</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="study3">
              <Card>
                <CardHeader>
                  <CardTitle>SaaS Dashboard Optimization</CardTitle>
                  <CardDescription>
                    Simplifying complex data for better decision-making
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Image
                    src="https://img.freepik.com/free-vector/gradient-infographic-template_23-2149376726.jpg?w=1380&h=980&t=st=1701702770~exp=1701703370~hmac=b99ccd0351a8dea77d6e5e9d48c5b65f6cb0834e7c28d4f03b9e84b8f8f8f8f8"
                    alt="SaaS Dashboard"
                    width={1000}
                    height={600}
                    className="rounded-lg"
                  />
                  <p className="text-muted-foreground">
                    We redesigned a complex SaaS dashboard, focusing on data
                    visualization and user-friendly controls. The new interface
                    reduced the learning curve for new users by 60% and
                    increased feature adoption by 45%.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-4">
                    <div className="flex items-center">
                      <CheckCircle className="mr-2 text-green-500" />
                      <span>60% reduction in learning curve</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="mr-2 text-green-500" />
                      <span>45% increase in feature adoption</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">
            What Our Clients Say
          </h2>
          <div className="mx-auto max-w-4xl">
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="pt-6">
                <p className="mb-6 text-xl italic">
                  The UI/UX team transformed our product. Their designs not only
                  look beautiful but have significantly improved our user
                  engagement and satisfaction. It&#39;s been a game-changer for
                  our business.
                </p>
                <div className="flex items-center">
                  <Image
                    src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=200&h=200&t=st=1701702814~exp=1701703414~hmac=b99ccd0351a8dea77d6e5e9d48c5b65f6cb0834e7c28d4f03b9e84b8f8f8f8f8"
                    alt="Client"
                    width={60}
                    height={60}
                    className="mr-4 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">John Doe</p>
                    <p className="text-sm opacity-75">
                      CEO, Tech Innovators Inc.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

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
