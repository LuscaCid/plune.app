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
import { footerItems, headerItems } from "@/lib/routes";
import { NavMain } from "./ui/NavMain";
import { Link } from "react-router-dom";
import { NativeUserDropdown } from "./UserDropdown";
export function AppSidebar() {

  return (
    <Sidebar collapsible="icon" variant="inset" className=" border-zinc-200  border-r dark:border-zinc-800" >
      <SidebarHeader className=" title-bar-drag-region">
        <Link to={"/"}>
          <SidebarMenuItem className="flex no-drag ">
            <SidebarMenuButton>
              <ChartBar size={15} />
              <TypographyH4 content="Plune.app" className="select-none" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </Link>

      </SidebarHeader>
      <SidebarContent className="p-2 flex flex-col justify-between dark:bg-zinc-900" >
        <SidebarGroupContent>
          <SidebarMenu>
            {headerItems.map((item) => (
              <SidebarMenuItem key={item.url + item.title} className=" no-drag">
                <SidebarMenuButton tooltip={item.title} className="flex gap-2 items-center" asChild>
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
        <NativeUserDropdown />
      </SidebarFooter>
    </Sidebar>
  )
}

