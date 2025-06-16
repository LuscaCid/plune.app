import { useMemo, type ReactNode } from "react";
import { Card, CardFooter } from "./card";
import { TypographyH4, TypographyMuted } from "./Typography";
import { DropdownMenu } from "./dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { Button } from "./button";
import type { FlowNodeStatus } from "@/@types/Flow";
type FlowStageBorderStatus = Record<FlowNodeStatus, string>
interface Props {
  children: ReactNode;
  title: string;
  dropdownContent?: ReactNode;
  status : FlowNodeStatus;
}
export function FlowCard({ children, title, dropdownContent, status }: Props) {

  const borderAccordingStatus : FlowStageBorderStatus = useMemo(() => ({
    completed : "border-green-300 dark:border-green-500",
    failed : "border-red-300 dark:border-red-500",
    pending : "border-yellow-300 dark:border-yellow-500",
    skipped : "border-blue-300 dark:border-blue-500"
  } satisfies FlowStageBorderStatus), []);

  return (
    <Card className={"px-4 py-6 bg-zinc-50  dark:bg-zinc-800  flex flex-col gap-4 " + borderAccordingStatus[status]}>
      <header className="flex justify-between items-start">
        <TypographyH4 content={title} />
        {dropdownContent && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"ghost"}>
                <EllipsisVertical size={15} />
              </Button>
            </DropdownMenuTrigger>
            {dropdownContent}
          </DropdownMenu>
        )}
      </header>
      {children}
      <CardFooter className="p-0">
        <TypographyMuted content={"Current status: " + status}/>
      </CardFooter>
    </Card >
  );
} 