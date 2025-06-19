import { useUserStore } from "@/store/user";
import { BrowserRouter } from "react-router-dom"
import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";
import { Toaster } from "@/components/ui/sonner";
import { useEffect } from "react";
import { useThemeStore } from "@/store/theme";
export function Router() {
  const user = useUserStore(state => state.user);
  const theme = useThemeStore(state => state.theme);
  useEffect(() => {
    const html = document.getElementsByTagName("html")[0];
    if (html) {
      html.classList.add(theme ?? "light");
    }
  },[theme])
  return (
    <BrowserRouter>
      <Toaster />
      {user ? <AppRoutes /> : <AuthRoutes />}
    </BrowserRouter>
  )
}