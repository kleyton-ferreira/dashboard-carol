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
    <div className="space-y-5">
      {/* INPUT - 1  */}
      <FormField
        control={forms.control}
        name="nameClient"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-slate-700">Nome da cliente</FormLabel>
            <FormControl>
              <Input
                error={!!forms.formState.errors.nameClient}
                placeholder=""
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      ></FormField>

      {/* INPUT - 2  */}
      <FormField
        control={forms.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-slate-700">Serviço</FormLabel>
            <FormControl>
              <Input
                error={!!forms.formState.errors.name}
                placeholder=""
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      ></FormField>

      {/* INPUT - 3  */}
      <FormField
        control={forms.control}
        name="price"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-slate-700">Valor do serviço</FormLabel>
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
                // disabled={isPending}
                value={field.value}
                onValueChange={(values) => {
                  field.onChange(values.floatValue ?? 0);
                }}
                onBlur={field.onBlur}
                name={field.name}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      ></FormField>

      {/* INPUT - 4  */}
      <FormField
        control={forms.control}
        name="stock"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-slate-700">Procedimento</FormLabel>
            <FormControl>
              <Input
                error={!!forms.formState.errors.stock}
                type="number"
                placeholder=""
                {...field}
                onChange={(e) => {
                  const value = e.target.valueAsNumber;
                  field.onChange(isNaN(value) ? 0 : value);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      ></FormField>
    </div>
  );
};

export default InputsProduct;
