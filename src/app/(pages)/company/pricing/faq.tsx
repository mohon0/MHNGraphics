import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What services does Oylkka Graphics offer?",
    answer:
      "Oylkka Graphics offers a wide range of design services including branding, web design, UI/UX design, print design, and motion graphics. We cater to businesses of all sizes, from startups to large enterprises.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Project timelines vary depending on the scope and complexity. A basic logo design might take 1-2 weeks, while a full brand identity and website could take 4-8 weeks. We provide estimated timelines for each project during our initial consultation.",
  },
  {
    question: "What is your revision policy?",
    answer:
      "We offer revision rounds as part of our packages. The Basic package includes 1 revision round, Pro includes 3 rounds, and Enterprise offers unlimited revisions. Additional revisions can be purchased if needed.",
  },
  {
    question: "Do you offer rush services?",
    answer:
      "Yes, we do offer rush services for urgent projects. However, this is subject to our current workload and may incur additional fees. Please contact us directly to discuss rush options for your specific project.",
  },
  {
    question: "How do we get started with a project?",
    answer:
      "To get started, simply reach out to us via our contact form or email. We'll schedule an initial consultation to discuss your needs, provide a custom quote, and outline the next steps. Once you approve the proposal, we'll begin the creative process.",
  },
  {
    question: "What is your payment structure?",
    answer:
      "We typically require a 50% deposit to commence work, with the remaining 50% due upon project completion. For larger projects, we may offer milestone-based payments. We accept various payment methods including credit cards and bank transfers.",
  },
  {
    question: "Do you offer ongoing support after project completion?",
    answer:
      "Yes, we provide ongoing support for all our projects. This includes minor updates and troubleshooting for a specified period after project delivery. For long-term support, we offer maintenance packages tailored to your needs.",
  },
  {
    question: "Can you work with clients internationally?",
    answer:
      "We work with clients worldwide. Our process is designed to accommodate different time zones, and we use various online tools to ensure smooth communication and collaboration regardless of geographical location.",
  },
];

export default function FAQSection() {
  return (
    <section className="bg-background py-24">
      <div className="container mx-auto px-2">
        <h2 className="mb-12 text-center text-3xl font-bold">
          Frequently Asked Questions
        </h2>
        <div className="mx-auto max-w-4xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={`item-${index}`} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
