import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowRight,
  CheckCircle,
  Cloud,
  Code,
  Database,
  Lock,
  Server,
  Smartphone,
} from "lucide-react";
import Image from "next/image";

const services = [
  {
    icon: Server,
    title: "Network Infrastructure",
    description:
      "Design and implement robust network solutions for seamless connectivity.",
  },
  {
    icon: Cloud,
    title: "Cloud Services",
    description:
      "Leverage the power of cloud computing for scalability and flexibility.",
  },
  {
    icon: Lock,
    title: "Cybersecurity",
    description:
      "Protect your digital assets with our advanced security measures.",
  },
  {
    icon: Smartphone,
    title: "Mobile Solutions",
    description:
      "Develop and manage mobile applications for your business needs.",
  },
  {
    icon: Database,
    title: "Data Management",
    description: "Efficiently store, process, and analyze your valuable data.",
  },
  {
    icon: Code,
    title: "Custom Software",
    description:
      "Create tailor-made software solutions to address your unique challenges.",
  },
];

const caseStudies = [
  {
    title: "E-commerce Platform Optimization",
    client: "RetailGiant Inc.",
    description:
      "Improved website performance by 40% and increased conversion rates by 25%.",
    image:
      "https://img.freepik.com/free-photo/person-shopping-online_23-2150390821.jpg?w=1380&t=st=1703371741~exp=1703372341~hmac=6e4e6e9b8f8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e",
  },
  {
    title: "Healthcare Data Security Overhaul",
    client: "MediCare Group",
    description:
      "Implemented state-of-the-art security measures, ensuring 100% HIPAA compliance.",
    image:
      "https://img.freepik.com/free-photo/medical-banner-with-doctor-wearing-vr-glasses_23-2149611215.jpg?w=1380&t=st=1703371786~exp=1703372386~hmac=7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e",
  },
  {
    title: "AI-Driven Analytics Dashboard",
    client: "FinTech Solutions",
    description:
      "Developed a real-time analytics platform, reducing decision-making time by 60%.",
    image:
      "https://img.freepik.com/free-photo/business-people-discussing-charts_53876-30425.jpg?w=1380&t=st=1703371823~exp=1703372423~hmac=8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e",
  },
];

export default function ITPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-32">
        <div className="absolute inset-0 bg-primary"></div>

        <div className="container relative z-10 mx-auto px-4 text-center text-white">
          <h1 className="mb-6 text-4xl font-bold md:text-6xl">
            Innovative IT Solutions for Your Business
          </h1>
          <p className="mx-auto mb-28 max-w-2xl text-xl">
            Empowering your digital transformation with cutting-edge technology
            and expert services
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="h-auto w-full"
          >
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Services Section */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Our IT Services
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Card
                key={index}
                className="group transition-all duration-300 hover:shadow-lg"
              >
                <CardHeader>
                  <div className="mb-4 inline-block rounded-full bg-zinc-100 p-2 transition-colors group-hover:bg-zinc-200">
                    <service.icon className="h-8 w-8 text-zinc-700" />
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="link"
                    className="transition-colors group-hover:text-zinc-900"
                  >
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="bg-zinc-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Case Studies</h2>
          <Tabs defaultValue="case1" className="w-full">
            <TabsList className="mb-8 grid w-full grid-cols-3">
              <TabsTrigger value="case1">E-commerce</TabsTrigger>
              <TabsTrigger value="case2">Healthcare</TabsTrigger>
              <TabsTrigger value="case3">FinTech</TabsTrigger>
            </TabsList>
            {caseStudies.map((study, index) => (
              <TabsContent key={index} value={`case${index + 1}`}>
                <Card>
                  <CardHeader>
                    <CardTitle>{study.title}</CardTitle>
                    <CardDescription>{study.client}</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-6 md:grid-cols-2">
                    <div>
                      <p className="mb-4">{study.description}</p>
                      <Button>Read Full Case Study</Button>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-lg">
                      <Image
                        src={study.image}
                        alt={study.title}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Why Choose Oylkka IT
          </h2>
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <ul className="space-y-4">
                {[
                  "Expert team with diverse IT skills",
                  "Customized solutions for your unique needs",
                  "24/7 support and maintenance",
                  "Cutting-edge technology implementation",
                  "Proven track record of successful projects",
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="mr-2 h-6 w-6 text-green-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button size="lg" className="mt-8">
                Schedule a Consultation
              </Button>
            </div>
            <div className="relative">
              <Image
                src="https://img.freepik.com/free-photo/medium-shot-people-working-office_23-2150323506.jpg?w=1380&t=st=1703372013~exp=1703372613~hmac=0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a"
                alt="IT Professionals"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-4 -right-4 rounded-lg bg-white p-4 shadow-lg">
                <p className="text-2xl font-bold text-zinc-900">10+ Years</p>
                <p className="text-sm text-zinc-600">of IT Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Tech Stack Section */}
      <section className="bg-zinc-900 py-20 text-white">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Our Tech Stack
          </h2>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { name: "React", icon: "/path/to/react-icon.svg" },
              { name: "Node.js", icon: "/path/to/nodejs-icon.svg" },
              { name: "Python", icon: "/path/to/python-icon.svg" },
              { name: "AWS", icon: "/path/to/aws-icon.svg" },
              { name: "Docker", icon: "/path/to/docker-icon.svg" },
              { name: "Kubernetes", icon: "/path/to/kubernetes-icon.svg" },
              { name: "TensorFlow", icon: "/path/to/tensorflow-icon.svg" },
              { name: "PostgreSQL", icon: "/path/to/postgresql-icon.svg" },
            ].map((tech, index) => (
              <div
                key={index}
                className="flex flex-col items-center rounded-lg bg-zinc-800 p-4 transition-colors hover:bg-zinc-700"
              >
                <Image
                  src={tech.icon}
                  alt={tech.name}
                  width={64}
                  height={64}
                  className="mb-2"
                />
                <span>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-linear-to-r from-zinc-800 to-zinc-900 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Ready to Transform Your IT Infrastructure?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl">
            Let&#39;s discuss how Oylkka IT can help you achieve your technology
            goals and drive your business forward.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-zinc-900 hover:bg-zinc-200"
            >
              Get Started
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white bg-transparent text-white hover:bg-white hover:text-zinc-900"
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
