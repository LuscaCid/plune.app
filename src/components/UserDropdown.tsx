import { EllipsisVertical, LogOut, type LucideIcon, SunMoon, User as UserIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { SidebarMenuButton } from "./ui/sidebar";
import { type MouseEvent } from "react";
import { TypographyMuted, TypographySmall } from "./ui/Typography";
import { useThemeStore } from "@/store/theme";
import { useUser } from "@/hooks/use-user";
import { useUserStore } from "@/store/user";
import * as Dropdown from "@radix-ui/react-dropdown-menu";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "./ui/dropdown-menu";
import { User } from "@/@types/user";
export function NativeUserDropdown() {
  const user = useUserStore(state => state.user)
  const { setTheme, theme } = useThemeStore()
  const { logout } = useUser();
  return (
    <Dropdown.Root>
      <Dropdown.Trigger>
        <UserSidebarButton user={user}/>
      </Dropdown.Trigger>
      <Dropdown.Portal>
        <Dropdown.Content align="end" className=" text-popover-foreground bg-zinc-50  dark:bg-zinc-800 rounded-lg border  dark:border-zinc-700 p-1 z-50">
          <Dropdown.Group className="flex flex-col ">
            <DropdownMenuLabel >
              Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <CustomDropdownMenuItem icon={SunMoon} onClick={() => setTheme(theme == "dark" ? "light" : "dark")} title="Theme" />
            <CustomDropdownMenuItem icon={UserIcon} onClick={() => console.log("Perfil")} title={user ? user.email! : ""} />
            <CustomDropdownMenuItem icon={LogOut} onClick={logout} title="Logout" />
          </Dropdown.Group>
        </Dropdown.Content>
      </Dropdown.Portal>
    </Dropdown.Root>
  );
}
interface Props {
  title: string;
  icon: LucideIcon;
  onClick: (e: MouseEvent) => void;
}
export function CustomDropdownMenuItem({ icon: Icon, onClick, title }: Props) {
  return (
    <DropdownMenuItem
      onClick={onClick}
      className="px-2 py-2 hover:bg-zinc-200 flex items-center gap-2 dark:hover:bg-zinc-700"
    >
      <Icon size={15} />
      <TypographySmall
        content={title}
      />
    </DropdownMenuItem>
  )
}

export function CustomDropwdownMenuContent({ children }: { children?: React.ReactNode }) {
  return (
    <DropdownMenuContent
      align="end"
      side={"right"}
      className=" bg-zinc-50 border border-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 rounded-lg"
    >
      {children}
    </DropdownMenuContent>
  )
}
interface UserSidebarButtonProps {
  user: User | null
}
export function UserSidebarButton({ user }: UserSidebarButtonProps) {
  return (
    <SidebarMenuButton size={"lg"} className="no-drag bg-zinc-100 dark:bg-transparent  p-2 rounded-lg hover:bg-zinc-200  dark:hover:bg-zinc-700/80 flex justify-between items-center w-full">
      <aside className="flex gap-1.5 items-center" >
        <Avatar>
          <AvatarImage className="rounded-full h-10 w-10" src={user ? user?.avatar : ""} />
          <AvatarFallback>{user ? user?.name.charAt(0) : ""} </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1 items-start">
          <TypographySmall content={user ? user!.name : ""} />
          <TypographyMuted className="max-w-[130px] overflow-hidden overflow-ellipsis" content={user ? user.email! : ""} />
        </div>
      </aside>
      <EllipsisVertical size={20} />
    </SidebarMenuButton>
  )
}