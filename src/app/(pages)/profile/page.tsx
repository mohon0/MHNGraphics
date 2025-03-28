"use client";

import ProfileSkeleton from "@/components/common/skeleton/ProfileSkelton";
import { RemoveHtmlTags } from "@/components/helper/html/PerseHtml";
import { createSlug } from "@/components/helper/slug/CreateSlug";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProfile } from "@/services/profile";
import { Design } from "@/utils/Interface";
import { motion } from "framer-motion";
import { CalendarIcon, ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react"; // Import Suspense

export default function Page() {
  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <ProfileContent />
    </Suspense>
  );
}

function ProfileContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [take, setTake] = useState(30);
  const [designs, setDesigns] = useState<Design[]>([]); // Use appropriate type for designs

  const { isLoading, data, isError } = useProfile(
    id ?? "",
    take,
    designs.length,
  ); // Pass the current length for skip

  useEffect(() => {
    if (data) {
      // Append new designs to the existing designs
      setDesigns((prev) => [...prev, ...data.design]);
    }
  }, [data]);

  function handleTake() {
    setTake((prevTake) => prevTake + 15);
  }

  if (!id) return <div className="p-4 text-center">No ID provided</div>;
  if (isLoading) return <ProfileSkeleton />;
  if (isError)
    return (
      <div className="p-4 text-center text-red-500">Error loading profile</div>
    );

  const totalDesignCount = data._count?.design || 0;

  return (
    <div className="min-h-screen bg-gray-100 p-2 transition-colors duration-300 md:p-4">
      <Card className="mx-auto w-full max-w-5xl shadow-lg transition-shadow duration-300 hover:shadow-xl dark:bg-gray-800">
        <CardHeader className="flex flex-col items-center gap-4 sm:flex-row">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Avatar className="h-24 w-24 border-4 border-primary">
              <AvatarImage src={data.image} alt={data.name} />
              <AvatarFallback className="text-3xl font-medium">
                {data.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </motion.div>
          <div className="text-center sm:text-left">
            <motion.h1
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-2 text-3xl font-bold"
            >
              {data.name}
            </motion.h1>
            <Badge>{data.status}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="designs" className="w-full">
            <TabsList className="mb-4 grid w-full grid-cols-2">
              <TabsTrigger value="designs">Designs</TabsTrigger>
              <TabsTrigger value="info">Info</TabsTrigger>
            </TabsList>
            <TabsContent value="designs">
              {designs.length === 0 ? (
                <div>No designs available</div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
                >
                  {designs.map((design, index) => (
                    <motion.div
                      key={design.id}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Card className="h-full overflow-hidden transition-transform duration-300 hover:scale-105">
                        <Link
                          href={createSlug({
                            name: design.name,
                            id: design.id,
                          })}
                        >
                          <div className="relative aspect-square">
                            <Image
                              src={design.image}
                              alt={design.name}
                              layout="fill"
                              objectFit="cover"
                              className="transition-transform duration-300 hover:scale-110"
                              loading="lazy" // Lazy loading for performance
                            />
                          </div>
                          <CardContent className="p-4">
                            <h3 className="truncate text-lg font-semibold">
                              {design.name}
                            </h3>
                            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                              {RemoveHtmlTags(design.description)}
                            </p>
                            <div className="mt-3 flex flex-wrap gap-2">
                              {design.tags.slice(0, 3).map((tag, index) => (
                                <Badge
                                  key={index}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                        </Link>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              )}
              <CardFooter className="mx-auto mt-10 flex items-center justify-center">
                {take < totalDesignCount && ( // Only show button if there are more designs to load
                  <Button onClick={handleTake}>Load More</Button>
                )}
              </CardFooter>
            </TabsContent>

            <TabsContent value="info">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4 rounded-lg bg-secondary p-4"
              >
                <div>{data.bio}</div>
                <div className="flex items-center gap-3">
                  <CalendarIcon className="h-5 w-5 text-primary" />
                  <span>
                    Joined on{" "}
                    {new Date(data.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <ImageIcon className="h-5 w-5 text-primary" />
                  <span>{data.design.length} designs created</span>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
