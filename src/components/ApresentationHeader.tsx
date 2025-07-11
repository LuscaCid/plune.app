import { WindowButtons } from "./AppHeader";
import { TypographyH4 } from "./ui/Typography";

export function ApresentationHeader () {
  return (
    <header
      className={` title-bar-drag-region backdrop-blur-lg z-[100000] absolute  py-2 px-4  h-fit flex items-center w-full top-0`}
    >
      <TypographyH4 content="Plune.app"/>
      <WindowButtons/>
    </header>
  )
}