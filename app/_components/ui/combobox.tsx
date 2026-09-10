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
          className="w-full justify-between px-3 py-2 text-sm font-normal text-slate-600 hover:text-purple-500 sm:px-4 sm:py-2.5 sm:text-base"
        >
          <span className="truncate">{displayText}</span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50 sm:h-5 sm:w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="z-[100] max-h-[90vh] w-[--radix-popover-trigger-width] overflow-hidden p-0"
        align="start"
        side="top"
        sideOffset={8}
      >
        <Command className="w-full">
          <CommandInput
            placeholder="Buscar cliente ou procedimento..."
            className="px-3 py-2 text-sm sm:px-4 sm:py-2.5 sm:text-base"
          />
          <CommandList className="[&::-webkit-scrollbar-track]:purple-600 max-h-[250px] overflow-y-auto sm:max-h-[350px] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-purple-500 hover:[&::-webkit-scrollbar-thumb]:bg-purple-400 [&::-webkit-scrollbar]:w-2">
            <CommandEmpty className="py-6 text-center text-sm text-slate-500 sm:text-base">
              Nenhum cliente encontrado.
            </CommandEmpty>
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
                  className="cursor-pointer px-2 py-2 hover:bg-slate-100 active:bg-slate-200 sm:px-4 sm:py-3"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4 shrink-0 text-slate-600 sm:h-5 sm:w-5",
                      value === option.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  <div className="flex min-w-0 cursor-pointer flex-col gap-0.5 sm:gap-1">
                    <span className="truncate text-sm font-medium text-slate-500 sm:text-base">
                      {option.label}
                    </span>
                    {option.procedure && (
                      <span className="truncate text-xs text-purple-500 sm:text-sm">
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
