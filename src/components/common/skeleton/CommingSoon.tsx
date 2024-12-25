"use client";

import { Button } from "@/components/ui/button";
import { Facebook, Github, Instagram, Twitter } from "lucide-react";

export default function ComingSoonPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 p-4 text-white">
      <div className="absolute inset-0 overflow-hidden">
        <svg
          className="absolute left-0 top-0 h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="rgba(161, 161, 170, 0.1)"
            fillOpacity="1"
            d="M0,32L48,58.7C96,85,192,139,288,149.3C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,165.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      <div className="relative z-10 text-center">
        <svg
          className="mx-auto mb-8 h-32 w-32"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M50 25 L50 50 L75 50"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="50" cy="50" r="3" fill="currentColor" />
        </svg>

        <h1 className="mb-4 text-4xl font-bold md:text-6xl">Coming Soon</h1>
        <p className="mb-12 text-xl text-zinc-300 md:text-2xl">
          We&#39;re crafting something extraordinary for you.
        </p>

        <div className="flex justify-center space-x-6">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-zinc-700"
          >
            <Facebook className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-zinc-700"
          >
            <Twitter className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-zinc-700"
          >
            <Instagram className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-zinc-700"
          >
            <Github className="h-6 w-6" />
          </Button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="rgba(161, 161, 170, 0.1)"
            fillOpacity="1"
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,213.3C1248,203,1344,213,1392,218.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
      <div>
        <p>Hello world</p>
        <p>Hello world 2</p>
      </div>
    </div>
  );
}
