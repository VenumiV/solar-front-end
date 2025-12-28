import { Outlet } from "react-router";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardLayout() {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main className="p-3 sm:p-4 lg:p-6 w-full bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
          <div className="mb-4 sm:mb-6">
            <SidebarTrigger className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>
          <Outlet />
        </main>
      </SidebarProvider>
    </>
  );
}