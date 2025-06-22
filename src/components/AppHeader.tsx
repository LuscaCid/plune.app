import { Button } from "./ui/button";
import { SidebarTrigger } from "./ui/sidebar";
import { TypographyH4 } from "./ui/Typography";
import { SunMoon } from "lucide-react";
import { useThemeStore } from "@/store/theme";

export function AppHeader() {
  const { setTheme, theme } = useThemeStore();
  return (
    <header
      className={` title-bar-drag-region backdrop-blur-lg z-[100000]  fixed md:static  py-2 px-4  h-fit flex items-center bg-white/80   md:bg-zinc-50/80 dark:bg-zinc-900 dark:bg-[oklch(0.21 0.01 0)] justify-between border-b  border-zinc-200 dark:border-zinc-800 `}
    >
      <aside className="flex items-center gap-1">
        <SidebarTrigger size={"lg"} className="no-drag"/>
        <div className="h-full w-[1px] bg-zinc-100 dark:bg-zinc-800" />
        <TypographyH4 content="/Dashboard" />
      </aside>
      <aside className="flex items-center gap-2 no-drag">
        <Button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="rounded-full"
          variant={"ghost"}
        >
          <SunMoon size={30} />
        </Button>
       
      </aside>
    </header>
  );
}