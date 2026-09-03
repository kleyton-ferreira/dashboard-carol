"use client";

import { Loader2Icon, PlusIcon } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { NumericFormat } from "react-number-format";
import { useState } from "react";
import { createdProducts } from "@/app/_actions/create-product";
import {
  CreateProductSchema,
  createProductSchema,
} from "@/app/_actions/create-product/schema";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";

const AddProductButton = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const forms = useForm<CreateProductSchema>({
    shouldUnregister: true,
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      nameClient: "",
      name: "",
      price: 0,
      stock: 1,
    },
  });

  const handleOnsubmitClick = async (data: CreateProductSchema) => {
    try {
      await createdProducts(data);
      setDialogIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <PlusIcon size={18} /> Adicionar cliente
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...forms}>
          <form onSubmit={forms.handleSubmit(handleOnsubmitClick)}>
            <DialogHeader className="mb-3">
              <DialogTitle className="text-purple-600">
                Marcação de Cliente
              </DialogTitle>
              <DialogDescription>Informções abaixo</DialogDescription>
            </DialogHeader>

            <div className="space-y-5">
              {/* INPUT - 1  */}
              <FormField
                control={forms.control}
                name="nameClient"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700">
                      Nome da cliente
                    </FormLabel>
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
                    <FormLabel className="text-slate-700">
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
                    <FormLabel className="text-slate-700">
                      Procedimento
                    </FormLabel>
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
            <DialogFooter className="mt-8">
              <DialogClose asChild>
                <Button variant="ghost" type="reset">
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                variant="secondary"
                type="submit"
                className="w-[30%]"
                disabled={forms.formState.isSubmitting}
              >
                {forms.formState.isSubmitting ? (
                  <>
                    <Loader2Icon size={16} className="animate-spin" />
                    Salvando...
                  </>
                ) : (
                  "Salvar"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductButton;
