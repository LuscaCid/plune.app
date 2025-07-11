import { Outlet } from "react-router-dom";

export function OrganizationLayout() {
  return (
    <div className="h-screen w-full bg-zinc-50 dark:bg-zinc-950 items-center justify-center flex">
      <header className="absolute z-20 top-0 left-0 right-0 bg-none w-full h-14 title-bar-drag-region"></header>
      <div className=" w-[80%] m-auto">
        <Outlet />
      </div>
    </div>
  )
}