import { FormInput, HelpCircle, Home, Settings, Signature, User } from "lucide-react"

export const headerItems = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
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
    title: "Settings",
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