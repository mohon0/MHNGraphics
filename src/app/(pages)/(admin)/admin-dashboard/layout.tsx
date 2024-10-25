import BreadCrumb from "@/components/layout/admin/BreadCrumb";
import { AppSidebar } from "@/components/layout/admin/app-sidebar";
import Footer from "@/components/layout/footer/Footer";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <BreadCrumb />
          {children}
          <Footer />
        </main>
      </SidebarProvider>
    </div>
  );
}
