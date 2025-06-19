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
import { Link } from "react-router-dom";
export function AppSidebar() {

  return (
    <Sidebar collapsible="icon" variant="floating" className="p-2 border-zinc-200 dark:border-zinc-800/90 " >
      <SidebarHeader className="border-b border-b-zinc-300 dark:border-b-zinc-800">
        <Link to={"/"}>
          <SidebarMenuItem className="flex ">
            <SidebarMenuButton>
              <ChartBar size={15} />
              <TypographyH4 content="Plune.app" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </Link>

      </SidebarHeader>
      <SidebarContent className="p-2 flex flex-col justify-between dark:bg-zinc-900" >
        <SidebarGroupContent>
          <SidebarMenu>
            {headerItems.map((item) => (
              <SidebarMenuItem key={item.url + item.title}>
                <SidebarMenuButton className="flex gap-2 items-center" asChild>
                  <Link to={item.url}>
                    <item.icon size={20} />
                    {item.title}
                  </Link>
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
                    title: "Instances",
                    url: "/flows/instances"
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

