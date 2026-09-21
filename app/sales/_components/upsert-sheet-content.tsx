"use client";

import { Button } from "@/app/_components/ui/button";
import { ComboboxOption } from "@/app/_components/ui/combobox";
import { CreateSale } from "@/app/_actions/sale/create-sale";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";

import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/app/_components/ui/sheet";

import { Product } from "@prisma/client";
import { useState } from "react";
import TableContent from "./table-content";
import { flattenValidationErrors } from "next-safe-action";
import SelectionClient from "./selection-client";
import { Loader2Icon } from "lucide-react";

// esse

interface UpsertSheetContentProps {
  products: Product[];
  productsOptions: ComboboxOption[];
  onSubmitSuccess: () => void;
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
  onSubmitSuccess,
}: UpsertSheetContentProps) => {
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>(
    [],
  );

  const resetAllData = () => {
    setSelectedProducts([]);
  };

  const { execute: executeCreateSale, isPending } = useAction(CreateSale, {
    onError: ({ error: { validationErrors, serverError } }) => {
      const flattenedErrors = flattenValidationErrors(validationErrors);
      toast.error(serverError ?? flattenedErrors.formErrors[0]);
    },
    onSuccess: () => {
      toast.success("Cliente adicionado com sucesso.");
      onSubmitSuccess();
      resetAllData();
    },
  });

  const handleSubmitSales = async () => {
    executeCreateSale({
      products: selectedProducts.map((prod) => ({
        id: prod.id,
        quantity: prod.quantity,
      })),
    });
  };

  return (
    <SheetContent className="!max-w-[720px]">
      <SheetHeader>
        <SheetTitle>
          <p className="-mb-2 text-[15px] font-semibold text-purple-600">
            Atendimentos de clientes
          </p>
        </SheetTitle>
        <SheetDescription>Faturamento e dados do cliente.</SheetDescription>
      </SheetHeader>

      <SelectionClient
        products={products}
        productsOptions={productsOptions}
        setSelectedProducts={setSelectedProducts}
      />

      <TableContent
        selectedProducts={selectedProducts}
        hanldeSelectedProducts={setSelectedProducts}
      />

      <SheetFooter>
        <Button
          className="w-full"
          variant="secondary"
          disabled={selectedProducts.length === 0 || isPending}
          onClick={handleSubmitSales}
        >
          {isPending ? (
            <>
              <Loader2Icon size={16} className="animate-spin" />
              Enviando...
            </>
          ) : (
            "Enviar Clientes"
          )}
        </Button>
      </SheetFooter>
    </SheetContent>
  );
};

export default UpsertSheetContent;
