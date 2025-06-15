import { Handle, NodeResizer, NodeToolbar, Position, type NodeProps } from "reactflow";
import React from "react";
import "@reactflow/node-resizer/dist/style.css"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { FormProvider, useForm } from "react-hook-form";
import type { FlownNodeData } from "@/@types/Flow";
import { Button } from "../ui/button";
import { TypographyH4 } from "../ui/Typography";

export const FormNodeType = React.memo((nodeProps: NodeProps<FlownNodeData>) => {
  const methods = useForm();

  return (
    <div className="rounded-lg flex flex-col border border-zinc-300 dark:border-zinc-700">
      {nodeProps.data.form && (
        <FormProvider {...methods}>
          <form className="flex flex-col gap-4 p-2 py-4 rounded-lg bg-zinc-50 border-zinc-300 dark:bg-zinc-800 dark:border-zinc-700" action="">
            <TypographyH4 className="border-b border-zinc-200 dark:border-zinc-800 pb-2" content={nodeProps.data.form.name}/>
            {nodeProps.data.form.fields.length > 0 && nodeProps.data.form.fields.map((flowField) => (
              < FormField
                key={flowField.name}
                control={methods.control}
                name={flowField.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{flowField.label}</FormLabel>
                    <FormControl>
                      <Input placeholder={flowField.label} {...field} defaultValue={flowField.value ?? ""}   />
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

      <NodeResizer
        isVisible={nodeProps.selected}
        lineClassName={`${nodeProps.selected ? "ring-[1.5px] ring-zinc-200/50 " : ""}   transition-all duration-200`}
        handleClassName="w-3 h-3 rounded-full bg-zinc-200 "
      />
      <NodeToolbar
        className="bg-zinc-300/80 backdrop:blur-md dark:bg-zinc-900 p-1 shadow-md rounded-md flex gap-1 -top-3"
        isVisible={nodeProps.selected}
        position={Position.Top} 
      >
        <div>
          <Button variant={"ghost"}>
            remov
          </Button>
        </div>
      </NodeToolbar>
      <NodeResizer
        isVisible={nodeProps.selected}
        minHeight={150}
        minWidth={270}
        maxHeight={550}
        lineClassName={`${nodeProps.selected ? "ring-[3px] dark:ring-zinc-600/80" : ""}   transition-all duration-200`}
        handleClassName="w-3 h-3 rounded-full bg-orange-600"
      />
      <Handle
        id="right"
        type="source"
        position={Position.Right}
        className={`${!nodeProps.selected && "opacity-90"} p-1 bg-zinc-200 dark:bg-zinc-200  -right-10`}
      />
      <Handle
        className={`${!nodeProps.selected && "opacity-90"} p-1 bg-zinc-200 dark:bg-zinc-200   -left-10`}
        id="left"
        type="source"
        position={Position.Left}
      />
      <Handle
        className={`${!nodeProps.selected && "opacity-90"} p-1 bg-zinc-200 dark:bg-zinc-200  -top-10`}
        id="top"
        type="source"
        position={Position.Top}
      />
      <Handle
        className={`${!nodeProps.selected && "opacity-90"} p-1 bg-zinc-200 dark:bg-zinc-200  -bottom-10`}
        id="bottom"
        type="source"
        position={Position.Bottom}
      />
    </div>


  );
})