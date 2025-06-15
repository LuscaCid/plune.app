import { Button } from "./ui/button";
import { SidebarTrigger, useSidebar } from "./ui/sidebar";
import { TypographyH4, TypographyMuted } from "./ui/Typography";
import { Search, SunMoon } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { useThemeStore } from "@/store/theme";

export function AppHeader() {
  const { setTheme, theme } = useThemeStore();
  const { open }= useSidebar()
  return (
    <header
      className={`${!open ? "ml-2" : ""} backdrop-blur-lg z-20 fixed md:static rounded-lg p-2 pl-3 pr-4 mt-2  h-fit flex items-center bg-white/80 md:bg-zinc-50 dark:bg-zinc-900 dark:bg-[oklch(0.21 0.01 0)] justify-between border border-zinc-200 dark:border-zinc-800 `}
    >
      <aside className="flex items-center gap-1">
        <SidebarTrigger size={"lg"} />
        <div className="h-full w-[1px] bg-zinc-100 dark:bg-zinc-800" />
        <TypographyH4 content="/Dashboard" />
      </aside>
      <aside className="flex items-center gap-2">
        <Button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="rounded-full"
          variant={"ghost"}
        >
          <SunMoon size={30} />
        </Button>
        <Dialog modal={true}>
          <DialogTrigger asChild>
            <Button variant={"outline"}
              title="Pesquisar"
              content="Pesquisar"
              className="cursor-text"
            >
              <TypographyMuted content="/Pesquisar por dados" />
              <Search size={15} />
            </Button>
          </DialogTrigger>
          <DialogContent >
            <DialogHeader>
              <DialogTitle>
                /Pesquisar
              </DialogTitle>
              <DialogDescription>
                Use esta area para pesquisar por dados, relatórios ou qualquer outra informação relevante dentro do sistema.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <form className="w-full max-w-[500px] m-auto flex flex-col gap-5 ">
                <Input
                  type="text"
                  placeholder="pesquisa..."
                />
                <Button className="w-full cursor-pointer" type="submit">
                  Pesquisar
                </Button>
              </form>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </aside>
    </header>
  );
}