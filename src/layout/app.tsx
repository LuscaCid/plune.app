import { AppHeader } from "@/components/AppHeader";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router";

export function AppLayout() {
  return (
    <div className="dark:text-zinc-50 h-full text-zinc-950 bg-white dark:bg-zinc-950">
      <SidebarProvider>
        <AppSidebar />
        <main
          className={`w-full h-screen bg-white dark:bg-zinc-950 mr-2`}
        >
          <AppHeader />
          <main className="p-4 md:mt-0 flex-1 dark:bg-zinc-950">
            <Outlet />
          </main>
        </main>
      </SidebarProvider>
    </div>
  );
}