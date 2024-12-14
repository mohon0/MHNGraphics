import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import brand1 from "@/images/services/brand1.png";
import brand10 from "@/images/services/brand10.jpg";
import brand2 from "@/images/services/brand2.jpg";
import brand3 from "@/images/services/brand3.png";
import brand6 from "@/images/services/brand6.jpg";
import brand8 from "@/images/services/brand8.png";
import brand9 from "@/images/services/brand9.png";
import Image from "next/image";
import Link from "next/link";

const brandingServices = [
  {
    title: "Logo Design",
    description:
      "Create a unique and memorable logo that represents your brand identity.",
    icon: brand1,
  },
  {
    title: "Brand Identity",
    description:
      "Develop a cohesive visual language and brand guidelines for your business.",
    icon: brand2,
  },
  {
    title: "Brand Strategy",
    description:
      "Craft a comprehensive strategy to position your brand in the market effectively.",
    icon: brand3,
  },
];

const brandingProcess = [
  {
    title: "Discovery",
    description:
      "We dive deep into understanding your business, goals, and target audience.",
  },
  {
    title: "Strategy",
    description:
      "We develop a tailored branding strategy aligned with your objectives.",
  },
  {
    title: "Design",
    description:
      "Our creative team brings your brand to life with stunning visuals.",
  },
  {
    title: "Implementation",
    description: "We help you roll out your new brand across all touchpoints.",
  },
];

export default function BrandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative flex h-[60vh] items-center justify-center overflow-hidden">
        <Image
          src={brand10}
          alt="Branding Hero"
          layout="fill"
          objectFit="cover"
          className="absolute z-0"
        />
        <div className="relative z-10 text-center text-white">
          <h1 className="mb-4 text-4xl font-bold md:text-6xl">
            Branding Services
          </h1>
          <p className="mb-8 text-xl md:text-2xl">
            Create a lasting impression with our expert branding solutions
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link href="#contact">Get Started</Link>
          </Button>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Our Branding Services
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {brandingServices.map((service) => (
              <Card key={service.title} className="bg-card">
                <CardHeader>
                  <div className="mx-auto mb-4 h-16 w-16">
                    <Image
                      src={service.icon}
                      alt={service.title}
                      width={64}
                      height={64}
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

      {/* Process Section */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Our Branding Process
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {brandingProcess.map((step, index) => (
              <div key={step.title} className="flex flex-col items-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                  {index + 1}
                </div>
                <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                <p className="text-center text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Our Branding Portfolio
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[brand1, brand2, brand6, brand3, brand8, brand9].map(
              (src, index) => (
                <div
                  key={index}
                  className="relative aspect-square overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-105"
                >
                  <Image
                    src={src}
                    alt={`Brand ${index + 1}`}
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
        className="bg-primary py-16 text-primary-foreground"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">
            Ready to Transform Your Brand?
          </h2>
          <p className="mb-8 text-xl">
            Let&#39;s create something amazing together
          </p>
          <Button asChild variant="secondary" size="lg">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
