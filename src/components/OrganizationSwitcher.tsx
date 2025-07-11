"use client"

import { ChevronsUpDown, Plus } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useUserStore } from "@/store/user"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { useQuery } from "@tanstack/react-query"
import { userOrganizations } from "@/hooks/use-organization"

export function OrganizationSwitcher() {
  const { user, selectedOrganization, setSelectedOrganization } = useUserStore();
  const { getUserOrganizations } = userOrganizations();

  const { data: organizations } = useQuery({
    queryKey: ["user-organizations", user?.email],
    queryFn: getUserOrganizations,
  });

  if (!selectedOrganization) {
    return null
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full">
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground no-drag"
            >
              <div className="  flex  items-center justify-center rounded-lg">
                <Avatar>
                  <AvatarImage className="rounded-full bg-transparent h-10 w-10" src={selectedOrganization ? selectedOrganization?.logo : ""} />
                  <AvatarFallback>{selectedOrganization ? selectedOrganization.name!.charAt(0) : ""} </AvatarFallback>
                </Avatar>
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{selectedOrganization.name}</span>
                <span className="truncate text-xs">{selectedOrganization.role}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={"right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Organizations
            </DropdownMenuLabel>
            {organizations && organizations.length > 0 && organizations.map((org, index) => (
              <DropdownMenuItem
                key={org.organization.name}
                onClick={() => setSelectedOrganization({ role: org.role, createdAt: org.organization.createdAt, name : org.organization.name })}
                className="gap-2 p-2"
              >
                <Avatar>
                  <AvatarImage className="rounded-full h-10 w-10" src={org ? org?.organization.logo : ""} />
                  <AvatarFallback>{org ? org.organization.name!.charAt(0) : ""} </AvatarFallback>
                </Avatar>
                {org.organization.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                <Plus className="size-4" />
              </div>
              <div className="text-muted-foreground font-medium">Add org</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
