import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  FileWarning,
  Scale,
  ScrollText,
  ShieldAlert,
  UserCheck,
} from "lucide-react";

export default function TermsOfService() {
  const sections = [
    {
      title: "Acceptance of Terms",
      icon: <UserCheck className="h-6 w-6" />,
      content:
        "By accessing or using the services provided by Oylkka Graphics, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access our services.",
    },
    {
      title: "Use of Services",
      icon: <ScrollText className="h-6 w-6" />,
      content:
        "Our services are provided 'as is' and are intended for lawful use only. You agree not to use our services for any illegal or unauthorized purpose. Oylkka Graphics reserves the right to terminate your access to the services for violations of these terms.",
    },
    {
      title: "Intellectual Property",
      icon: <Scale className="h-6 w-6" />,
      content:
        "All content, designs, and materials produced by Oylkka Graphics remain our intellectual property unless explicitly stated otherwise. You may not use, reproduce, or distribute our work without prior written consent.",
    },
    {
      title: "Limitation of Liability",
      icon: <ShieldAlert className="h-6 w-6" />,
      content:
        "Oylkka Graphics shall not be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the services.",
    },
    {
      title: "Modifications to Services",
      icon: <FileWarning className="h-6 w-6" />,
      content:
        "Oylkka Graphics reserves the right to modify or discontinue, temporarily or permanently, the services with or without notice. We shall not be liable to you or to any third party for any modification, price change, suspension or discontinuance of the service.",
    },
  ];

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-3xl font-bold">
              <ScrollText className="h-8 w-8 text-primary" />
              Terms of Service
            </CardTitle>
            <CardDescription>
              Last updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Welcome to Oylkka Graphics. These Terms of Service govern your use
              of our website and services. By using our services, you agree to
              these terms. Please read them carefully.
            </p>
          </CardContent>
        </Card>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {sections.map((section, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="rounded-lg border bg-card"
            >
              <AccordionTrigger className="px-4 py-2 hover:no-underline">
                <div className="flex items-center gap-2">
                  {section.icon}
                  <h2 className="text-xl font-semibold">{section.title}</h2>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-2">
                <p className="text-muted-foreground">{section.content}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <Separator className="my-8" />

        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold">
            Questions about our Terms of Service?
          </h2>
          <p className="mb-6 text-muted-foreground">
            If you have any questions about these Terms of Service, please
            contact us.
          </p>
          <a
            href="/contact"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
