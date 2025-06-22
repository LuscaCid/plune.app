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
          className={`w-full h-screen relative bg-white dark:bg-zinc-950 `}
        >
          <AppHeader />
          <main
            style={{ height: "calc(100% - 3.5rem)" }}
            className="p-3 py-0 flex-1 dark:bg-zinc-950 overflow-auto relative">
            <Outlet />
          </main>
        </main>
      </SidebarProvider>
    </div>
  );
}