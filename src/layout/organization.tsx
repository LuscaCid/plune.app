import { Outlet } from "react-router-dom";

export function OrganizationLayout() {
  return (
    <div className="h-screen w-full bg-zinc-50 dark:bg-zinc-950 items-center justify-center flex">
      <div className=" w-[80%] m-auto">
        <Outlet />
      </div>
    </div>
  )
}