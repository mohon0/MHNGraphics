"use client";
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
import {
  BadgeCheck,
  ChartNoAxesCombined,
  FileUser,
  GalleryHorizontal,
  HeartPulse,
  Map,
  Megaphone,
  MessageSquareMore,
  PieChart,
  UserRoundSearch,
} from "lucide-react";
import { useSession } from "next-auth/react";
import * as React from "react";

export function DashboardSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();

  // Default nav items, common for all users
  const commonNavMain = [
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
  ];

  // Admin-only nav items
  const adminNavMain = [
    {
      title: "Application",
      url: "#",
      icon: FileUser,
      items: [
        {
          title: "View All",
          url: "/dashboard/application-list?filter=All&page=1&sort=newest&certificate=All&name=",
        },
        {
          title: "Free Application",
          url: "/dashboard/application-list?filter=All&page=1&sort=newest&certificate=All&type=free&name=",
        },
      ],
    },
    {
      title: "Blood Bank",
      url: "#",
      icon: HeartPulse,
      items: [
        {
          title: "Blood Bank",
          url: "/dashboard/blood-bank?page=1&bloodGroup=All&searchInput=",
        },
        {
          title: "Address",
          url: "/dashboard/blood-bank/address",
        },
      ],
    },
    {
      title: "Notice",
      url: "#",
      icon: Megaphone,
      items: [
        {
          title: "Add new",
          url: "/dashboard/new-notice",
        },
        {
          title: "View all",
          url: "/best-computer-training-center/notice-list",
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
      name: "Comments",
      url: "/dashboard/comments?page=1",
      icon: MessageSquareMore,
    },
    {
      name: "Payment Analytics",
      url: "/dashboard/payment-analytics",
      icon: ChartNoAxesCombined,
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
