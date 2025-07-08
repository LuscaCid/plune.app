import * as React from "react"

import { cn } from "@/lib/utils"
import { useFormContext } from "react-hook-form"
interface InputProps<T extends string> extends React.ComponentProps<"input"> {
  name: T
}
function Input<T extends string>({ className, type, name, ...props }: InputProps<T>) {
  const { formState: { errors, }, register } = useFormContext();
  return (
    <div className="flex flex-col gap-2">
      <input
        {...register(name!)}
        type={type}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className
        )}
        {...props}
      />
      {errors && errors[name!] && (
        <div className="text-destructive text-sm">
          {errors[name!]?.message?.toString()}
        </div>
      )}
    </div>

  )
}

export { Input }
