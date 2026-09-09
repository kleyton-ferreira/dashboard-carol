import { PlusIcon } from "lucide-react";
import { Button } from "../_components/ui/button";
import { Sheet, SheetTrigger } from "../_components/ui/sheet";
import UpsertSheetContent from "./_components/upsert-sheet-content";
import { getProducts } from "../_data-access/product/get-products";
import { ComboboxOption } from "../_components/ui/combobox";

const SalesPage = async () => {
  const products = await getProducts();
  const productOptionsValues: ComboboxOption[] = products.map((prod) => ({
    label: prod.nameClient,
    value: prod.id,
  }));

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex flex-col items-start justify-between gap-3 border-b border-gray-200 bg-white px-4 py-3 sm:flex-row sm:items-center md:px-8 md:py-4">
        <div className="">
          <h2 className="hidden text-base font-bold text-slate-700 md:block md:text-lg">
            Serviçoes & Clientes
          </h2>
          <p className="mt-1 hidden text-sm text-slate-500 sm:block">
            Gerencie seus clientes e serviços
          </p>
        </div>
        <div className="w-full sm:w-auto [&_svg]:size-auto">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="secondary">
                <PlusIcon size={16} /> Registrar faturamento
              </Button>
            </SheetTrigger>
            <UpsertSheetContent
              productsOptions={productOptionsValues}
              products={JSON.parse(JSON.stringify(products))}
            />
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default SalesPage;
