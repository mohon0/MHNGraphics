import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import design from "@/images/services/motion-graphics.jpg";
import { ArrowRight, Award, Film, Play, Sparkles, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Testimonials from "../../about/Testimonials";

const motionGraphicsServices = [
  {
    title: "2D Animation",
    description:
      "Create engaging 2D animations for explainer videos, advertisements, and more.",
    icon: Play,
  },
  {
    title: "3D Animation",
    description:
      "Bring your ideas to life with stunning 3D animations for products, characters, and environments.",
    icon: Film,
  },
  {
    title: "Motion Graphics",
    description:
      "Design eye-catching motion graphics for titles, lower thirds, and visual effects.",
    icon: Zap,
  },
  {
    title: "VFX Integration",
    description:
      "Seamlessly integrate visual effects into live-action footage for a polished final product.",
    icon: Sparkles,
  },
];

const portfolioItems = [
  {
    title: "Product Showcase Animation",
    description:
      "A sleek 3D animation showcasing the features of our latest smartphone model.",
    videoId: "X1-82HmR65I",
  },

  {
    title: "Explainer Video Graphics",
    description:
      "Engaging 2D animations explaining a complex business process for a fintech startup.",
    videoId: "1nNz_58fEb4",
  },
  {
    title: "Title Sequence Design",
    description:
      "Dynamic motion graphics for a popular TV show's opening sequence.",
    videoId: "9Q9D3pTQBsU",
  },
];

export default function MotionGraphicsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="container relative z-10 mx-auto px-4">
          <div className="flex flex-col items-center gap-12 lg:flex-row">
            <div className="lg:w-1/2">
              <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                Bring Your Ideas to <span className="text-primary">Life</span>{" "}
                with Motion
              </h1>
              <p className="mb-8 text-xl text-muted-foreground">
                Captivate your audience with stunning motion graphics and
                animations that tell your story and elevate your brand.
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
                src={design}
                alt="Motion Graphics Illustration"
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
            Our Motion Graphics Services
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {motionGraphicsServices.map((service) => (
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

      {/* Process Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Our Creative Process
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {["Concept", "Storyboard", "Animation", "Refinement"].map(
              (step, index) => (
                <div key={step} className="flex flex-col items-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
                    {index + 1}
                  </div>
                  <h3 className="mb-2 text-center text-xl font-semibold">
                    {step}
                  </h3>
                  <p className="text-center text-sm text-muted-foreground">
                    We work closely with you at every stage to bring your vision
                    to life.
                  </p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Our Motion Graphics Portfolio
          </h2>
          <Tabs defaultValue="item1" className="w-full">
            <TabsList className="mb-20 grid w-full grid-cols-1 md:mb-8 md:grid-cols-3">
              {portfolioItems.map((item, index) => (
                <TabsTrigger key={index} value={`item${index + 1}`}>
                  {item.title}
                </TabsTrigger>
              ))}
            </TabsList>
            {portfolioItems.map((item, index) => (
              <TabsContent key={index} value={`item${index + 1}`}>
                <Card>
                  <CardHeader>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative aspect-video overflow-hidden rounded-lg">
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${item.videoId}`}
                        title={item.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute left-0 top-0 h-full w-full"
                      ></iframe>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Testimonial Section */}
      <Testimonials />

      {/* Awards Section */}
      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Awards & Recognition
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            {[
              "Best Animation",
              "Creative Excellence",
              "Industry Innovation",
            ].map((award) => (
              <div key={award} className="flex flex-col items-center">
                <Award className="mb-4 h-16 w-16 text-primary" />
                <h3 className="mb-2 text-center text-xl font-semibold">
                  {award}
                </h3>
                <p className="text-center text-sm text-muted-foreground">
                  Motion Graphics Awards 2023
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section
        id="contact"
        className="bg-primary py-20 text-primary-foreground"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">
            Ready to Bring Your Ideas to Life?
          </h2>
          <p className="mb-8 text-xl">
            Let&#39;s create stunning motion graphics that captivate your
            audience
          </p>
          <Button asChild size="lg" variant="secondary" className="group">
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
