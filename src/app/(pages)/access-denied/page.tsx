"use client";

import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/Header/Header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Home, Lock, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AccessDenied() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <Header />
      <div className="flex min-h-screen flex-col items-center justify-center bg-linear-to-br from-background to-muted p-4">
        <div
          className={`w-full max-w-md transform transition-all duration-500 ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
          }`}
        >
          <Card className="overflow-hidden border-destructive/20 shadow-lg">
            <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-destructive/40 via-destructive to-destructive/40"></div>
            <CardHeader className="pb-4">
              <div className="mb-4 flex justify-center">
                <div className="relative">
                  <div className="absolute -inset-0.5 animate-pulse rounded-full bg-red-500/20 blur-xs"></div>
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
                    <ShieldAlert className="h-10 w-10 text-destructive" />
                  </div>
                </div>
              </div>
              <CardTitle className="text-center text-2xl font-bold">
                Access Denied
              </CardTitle>
              <CardDescription className="text-center text-base">
                You don&#39;t have permission to access this resource
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-6">
              <div className="rounded-lg border border-destructive/10 bg-destructive/5 p-4">
                <div className="flex items-center space-x-2 text-sm">
                  <Lock className="h-4 w-4 text-destructive" />
                  <span className="text-destructive">
                    This area requires additional permissions or authentication
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3 sm:flex-row">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => router.back()}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Button>
              <Link href="/" className="w-full">
                <Button variant="default" className="w-full">
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>

        <p
          className={`mt-8 text-center text-sm text-muted-foreground transition-all delay-300 duration-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          If you believe this is an error, please contact the administrator
        </p>
      </div>
      <Footer />
    </>
  );
}
