import { Button } from "./ui/button";
import { SidebarTrigger } from "./ui/sidebar";
import { TypographyH4 } from "./ui/Typography";
import { Minus, Square, SunMoon, X } from "lucide-react";
import { useThemeStore } from "@/store/theme";

export function AppHeader() {
  const { setTheme, theme } = useThemeStore();
  return (
    <header
      className={` title-bar-drag-region backdrop-blur-lg z-[100000]  fixed md:static  py-2 px-4  h-fit flex items-center bg-white/80   md:bg-zinc-50/80 dark:bg-zinc-900 dark:bg-[oklch(0.21 0.01 0)]  border-b w-full border-zinc-200 dark:border-zinc-800 `}
    >
      <aside className="flex items-center gap-1">
        <SidebarTrigger size={"lg"} className="no-drag" />
        <div className="h-full w-[1px] bg-zinc-100 dark:bg-zinc-800" />
        <TypographyH4 content="/Dashboard" />
      </aside>
      <aside className="flex items-center gap-2 no-drag self-end">
        <Button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="rounded-full "
          variant={"ghost"}
        >
          <SunMoon size={30} />
        </Button>
      </aside>
      <WindowButtons />

    </header>
  );
}

type WindowManipulation = "minimize" | "close" | "resize"
export function WindowButtons() {
  function handleManpulateWindow(type: WindowManipulation) {
    window.ipcRenderer.send(type);
  }
  return (
    <section className="no-drag absolute top-0 flex right-0 z-50 h-full">
      <button
        onClick={() => handleManpulateWindow("minimize")}
        className="p-4  hover:bg-zinc-300 dark:hover:bg-zinc-800 flex items-center transition duration-150 h-full justify-center">
        <Minus size={15} />
      </button>
      <button
        onClick={() => handleManpulateWindow("resize")}
        className="p-4  hover:bg-zinc-300 dark:hover:bg-zinc-800 flex items-center transition duration-150 h-full justify-center">
        <Square size={15} />
      </button>
      <button
        onClick={() => handleManpulateWindow("close")}
        className="p-4 hover:bg-red-600 dark:hover:bg-red-700 flex items-center transition duration-150 h-full justify-center">
        <X size={15} />
      </button>
    </section>
  );
}