'use client'

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Command, CommandGroup, CommandItem } from "@/components/ui/command"
import { Checkbox } from "@/components/ui/checkbox"
import { type Dispatch, type SetStateAction, useState } from "react"

export interface Option {
  label: string;
  value: string;
}
interface Props {
  options: Option[];
  selected: string[];
  setSelected: Dispatch<SetStateAction<string[]>>;
  defaultValues?: string[];
  onChange?: (selected: string[]) => void;
  placeholder?: string;
}
export default function MultiSelectControlled({
  onChange,
  options,
  placeholder,
  selected,
  setSelected
}: Props) {
  const [open, setOpen] = useState(false)

  const toggleSelect = (value: string) => {
    setSelected((prev) => {
      const newValue = prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
      if (onChange) {
        onChange(newValue);
      }
      return newValue
    })
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="justify-start">
          {selected.length > 0
            ? `${selected.length}/${options.length} selecionado(s)`
            : placeholder ? placeholder : "Selecione opções"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                onSelect={() => toggleSelect(option.value)}
              >
                <Checkbox
                  checked={selected.includes(option.value)}
                  className="mr-2"
                />
                <span>{option.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
