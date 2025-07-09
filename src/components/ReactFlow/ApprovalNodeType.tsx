import React, { useState } from "react";
import { DefaultNodeComponents } from "./DefaultNodeComponents";
import type { NodeProps } from "reactflow";
import type { FlownNodeData } from "@/@types/Flow";
import { Input } from "../ui/FormInput";
import { Button } from "../ui/button";
import { Check } from "lucide-react";
import { FlowCard } from "../ui/FlowCard";

export const ApprovalNodeType = React.memo((nodeProps: NodeProps<FlownNodeData>) => {
  //posteriormente verificar cargo de usuario para realizar edição de campos dentro do flow model
  const [fieldsEnabled, setFieldsEnabled] = useState(false);

  return (
    <FlowCard
      status={nodeProps.data.status ?? "pending"}
      title="Approvers"
    >
      <form className="flex flex-col gap-2">
        {nodeProps.data.approvers && (
          nodeProps.data.approvers.map((approver) => (
            <Input
              className="cursor-text"
              onDoubleClick={() => {
                if (!fieldsEnabled) {
                  setFieldsEnabled(true)
                }
              }}
              disabled={!fieldsEnabled}
              value={approver} key={approver} />
          ))
        )}
        {fieldsEnabled && (
          <footer className="flex flex-col gap-2">
            <Button type="submit" variant={"outline"} >
              Save <Check />
            </Button>
            <Button onClick={() => setFieldsEnabled(false)} variant={"ghost"} >
              Cancel
            </Button>
          </footer>
        )}
      </form>
      <DefaultNodeComponents nodeProps={nodeProps} />
    </FlowCard>
  )
}) 
