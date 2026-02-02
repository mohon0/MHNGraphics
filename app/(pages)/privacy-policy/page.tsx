import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Clock, Eye, FileText, Globe, Lock, Shield } from 'lucide-react';

export default function PrivacyPolicy() {
  const sections = [
    {
      title: 'Information We Collect',
      icon: <Eye className='h-6 w-6' />,
      content:
        'We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and services, when you participate in activities on the Website, or otherwise when you contact us. The personal information that we collect depends on the context of your interactions with us and the Website, the choices you make, and the products and features you use.',
    },
    {
      title: 'How We Use Your Information',
      icon: <FileText className='h-6 w-6' />,
      content:
        'We use personal information collected via our Website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.',
    },
    {
      title: 'How We Share Your Information',
      icon: <Globe className='h-6 w-6' />,
      content:
        'We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We may process or share your data that we hold based on the following legal basis: Consent, Legitimate Interests, Performance of a Contract, Legal Obligations.',
    },
    {
      title: 'How Long We Keep Your Information',
      icon: <Clock className='h-6 w-6' />,
      content:
        'We keep your information for as long as necessary to fulfill the purposes outlined in this privacy policy unless otherwise required by law. We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy policy, unless a longer retention period is required or permitted by law.',
    },
    {
      title: 'How We Protect Your Information',
      icon: <Lock className='h-6 w-6' />,
      content:
        'We aim to protect your personal information through a system of organizational and technical security measures. We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.',
    },
  ];

  return (
    <div className='min-h-screen bg-background py-12'>
      <div className='container mx-auto px-4'>
        <Card className='mb-8'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2 text-3xl font-bold'>
              <Shield className='h-8 w-8 text-primary' />
              Privacy Policy
            </CardTitle>
            <CardDescription>
              Last updated:{' '}
              {new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className='text-muted-foreground'>
              At Oylkka IT, we are committed to protecting your privacy and
              ensuring the security of your personal information. This Privacy
              Policy outlines our practices concerning the collection, use, and
              sharing of your data when you use our website or services.
            </p>
          </CardContent>
        </Card>

        <Accordion type='single' collapsible className='w-full space-y-4'>
          {sections.map((section, index) => (
            <AccordionItem
              // biome-ignore lint: error
              key={index}
              value={`item-${index}`}
              className='rounded-lg border bg-card'
            >
              <AccordionTrigger className='px-4 py-2 hover:no-underline'>
                <div className='flex items-center gap-2'>
                  {section.icon}
                  <h2 className='text-xl font-semibold'>{section.title}</h2>
                </div>
              </AccordionTrigger>
              <AccordionContent className='px-4 pb-4 pt-2'>
                <p className='text-muted-foreground'>{section.content}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <Separator className='my-8' />

        <div className='text-center'>
          <h2 className='mb-4 text-2xl font-bold'>
            Have questions about our privacy practices?
          </h2>
          <p className='mb-6 text-muted-foreground'>
            We&apos;re here to help. Contact us for more information about how
            we protect your privacy.
          </p>
          <a
            href='/contact'
            className='inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
