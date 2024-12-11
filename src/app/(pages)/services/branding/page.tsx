import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const brandingServices = [
  {
    title: "Logo Design",
    description:
      "Create a unique and memorable logo that represents your brand identity.",
    icon: "https://img.freepik.com/free-vector/branding-identity-corporate-vector-logo-design_460848-8717.jpg?w=740&h=740&t=st=1701694684~exp=1701695284~hmac=7f7b0d1d3bde6e4e5c9f5e5e9e9e9e9e9e9e9e9e9e9e9e9e9e9e9e9e9e9e9e",
  },
  {
    title: "Brand Identity",
    description:
      "Develop a cohesive visual language and brand guidelines for your business.",
    icon: "https://img.freepik.com/free-vector/gradient-ui-ux-background_23-2149024129.jpg?w=740&h=740&t=st=1701694729~exp=1701695329~hmac=7f7b0d1d3bde6e4e5c9f5e5e9e9e9e9e9e9e9e9e9e9e9e9e9e9e9e9e9e9e9e",
  },
  {
    title: "Brand Strategy",
    description:
      "Craft a comprehensive strategy to position your brand in the market effectively.",
    icon: "https://img.freepik.com/free-vector/marketing-consulting-concept-illustration_114360-9027.jpg?w=740&h=740&t=st=1701694760~exp=1701695360~hmac=7f7b0d1d3bde6e4e5c9f5e5e9e9e9e9e9e9e9e9e9e9e9e9e9e9e9e9e9e9e9e",
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
          src="https://img.freepik.com/free-vector/black-wave-gradient-modern-background_343694-2084.jpg?t=st=1733926714~exp=1733930314~hmac=185a195008be74b9c21c40d04edb28a64e05eb650552b7cc7aef250a20fd9129&w=996"
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
            {[
              "https://img.freepik.com/free-vector/abstract-logo-flame-shape_1043-44.jpg?w=740&h=740&t=st=1701694963~exp=1701695563~hmac=7f7b0d1d3bde6e4e5c9f5e5e9e9e9e9e9e9e9e9e9e9e9e9e9e9e9e9e9e9e9e",
              "https://img.freepik.com/free-vector/elegant-circle-logo-icon_126523-971.jpg?w=740&h=740&t=st=1701694985~exp=1701695585~hmac=7f7b0d1d3bde6e4e5c9f5e5e9e9e9e9e9e9e9e9e9e9e9e9e9e9e9e9e9e9e9e",
              "https://img.freepik.com/free-vector/elegant-circle-logo-icon_126523-967.jpg?w=740&h=740&t=st=1701695006~exp=1701695606~hmac=7f7b0d1d3bde6e4e5c9f5e5e9e9e9e9e9e9e9e9e9e9e9e9e9e9e9e9e9e9e9e",
              "https://img.freepik.com/free-vector/logo-template-design_1195-55.jpg?w=740&h=740&t=st=1701695024~exp=1701695624~hmac=7f7b0d1d3bde6e4e5c9f5e5e9e9e9e9e9e9e9e9e9e9e9e9e9e9e9e9e9e9e9e",
              "https://img.freepik.com/free-vector/elegant-circle-logo-icon_126523-968.jpg?w=740&h=740&t=st=1701695041~exp=1701695641~hmac=7f7b0d1d3bde6e4e5c9f5e5e9e9e9e9e9e9e9e9e9e9e9e9e9e9e9e9e9e9e9e",
              "https://img.freepik.com/free-vector/logo-template-design_1195-45.jpg?w=740&h=740&t=st=1701695058~exp=1701695658~hmac=7f7b0d1d3bde6e4e5c9f5e5e9e9e9e9e9e9e9e9e9e9e9e9e9e9e9e9e9e9e9e",
            ].map((src, index) => (
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
            ))}
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
