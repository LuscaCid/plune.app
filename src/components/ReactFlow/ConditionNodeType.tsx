import { Handle, Position, type NodeProps } from "reactflow";
import { DefaultNodeComponents } from "./DefaultNodeComponents";
import type { FlowNodeData } from "@/@types/Flow";
import { TypographyMuted, TypographySmall } from "../ui/Typography";
import React from "react";
import { FormInput } from "../ui/FormInput";
import { Card } from "../ui/card";
import { FlowCard } from "../ui/FlowCard";

export const ConditionNodeType = React.memo((nodeProps: NodeProps<FlowNodeData>) => {

  //validar a regra de acordo com os valores dentro do formulário
  return (
    <FlowCard
      status={nodeProps.data.status ?? "pending"}
      title={nodeProps.data.label}
    >
      <header className="flex flex-col gap-3">
        <TypographyMuted
          className="border-b border-zinc-200 dark:border-zinc-700 pb-2"
          content="Regras para serem aplicadas após submissão de formulário"
        />
      </header>
      {nodeProps.data.rules && nodeProps.data.rules.map((rule, idx) => (
        <Card className="flex flex-col gap-2 px-2 py-3" key={rule.fieldName + idx}>
          <FormInput value={rule.fieldName} disabled />
          <FormInput value={rule.operator} disabled />
          {(typeof rule.value === "string" || typeof rule.value == "number") && (
            <FormInput value={rule.value} disabled />
          )}
          <TypographySmall className="mt-2 ml-1" content={"if ok? -> "+rule.targetNodeId}/>
        </Card>
      ))}
      <DefaultNodeComponents nodeProps={nodeProps} />
      <Handle
        className={`${!nodeProps.selected && "opacity-90"} p-1 bg-zinc-200 dark:bg-zinc-200 -mb-5`}
        id="left"
        type="source"
        position={Position.Bottom}
      />
    </FlowCard>
  );
})