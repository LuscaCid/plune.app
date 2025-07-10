import { NodeToolbar, Position, type NodeProps } from "reactflow";
import React, { useCallback } from "react";
import "@reactflow/node-resizer/dist/style.css"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { FormInput } from "../ui/FormInput";
import { FormProvider, useForm } from "react-hook-form";
import type { FlowNodeData } from "@/@types/Flow";
import { Button } from "../ui/button";
import { FlowCard } from "../ui/FlowCard";
import { Pencil, Trash } from "lucide-react";
import { DefaultNodeComponents } from "./DefaultNodeComponents";
import { useLocation } from "react-router-dom";
import { useUserStore } from "@/store/user";
import { useRoles } from "@/hooks/use-roles";
import { CustomDropdownMenuItem } from "../UserDropdown";
import { DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator } from "../ui/dropdown-menu";

export const FormNodeType = React.memo((nodeProps: NodeProps<FlowNodeData>) => {
  const methods = useForm();
  const path = useLocation();
  const { canEdit } = useRoles();
  const selectedOrganization = useUserStore(state => state.selectedOrganization);
  const isModelsPage = path.pathname.includes("models");
  const handleSubmit = useCallback((data: unknown) => {
    console.log(data);
  }, [])
  return (
    <FlowCard
      dropdownContent={
        isModelsPage && canEdit(selectedOrganization!) && (
          <DropdownMenuContent>
            <DropdownMenuLabel>Edition</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <CustomDropdownMenuItem  title="Edit Form" icon={Pencil} onClick={() => console.log("Edit Form")}/> 
            <CustomDropdownMenuItem  title="Remove Form" icon={Pencil} onClick={() => console.log("Remove Form")}/> 
          </DropdownMenuContent>
        )
      }
      status={nodeProps.data.status ?? "pending"}
      title={nodeProps.data.form ? nodeProps.data.form.name : "ForPmulário"}
    >
      {nodeProps.data.form && (
        <FormProvider {...methods}>
          <form className="flex flex-col gap-4" onSubmit={methods.handleSubmit(handleSubmit)}>

            {nodeProps.data.form.fields.map((formField) => (
              <FormField
                key={formField.name}
                control={methods.control}
                name={formField.name}
                render={({ field }) => (
                  < FormItem className="p-2 rounded-lg">
                    <FormLabel>{formField.label}</FormLabel>
                    <FormControl>
                      <FormInput
                        disabled
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