import { NodeToolbar, Position, type NodeProps } from "reactflow";
import React, { useCallback } from "react";
import "@reactflow/node-resizer/dist/style.css"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { FormProvider, useForm } from "react-hook-form";
import type { FlownNodeData } from "@/@types/Flow";
import { Button } from "../ui/button";
import { DefaultNodeComponents } from "./DefaultNodeComponents";
import { FlowCard } from "../ui/FlowCard";
import { Trash } from "lucide-react";

export const FormNodeType = React.memo((nodeProps: NodeProps<FlownNodeData>) => {
  const methods = useForm();

  const handleSubmit = useCallback((data: unknown) => {
    console.log(data);
  }, [])
  return (
    <FlowCard
      status={nodeProps.data.status ?? "pending"}
      title={nodeProps.data.form ? nodeProps.data.form.name : "Formulário"}
    >
      {nodeProps.data.form && (
        <FormProvider {...methods}>
          <form className="flex flex-col gap-4" onSubmit={methods.handleSubmit(handleSubmit)}>

            { nodeProps.data.form.fields.map((formField) => (
              <FormField
                key={formField.name}
                control={methods.control}
                name={formField.name}
                render={({ field }) => (
                  < FormItem className="p-2 rounded-lg border border-dashed">

                    <FormLabel>{formField.label}</FormLabel>
                    <FormControl>
                      <Input
                        required={formField.required}
                        placeholder={formField.label}
                        {...field}
                        defaultValue={formField.value ?? ""}
                      />
                    </FormControl>
                    <FormDescription>This is your public display name.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <Button type="submit" variant={"outline"}>
              Submit
            </Button>
          </form>
        </FormProvider>
      )}
      <NodeToolbar
        className="bg-zinc-300/80 backdrop:blur-md dark:bg-zinc-900 p-1 shadow-md rounded-md flex gap-1 -top-3"
        isVisible={nodeProps.selected}
        position={Position.Top}
      >
        <div>
          <Button variant={"ghost"}>
            remove <Trash size={15} />
          </Button>
        </div>
      </NodeToolbar>
      <DefaultNodeComponents nodeProps={nodeProps} />
    </FlowCard>


  );
})