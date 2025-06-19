import { EllipsisVertical, LogOut, type LucideIcon, SunMoon, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { SidebarMenuButton } from "./ui/sidebar";
import { type MouseEvent } from "react";
import { TypographyMuted, TypographySmall } from "./ui/Typography";
import { useThemeStore } from "@/store/theme";
import { useUser } from "@/hooks/use-user";
import { useUserStore } from "@/store/user";
import { useIsMobile } from "@/hooks/use-mobile";

export function UserDropdown() {
  const { setTheme, theme } = useThemeStore();
  const { logout } = useUser();
  const user = useUserStore(state => state.user)

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton size={"lg"} className="bg-zinc-100 dark:bg-transparent data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground p-2 rounded-lg hover:bg-zinc-200  dark:hover:bg-zinc-700/80 flex justify-between items-center w-full">
          <aside className="flex gap-1.5 items-start" >
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
      </DropdownMenuTrigger>
      <CustomDropwdownMenuContent>
        <DropdownMenuLabel>Conta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <CustomDropdownMenuItem icon={SunMoon} onClick={() => setTheme(theme == "dark" ? "light" : "dark")} title="Tema" />
        <CustomDropdownMenuItem icon={User} onClick={() => console.log("Perfil")} title={user ? user.email! : ""} />
        <CustomDropdownMenuItem icon={LogOut} onClick={logout} title="Sair" />
      </CustomDropwdownMenuContent>
    </DropdownMenu>
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
  const isMobile = useIsMobile();
  return (
    <DropdownMenuContent
      align="end"
      side={isMobile ? "bottom" : "right"}
      className="bg-zinc-50 border border-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 rounded-lg"
    >
      {children}
    </DropdownMenuContent>
  )
}