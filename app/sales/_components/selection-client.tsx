"use client";

import { Combobox, ComboboxOption } from "@/app/_components/ui/combobox";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";
import { Product } from "@prisma/client";
import { SelectedProduct } from "./upsert-sheet-content";

const formSchema = z.object({
  productId: z.string().min(1, "A seleção de clientes e obrigatório.").uuid(),
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
  setSelectedProducts: React.Dispatch<React.SetStateAction<SelectedProduct[]>>;
}

const SelectionClient = ({
  productsOptions,
  products,
  setSelectedProducts,
}: UpsertSheetContentProps) => {
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

  return (
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
              <FormLabel className="text-[16px] text-purple-600 md:text-[18px]">
                Busca de clientes
              </FormLabel>

              <Combobox
                placeholder="Selecionar clientes"
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
          Adicionar Clientes
        </Button>
      </form>
    </Form>
  );
};

export default SelectionClient;
