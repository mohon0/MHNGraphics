"use client";
import {
  BadgeCheck,
  BookOpen,
  GalleryHorizontal,
  Map,
  PieChart,
  Settings2,
  UserRoundSearch,
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

export function DashboardSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();

  // Default nav items, common for all users
  const commonNavMain = [
    {
      title: "Account",
      url: "#",
      isActive: true,
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
      title: "Design",
      url: "#",
      icon: GalleryHorizontal,
      isActive: true,
      items: [
        {
          title: "Add New",
          url: "/dashboard/new-design",
        },
        {
          title: "View All",
          url: "/dashboard/all-design?category=all&query=&page=1",
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
  ];

  // Admin-only nav items
  const adminNavMain = [
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
  ];

  // Admin-only project items
  const adminProjects = [
    {
      name: "Users",
      url: `/dashboard/users?page=1`,
      icon: UserRoundSearch,
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
  ];

  // Non-admin project items (for regular users)
  const userProjects = [
    {
      name: "My Projects",
      url: `/dashboard/my-projects`,
      icon: PieChart,
    },
    {
      name: "Explore",
      url: `/dashboard/explore`,
      icon: Map,
    },
  ];

  // Select data based on role
  const navMain =
    session?.user?.role === "ADMIN"
      ? [...commonNavMain, ...adminNavMain]
      : commonNavMain;

  const projects =
    session?.user?.role === "ADMIN" ? adminProjects : userProjects;

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        <NavProjects projects={projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
