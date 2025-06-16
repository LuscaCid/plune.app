import React from "react";
import { FlowCard } from "../ui/FlowCard";
import type { NodeProps } from "reactflow";
import type { FlownNodeData } from "@/@types/Flow";
import { TypographyMuted, TypographySmall } from "../ui/Typography";
import { DefaultNodeComponents } from "./DefaultNodeComponents";
import { DropdownMenuContent } from "../ui/dropdown-menu";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";

export const WebhookNodeType = React.memo((nodeProps: NodeProps<FlownNodeData>) => {
  return (
    <FlowCard
      status={nodeProps.data.status ?? "pending"}
      dropdownContent={
        <DropdownMenuContent>
          <DropdownMenuItem>
            Editar
          </DropdownMenuItem>
        </DropdownMenuContent>
      }
      title="Webhook"
    >
      <div className="flex flex-col gap-2">
        <TypographySmall content={nodeProps.data.label} />
        <TypographyMuted content={nodeProps.data.webhookUrl ?? ""} />
      </div>
      <DefaultNodeComponents nodeProps={nodeProps} />
    </FlowCard>
  );
})