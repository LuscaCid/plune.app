import { ReactNode } from "react"
import { useFormContext } from "react-hook-form";

interface Props<T extends object> {
  children: ReactNode;
  handleSubmitForm: (data: T) => Promise<unknown>
}
export function FormWrapper<T extends object>({ handleSubmitForm, children }: Props<T>) {
  const { handleSubmit } = useFormContext<T>();
  return (
    <form onSubmit={handleSubmit(handleSubmitForm)} className="flex flex-col gap-5 ">
      {children}
    </form>
  )
}