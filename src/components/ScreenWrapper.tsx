import type { ReactNode } from "react"

interface Props {
  children: ReactNode;
}
export function ScreenWrapper({ children }: Props) {
  return (
    <div className="h-full w-full dark:bg-zinc-950 verflow-auto relative rounded-lg" style={{ height: "calc(100% - 3.6rem)" }}>
      {children}
    </div>
  )
}