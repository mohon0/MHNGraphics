"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import img from "@/images/hero/2.jpg";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Services from "./Services";
import Testimonials from "./Testimonials";
import ToolsSkills from "./ToolsSkills";

export default function AboutPage() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <Image
          src={img}
          alt="Oylkka Graphics team at work"
          layout="fill"
          objectFit="cover"
          className="brightness-50"
        />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div>
            <motion.h1
              className="mb-4 text-4xl font-bold text-white md:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              About Oylkka Graphics
            </motion.h1>
            <motion.p
              className="mx-auto max-w-2xl text-xl text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Transforming ideas into visual masterpieces since 2010
            </motion.p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="px-2 py-20">
        <div className="container mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-3xl font-bold">Our Story</h2>
          <div className="space-y-6 text-lg text-muted-foreground">
            <p>
              Oylkka Graphics was born out of a passion for design and a vision
              to help businesses thrive through compelling visual communication.
              Founded in 2010 by John Doe, our journey began in a small studio
              with big dreams.
            </p>
            <p>
              Over the years, we&apos;ve grown into a dynamic team of creative
              professionals, each bringing unique skills and perspectives to our
              work. From branding startups to revamping corporate identities,
              we&apos;ve had the privilege of working with diverse clients
              across industries.
            </p>
            <motion.div
              initial={false}
              animate={{
                height: isExpanded ? "auto" : 0,
                opacity: isExpanded ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <p>
                Our commitment to innovation and excellence has earned us
                recognition in the design community, including awards for our
                groundbreaking work in UI/UX design and motion graphics. But our
                greatest reward is the success and satisfaction of our clients.
              </p>
              <p>
                Today, Oylkka Graphics stands at the forefront of the design
                industry, continuously pushing boundaries and setting new
                standards. We&apos;re not just creating designs; we&apos;re
                crafting experiences that resonate with audiences and drive
                results for our clients.
              </p>
            </motion.div>
            <div className="text-center">
              <Button
                variant="ghost"
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-4"
              >
                {isExpanded ? "Read Less" : "Read More"}
                <ChevronDown
                  className={`ml-2 h-4 w-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Services />

      {/* Our Values Section */}
      <section className="bg-secondary/20 px-4 py-20">
        <div className="container mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-3xl font-bold">Our Values</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {[
              {
                title: "Creativity",
                description:
                  "We approach every project with fresh eyes and innovative ideas.",
              },
              {
                title: "Excellence",
                description:
                  "We strive for perfection in every pixel and every interaction.",
              },
              {
                title: "Collaboration",
                description:
                  "We believe in the power of teamwork, both internally and with our clients.",
              },
              {
                title: "Integrity",
                description:
                  "We maintain the highest ethical standards in all our business practices.",
              },
            ].map((value, index) => (
              <Card key={index} className="bg-background">
                <CardContent className="p-6">
                  <h3 className="mb-2 text-xl font-semibold">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <ToolsSkills />

      <Testimonials />

      {/* Call to Action */}
      <section className="bg-primary px-4 py-20 text-primary-foreground">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold">
            Ready to bring your vision to life?
          </h2>
          <p className="mb-8 text-xl">
            Let&apos;s create something amazing together.
          </p>
          <Button size="lg" variant="secondary">
            Get in Touch
          </Button>
        </div>
      </section>
    </div>
  );
}
