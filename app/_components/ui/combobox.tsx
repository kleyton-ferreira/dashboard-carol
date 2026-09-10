"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "./button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { cn } from "@/app/_herlpers/utils";

export interface ComboboxOption {
  value: string;
  label: string;
  procedure?: string;
}

interface ComboboxProps {
  options: ComboboxOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const Combobox = ({
  value,
  options,
  placeholder,
  onChange,
}: ComboboxProps) => {
  const [open, setOpen] = React.useState(false);

  const selectedOption = options.find((option) => option.value === value);
  const displayText = selectedOption
    ? `${selectedOption.label}${selectedOption.procedure ? ` - ${selectedOption.procedure}` : ""}`
    : placeholder;

  return (
    <Popover open={open} onOpenChange={setOpen} modal={false}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between font-normal text-slate-600 hover:text-purple-500"
        >
          {displayText}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="z-[100] w-[--radix-popover-trigger-width] p-0"
        align="start"
        side="top"
        sideOffset={8}
      >
        <Command>
          <CommandInput placeholder="Buscar cliente ou procedimento..." />
          <CommandList className="max-h-[300px]">
            <CommandEmpty>Nenhum cliente encontrado.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.label}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onChange(option.value === value ? "" : option.value);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4 text-slate-600",
                      value === option.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  <div className="flex cursor-pointer flex-col gap-1">
                    <span className="font-medium text-slate-500">
                      {option.label}
                    </span>
                    {option.procedure && (
                      <span className="text-sm text-purple-500">
                        {option.procedure}
                      </span>
                    )}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
