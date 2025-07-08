import type { ReactNode } from "react"

interface Props {
  children: ReactNode;
}
export function ScreenWrapper({ children }: Props) {
  return (
    <div className="h-full w-full mt-3 dark:bg-zinc-950 verflow-auto relative rounded-lg flex flex-col gap-2" style={{ height: "calc(100% - 1.6rem)" }}>
      {children}
    </div>
  )
}