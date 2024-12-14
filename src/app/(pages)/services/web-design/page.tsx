import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import design1 from "@/images/services/web-design-1.jpg";
import design10 from "@/images/services/web-design-10.jpg";
import design11 from "@/images/services/web-design-11.jpg";
import design2 from "@/images/services/web-design-2.jpg";
import design3 from "@/images/services/web-design-3.jpg";
import design4 from "@/images/services/web-design-4.jpg";
import design5 from "@/images/services/web-design-5.jpg";
import design6 from "@/images/services/web-design-6.jpg";
import design7 from "@/images/services/web-design-7.jpg";
import design8 from "@/images/services/web-design-8.jpg";
import design9 from "@/images/services/web-design-9.jpg";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const webDesignServices = [
  {
    title: "Responsive Design",
    description:
      "Create websites that look great on all devices, from mobile to desktop.",
    icon: design2,
  },
  {
    title: "User Experience (UX) Design",
    description:
      "Craft intuitive and user-friendly interfaces that delight your visitors.",
    icon: design3,
  },
  {
    title: "Custom Web Development",
    description:
      "Build tailored websites with cutting-edge technologies to meet your specific needs.",
    icon: design4,
  },
];

const webDesignFeatures = [
  "Mobile-First Approach",
  "SEO Optimization",
  "Fast Loading Speeds",
  "Accessibility Compliance",
  "Cross-Browser Compatibility",
  "Scalable Architecture",
];

export default function WebDesignPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="container relative z-10 mx-auto px-4">
          <div className="flex flex-col items-center md:flex-row">
            <div className="mb-10 md:mb-0 md:w-1/2">
              <h1 className="mb-4 text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
                Innovative Web Design Solutions
              </h1>
              <p className="mb-8 text-xl text-muted-foreground md:text-2xl">
                Transforming ideas into stunning, functional websites
              </p>
              <Button asChild size="lg">
                <Link href="#contact">Start Your Project</Link>
              </Button>
            </div>
            <div className="md:w-1/2">
              <Image
                src={design1}
                alt="Web Design Illustration"
                width={600}
                height={600}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-background to-background/50"></div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Our Web Design Services
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {webDesignServices.map((service) => (
              <Card
                key={service.title}
                className="bg-card transition-shadow duration-300 hover:shadow-lg"
              >
                <CardHeader>
                  <div className="mx-auto mb-4 h-20 w-20">
                    <Image
                      src={service.icon}
                      alt={service.title}
                      width={80}
                      height={80}
                    />
                  </div>
                  <CardTitle className="text-center">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Why Choose Our Web Design
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="space-y-4">
              {webDesignFeatures.map((feature) => (
                <div key={feature} className="flex items-center space-x-3">
                  <CheckCircle className="text-primary" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <div className="relative h-[300px] md:h-auto">
              <Image
                src={design5}
                alt="Web Design Process"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Our Web Design Process
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {[
              "Discovery",
              "Planning",
              "Design",
              "Development",
              "Testing",
              "Launch",
            ].map((step, index) => (
              <div key={step} className="flex flex-col items-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                  {index + 1}
                </div>
                <h3 className="mb-2 text-xl font-semibold">{step}</h3>
                <p className="text-center text-muted-foreground">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="bg-muted py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Our Web Design Portfolio
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[design6, design7, design8, design9, design10, design11].map(
              (src, index) => (
                <div
                  key={index}
                  className="relative aspect-video overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-105"
                >
                  <Image
                    src={src}
                    alt={`Web Design ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              ),
            )}
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
            Ready to Create Your Dream Website?
          </h2>
          <p className="mb-8 text-xl">
            Let&#39;s bring your vision to life with our expert web design
            services
          </p>
          <Button asChild variant="secondary" size="lg">
            <Link href="/contact">Get a Free Consultation</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
