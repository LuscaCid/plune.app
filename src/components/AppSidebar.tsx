import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar"
import { ChartBar, Workflow } from "lucide-react";
import { TypographyH4 } from "./ui/Typography";
import { UserDropdown } from "./UserDropdown";
import { footerItems, headerItems } from "@/lib/routes";
import { NavMain } from "./ui/NavMain";
export function AppSidebar() {

  return (
    <Sidebar variant="floating" className="p-2 border-zinc-200 dark:border-zinc-800/90 " >
      <SidebarHeader className="border-b border-b-zinc-300 dark:border-b-zinc-800">
        <a title="/Dashboard" href="/">
          <div className="px-2 py-1 cursor-pointer flex flex-row items-center gap-1 w-full rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition duration-150 p-0">
            <ChartBar size={20} />
            <TypographyH4 content="Plune.app" />
          </div>
        </a>
      </SidebarHeader>
      <SidebarContent className="p-2 flex flex-col justify-between dark:bg-zinc-900" >
        <SidebarGroupContent>
          <SidebarMenu>
            {headerItems.map((item) => (
              <SidebarMenuItem key={item.url + item.title}>
                <SidebarMenuButton className="flex gap-2 items-center" asChild>
                  <a href={item.url}>
                    <item.icon size={20} />
                    {item.title}
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
            <NavMain items={[
              {
                title: "Flows",
                url: "/",
                icon: Workflow,
                items: [
                  {
                    title: "Models",
                    url: "/flows/models"
                  },
                  {
                    title : "Instances",
                    url : "/flows/instances"
                  }
                ]
              }
            ]} />
          </SidebarMenu>
        </SidebarGroupContent>
        <SidebarGroupContent>
          <SidebarMenu>
            {footerItems.map((item) => (
              <SidebarMenuItem key={item.url + item.title}>
                <SidebarMenuButton className="flex gap-2 items-center" asChild>
                  <a href={item.url}>
                    <item.icon size={20} />
                    {item.title}
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarContent>
      <SidebarFooter>
        <UserDropdown />
      </SidebarFooter>
    </Sidebar>
  )
}

