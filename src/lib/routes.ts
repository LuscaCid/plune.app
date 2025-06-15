import { FormInput, HelpCircle, Home, LucideWorkflow, Settings, Signature, User } from "lucide-react"

export const headerItems = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Flows",
    url: "/flows/",
    icon: LucideWorkflow,
  },
  {
    title: "Forms",
    url: "/forms/",
    icon: FormInput,
  },
  {
    title: "Approvals",
    url: "/approvals",
    icon: Signature,
  },
]
export const footerItems = [
  {
    title: "Configurações",
    url: "#",
    icon: Settings,
  },
  {
    title: "Profile",
    url: "/dashboard/profile",
    icon: User,
  },
  {
    title: "Help",
    url: "#",
    icon: HelpCircle,
  },
]