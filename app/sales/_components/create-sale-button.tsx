"use client";

import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import UpsertSheetContent from "./upsert-sheet-content";
import { Product } from "@prisma/client";
import { ComboboxOption } from "@/app/_components/ui/combobox";

interface CreateSaleButtonProps {
  products: Product[];
  productOptions: ComboboxOption[];
}

const CreateSaleButton = ({
  productOptions,
  products,
}: CreateSaleButtonProps) => {
  const [sheetIsOpen, setSheetIsOpen] = useState(false);

  return (
    <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
      <SheetTrigger asChild>
        <Button variant="secondary" className="m-auto w-[97.9%]">
          <PlusIcon size={16} /> Registrar faturamento
        </Button>
      </SheetTrigger>
      <UpsertSheetContent
        productsOptions={productOptions}
        products={products}
        onSubmitSuccess={() => setSheetIsOpen(false)}
      />
    </Sheet>
  );
};

export default CreateSaleButton;
