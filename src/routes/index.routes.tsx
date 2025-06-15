import { useUserStore } from "@/store/user";
import { BrowserRouter } from "react-router-dom"
import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";
import { Toaster } from "@/components/ui/sonner";
export function Router() {
  const user = useUserStore(state => state.user);
  return (
    <BrowserRouter>
      <Toaster />
      {!user ? <AppRoutes /> : <AuthRoutes />}
    </BrowserRouter>
  )
}