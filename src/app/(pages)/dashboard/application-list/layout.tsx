import BreadCrumb from "@/components/layout/admin/BreadCrumb";
import { DashboardSidebar } from "@/components/layout/admin/DashboardSidebar";
import Footer from "@/components/layout/footer/Footer";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <SidebarProvider>
        <DashboardSidebar />
        <main className="w-full">
          <BreadCrumb />
          <div className="flex">
            <main className="w-full">{children}</main>
          </div>
          <Footer />
        </main>
      </SidebarProvider>
    </div>
  );
}
