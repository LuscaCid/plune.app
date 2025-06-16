import { NodeToolbar, Position, useReactFlow, type NodeProps } from "reactflow";
import React, { useCallback, useState } from "react";
import "@reactflow/node-resizer/dist/style.css"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { FormProvider, useForm } from "react-hook-form";
import type { FlownNodeData, FlowNode } from "@/@types/Flow";
import { Button } from "../ui/button";
import { DefaultNodeComponents } from "./DefaultNodeComponents";
import { FlowCard } from "../ui/FlowCard";
import { Trash } from "lucide-react";
import { useDragField } from "@/store/use-drag-field";
import { useMotionValue, Reorder } from "framer-motion";

export const FormNodeType = React.memo((nodeProps: NodeProps<FlownNodeData>) => {
  const methods = useForm();
  const { setNodes, getNodes } = useReactFlow();
  const y = useMotionValue(0);
  const setIsDragging = useDragField((state) => state.setIsDraggingAnyField);
  const [fieldsOrder, setFieldsOrder] = useState<string[]>(() => {
    if (nodeProps.data.form && nodeProps.data.form.fields.length > 0) {
      return nodeProps.data.form.fields.map((field) => field.name);
    }
    return []
  });

  const handleDragColumn = useCallback(() => {
    setNodes(
      getNodes().map((nd) => {
        if (nodeProps.id == nd.id) {
          setIsDragging(true);
          return { ...nd, draggable: false }
        }
        return nd;
      })
    );
  }, [setNodes, getNodes, nodeProps, setIsDragging]);

  const dragCancel = useCallback(() => {
    setNodes(
      getNodes().map((nd) => {
        if (nodeProps.id == nd.id) {
          setIsDragging(false);
          return { ...nd, draggable: true }
        }
        return nd;
      })
    );
  }, [setNodes, getNodes, nodeProps, setIsDragging])

  const onReorderNodeCols = async (newOrder: string[]) => {
    //rearranjo do array de colunas dentro da tabela de acordo com a ordenacao retornada no argumento da funcao
    setFieldsOrder(newOrder);
    if (nodeProps.data.form) {
      const newOrderForNode = newOrder
        .map((order: string) => nodeProps.data.form!.fields
          .find((field) => field.name == order)!);

      setNodes(
        (getNodes() as FlowNode[]).map(nd => {
          if (nd.id === nodeProps.id) {
            return {
              ...nd,
              data: {
                ...nd.data,
                form: { fields: newOrderForNode }
              }
            };
          }
          return nd;
        })
      );
      // await updateNode(nodeProps);
    }

  }

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
            <Reorder.Group
              axis="y"
              onReorder={onReorderNodeCols}
              values={fieldsOrder}
              className="w-full overflow-hidden transition-none "

            >
              {fieldsOrder.map((order) => {
                const formField = nodeProps.data.form!.fields.find((field) => field.name == order)
                if (formField) {
                  return (
                    <Reorder.Item
                      onPointerDown={handleDragColumn}
                      onPointerUp={dragCancel}
                      onPointerOut={dragCancel}
                      value={formField.name}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      style={{ y }}
                      key={formField.name}
                    >
                      <FormField
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
                    </Reorder.Item>
                  )

                }
              })
            }
            </Reorder.Group>

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