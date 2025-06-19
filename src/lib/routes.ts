import { Building2, FormInput, HelpCircle, Home, Settings, Signature, User } from "lucide-react"

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
  {
    title: "Organizations",
    url: "/organizations",
    icon: Building2,
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