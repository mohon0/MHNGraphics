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
import { Cookie, Info, Settings, Shield, ToggleLeft } from "lucide-react";

export default function CookiePolicy() {
  const sections = [
    {
      title: "What Are Cookies",
      icon: <Info className="h-6 w-6" />,
      content:
        "Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the owners of the site.",
    },
    {
      title: "How We Use Cookies",
      icon: <Settings className="h-6 w-6" />,
      content:
        "We use cookies for various purposes, including: to enable certain functions of the service, to provide analytics, to store your preferences, and to enable advertisement delivery, including behavioral advertising.",
    },
    {
      title: "Types of Cookies We Use",
      icon: <Cookie className="h-6 w-6" />,
      content:
        "We use both session and persistent cookies on our website. Session cookies are temporary and are deleted when you close your browser. Persistent cookies remain on your device until they expire or you delete them.",
    },
    {
      title: "Your Cookie Choices",
      icon: <ToggleLeft className="h-6 w-6" />,
      content:
        "Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set cookies, you may worsen your overall user experience, as it will no longer be personalized to you.",
    },
    {
      title: "Cookie Security",
      icon: <Shield className="h-6 w-6" />,
      content:
        "We implement appropriate technical and organizational measures to protect the security of your personal information collected through cookies. However, please note that no method of transmission over the Internet or method of electronic storage is 100% secure.",
    },
  ];

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-3xl font-bold">
              <Cookie className="h-8 w-8 text-primary" />
              Cookie Policy
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
              This Cookie Policy explains how Oylkka Graphics uses cookies and
              similar technologies to recognize you when you visit our website.
              It explains what these technologies are and why we use them, as
              well as your rights to control our use of them.
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
            Questions about our Cookie Policy?
          </h2>
          <p className="mb-6 text-muted-foreground">
            If you have any questions about our use of cookies or other
            technologies, please contact us.
          </p>
          <a
            href="/contact"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
