import type { Form, FormField as FormFieldType } from "@/@types/Form";
import { useUserStore } from "@/store/user";
import { Reorder, useDragControls, useMotionValue } from "framer-motion";
import { useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { FormInput } from "./ui/FormInput";
import { Grip } from "lucide-react";
interface Props {
  form?: Form;
  isEditable?: boolean;
}
export function DynamicFlowForm({ form, isEditable }: Props) {
  const user = useUserStore(state => state.user);
  const methods = useForm();
  const y = useMotionValue(0);
  const dragControls = useDragControls();

  const [fieldsOrder, setFieldsOrder] = useState<FormFieldType[]>(form ? form.fields : []);
  const [fieldsIds, setFieldsIds] = useState(
    form && form.fields ? form.fields.map((field) => field.name) : []
  );

  const onReorderFields = useCallback((newOrder: (number | string)[]) => {
    const newFieldsOrder = newOrder
      .map(
        (order) => fieldsOrder
          .find(p => p.name == order)!);

    setFieldsOrder(newFieldsOrder.map((_, i) => ({ ..._, order: i })));
  }, [fieldsOrder]);

  const handleSubmit = useCallback(() => {

  }, [])
  return (
    <>
      {form && (
        <FormProvider {...methods}>
          <form className=" flex flex-col gap-6" onSubmit={methods.handleSubmit(handleSubmit)}>
            <Reorder.Group
              onReorder={onReorderFields}
              values={fieldsIds}
              className="flex flex-col gap-4 overflow-hidden"
            >
              {fieldsOrder.map((order) => (
                <Reorder.Item
                  dragListener={false}
                  value={order.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ y }}
                  key={order.name}
                  dragControls={dragControls}
                  className={"relative flex w-full gap-2"}
                >
                  <Button
                    variant={"ghost"}
                    className={""}
                    onPointerDown={(event) => dragControls.start(event)}
                    type="button"
                  >
                    <Grip />
                  </Button>
                  <FormField
                    control={methods.control}
                    name={order.name}
                    render={({ field }) => (
                      < FormItem className="p-2 rounded-lg border border-dashed w-full">
                        <FormLabel>{order.label}</FormLabel>
                        <FormControl>
                          <FormInput
                            required={order.required}
                            placeholder={order.label}
                            {...field}
                            defaultValue={order.value ?? ""}
                          />
                        </FormControl>
                        <FormDescription>This is your public display name.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </Reorder.Item>
              ))}
            </Reorder.Group>
            <Button type="submit" variant={"outline"}>
              Submit
            </Button>
          </form>
        </FormProvider>
      )}
    </>
  );
}