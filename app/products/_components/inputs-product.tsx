"use client";

import { Input } from "@/app/_components/ui/input";
import { NumericFormat } from "react-number-format";
import { CreateProductSchema } from "@/app/_actions/create-product/schema";
import { UseFormReturn } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";

interface ProductInputsProps {
  forms: UseFormReturn<CreateProductSchema>;
}

const InputsProduct = ({ forms }: ProductInputsProps) => {
  return (
    <div className="grid gap-4 sm:grid-cols-1 sm:gap-5 md:grid-cols-2 xl:grid-cols-1">
      <FormField
        control={forms.control}
        name="id"
        render={({ field }) => (
          <input type="hidden" {...field} value={field.value ?? ""} />
        )}
      />

      {/* INPUT - 1: Nome da Cliente */}
      <FormField
        control={forms.control}
        name="nameClient"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel className="text-xs text-slate-700 sm:text-sm">
              Nome da cliente
            </FormLabel>
            <FormControl>
              <Input
                error={!!forms.formState.errors.nameClient}
                placeholder="Digite o nome"
                className="h-9 text-sm sm:h-10"
                {...field}
              />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />

      {/* INPUT - 2: Serviço */}
      <FormField
        control={forms.control}
        name="name"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel className="text-xs text-slate-700 sm:text-sm">
              Serviço
            </FormLabel>
            <FormControl>
              <Input
                error={!!forms.formState.errors.name}
                placeholder="Digite o serviço"
                className="h-9 text-sm sm:h-10"
                {...field}
              />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />

      {/* INPUT - 3: Valor do Serviço */}
      <FormField
        control={forms.control}
        name="price"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel className="text-xs text-slate-700 sm:text-sm">
              Valor do serviço
            </FormLabel>
            <FormControl>
              <NumericFormat
                customInput={Input}
                id="price"
                thousandSeparator="."
                decimalSeparator=","
                prefix="R$ "
                decimalScale={2}
                fixedDecimalScale
                placeholder="R$ 0,00"
                error={!!forms.formState.errors.price}
                className="h-9 text-sm sm:h-10"
                value={field.value}
                onValueChange={(values) => {
                  field.onChange(values.floatValue ?? 0);
                }}
                onBlur={field.onBlur}
                name={field.name}
              />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />

      {/* INPUT - 4: Procedimento */}
      <FormField
        control={forms.control}
        name="stock"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel className="text-xs text-slate-700 sm:text-sm">
              Procedimento
            </FormLabel>
            <FormControl>
              <Input
                error={!!forms.formState.errors.stock}
                type="number"
                placeholder="Digite o procedimento"
                className="h-9 text-sm sm:h-10"
                {...field}
                onChange={(e) => {
                  const value = e.target.valueAsNumber;
                  field.onChange(isNaN(value) ? 0 : value);
                }}
              />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
    </div>
  );
};

export default InputsProduct;
