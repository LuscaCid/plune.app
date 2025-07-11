import { ApresentationHeader } from "@/components/ApresentationHeader";
import { Button } from "@/components/ui/button";
import { useThemeStore } from "@/store/theme";
import { SunMoon } from "lucide-react";
import { Outlet } from "react-router-dom";

export function AuthLayout() {
  const { setTheme, theme } = useThemeStore();
  return (
    <main
      className={`w-full h-screen relative flex items-center justify-center bg-white dark:bg-zinc-950 `}
    >
      <ApresentationHeader />
      <div className="w-[400px] mt-7 2xl:h-[70%]">
        <Outlet />
      </div>
      <Button variant={"outline"} className="absolute bottom-10 left-10" size={"icon"} onClick={() => setTheme(theme == "dark" ? "light" : "dark")}>
        <SunMoon size={15} />
      </Button>
    </main>
  )
}