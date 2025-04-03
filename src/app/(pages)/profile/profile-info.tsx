"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import {
  Award,
  Briefcase,
  CalendarIcon,
  Globe,
  GraduationCap,
  Mail,
  MapPin,
} from "lucide-react";

interface ProfileInfoProps {
  user: any;
}

export default function ProfileInfo({ user }: ProfileInfoProps) {
  // Sample skills - in a real app, these would come from the user data
  const skills = [
    "UI/UX Design",
    "Graphic Design",
    "Illustration",
    "Typography",
    "Branding",
    "Web Design",
    "Motion Graphics",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="shadow-md">
        <CardContent className="p-6">
          <h3 className="mb-4 text-xl font-semibold">About</h3>
          <p className="whitespace-pre-line text-muted-foreground">
            {user.bio || "No bio available."}
          </p>

          <Separator className="my-6" />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Contact Information</h3>

            <div className="space-y-3">
              {user.email && (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <span>{user.email}</span>
                </div>
              )}

              {user.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>{user.location}</span>
                </div>
              )}

              {user.website && (
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-primary" />
                  <a
                    href={user.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {user.website.replace(/^https?:\/\//, "")}
                  </a>
                </div>
              )}

              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-primary" />
                <span>
                  Joined on{" "}
                  {new Date(user.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Professional Information</h3>

            <div className="space-y-3">
              {user.company && (
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-primary" />
                  <span>{user.company}</span>
                </div>
              )}

              {user.education && (
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-primary" />
                  <span>{user.education}</span>
                </div>
              )}

              {user.achievements && (
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-primary" />
                  <span>{user.achievements}</span>
                </div>
              )}
            </div>
          </div>

          <Separator className="my-6" />

          <div>
            <h3 className="mb-4 text-lg font-medium">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <Badge key={index} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
