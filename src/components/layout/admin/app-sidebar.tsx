"use client";
import {
  BadgeCheck,
  BookOpen,
  GalleryHorizontal,
  Map,
  PieChart,
  Settings2,
} from "lucide-react";
import * as React from "react";

import { NavMain } from "@/components/layout/admin/nav-main";
import { NavProjects } from "@/components/layout/admin/nav-projects";
import { NavUser } from "@/components/layout/admin/nav-user";
import { TeamSwitcher } from "@/components/layout/admin/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useSession } from "next-auth/react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession(); // Retrieve session data

  const data = {
    navMain: [
      {
        title: "Design",
        url: "#",
        icon: GalleryHorizontal,
        isActive: true,
        items: [
          {
            title: "Add New",
            url: "/admin-dashboard/new-design",
          },
          {
            title: "View All",
            url: "/admin-dashboard/all-design/page/1",
          },
        ],
      },
      {
        title: "Account",
        url: "#",
        icon: BadgeCheck,
        items: [
          {
            title: "View Profile",
            url: `/profile?id=${session?.user?.id}`,
          },
          {
            title: "Edit Profile",
            url: "/edit-profile",
          },
        ],
      },
      {
        title: "Documentation",
        url: "#",
        icon: BookOpen,
        items: [
          {
            title: "Introduction",
            url: "#",
          },
          {
            title: "Get Started",
            url: "#",
          },
          {
            title: "Tutorials",
            url: "#",
          },
          {
            title: "Changelog",
            url: "#",
          },
        ],
      },
      {
        title: "Settings",
        url: "#",
        icon: Settings2,
        items: [
          {
            title: "General",
            url: "#",
          },
          {
            title: "Team",
            url: "#",
          },
          {
            title: "Billing",
            url: "#",
          },
          {
            title: "Limits",
            url: "#",
          },
        ],
      },
    ],
    projects: [
      {
        name: "Profile",
        url: `/profile?id=${session?.user?.id}`,
        icon: BadgeCheck,
      },
      {
        name: "Sales & Marketing",
        url: "#",
        icon: PieChart,
      },
      {
        name: "Travel",
        url: "#",
        icon: Map,
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
