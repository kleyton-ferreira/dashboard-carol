"use client";

import { Button } from "@/app/_components/ui/button";
import { Combobox, ComboboxOption } from "@/app/_components/ui/combobox";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";

import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/app/_components/ui/sheet";

import { zodResolver } from "@hookform/resolvers/zod";
import { Product } from "@prisma/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import TableContent from "./table-content";

const formSchema = z.object({
  productId: z.string().min(1, "O cliente e obrigatório.").uuid(),
  quantity: z.coerce
    .number({
      required_error: "A quantidade é obrigatória.",
    })
    .int("A quantidade deve ser um número inteiro.")
    .positive("A quantidade deve ser maior que zero."),
});

type FormSchema = z.infer<typeof formSchema>;

interface UpsertSheetContentProps {
  products: Product[];
  productsOptions: ComboboxOption[];
}

export interface SelectedProduct {
  id: string;
  nameClient: string;
  name: string;
  price: number;
  quantity: number;
}

const UpsertSheetContent = ({
  productsOptions,
  products,
}: UpsertSheetContentProps) => {
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>(
    [],
  );

  const forms = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: "",
      quantity: 1,
    },
  });

  const handleOnsubmit = (data: FormSchema) => {
    const selectedProduct = products.find((prod) => prod.id === data.productId);
    if (!selectedProduct) return;

    setSelectedProducts((currentProducts) => {
      const existingProduct = currentProducts.find(
        (product) => product.id === selectedProduct.id,
      );

      if (existingProduct) {
        const productIsOuOfStock =
          existingProduct.quantity + data.quantity > selectedProduct.stock;
        if (productIsOuOfStock) {
          forms.setError("quantity", {
            message: "Quantidade indisponível de procedimento",
          });
          return currentProducts;
        }
        forms.reset();
        return currentProducts.map((prod) => {
          if (prod.id === selectedProduct.id) {
            return {
              ...prod,
              quantity: prod.quantity + data.quantity,
            };
          }
          return prod;
        });
      }

      const productIsOuOfStock = data.quantity > selectedProduct.stock;
      if (productIsOuOfStock) {
        forms.setError("quantity", {
          message: "Quantidade indisponível de procedimento",
        });
        return currentProducts;
      }
      forms.reset();
      return [
        ...currentProducts,
        {
          ...selectedProduct,
          price: Number(selectedProduct.price),
          quantity: data.quantity,
        },
      ];
    });
  };

  //

  return (
    <SheetContent className="!max-w-[680px]">
      <SheetHeader>
        <SheetTitle className="font-semibold text-purple-600">
          Atendimentos de clientes
        </SheetTitle>
        <SheetDescription>
          Informe os dados do cliente e o faturamento realizado.
        </SheetDescription>
      </SheetHeader>

      <Form {...forms}>
        <form
          className="space-y-6 py-6"
          onSubmit={forms.handleSubmit(handleOnsubmit)}
        >
          <FormField
            control={forms.control}
            name="productId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-purple-600">Cliente</FormLabel>

                <Combobox
                  placeholder="Selecione a clientes"
                  options={productsOptions}
                  onChange={field.onChange}
                  value={field.value}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={forms.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-purple-600">Procedimento</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Digite a quantidade"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button variant="secondary" className="w-full gap-2" type="submit">
            Selecionar Clientes
          </Button>
        </form>
      </Form>

      <TableContent
        selectedProducts={selectedProducts}
        hanldeSelectedProducts={setSelectedProducts}
      />
    </SheetContent>
  );
};

export default UpsertSheetContent;
