import type { ReactNode } from "react"

interface Props {
  children : ReactNode;
}
export function ScreenWrapper ({ children } : Props) {
  return (
    <div className="h-full w-full bg-white dark:bg-zinc-950">
      {children}
    </div>
  )
}