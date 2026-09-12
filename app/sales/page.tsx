import { getProducts } from "../_data-access/product/get-products";
import { ComboboxOption } from "../_components/ui/combobox";
import CreateSaleButton from "./_components/create-sale-button";

const SalesPage = async () => {
  const products = await getProducts();
  const productOptionsValues: ComboboxOption[] = products.map((prod) => ({
    procedure: prod.name,
    label: prod.nameClient,
    value: prod.id,
  }));

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex flex-col gap-4 border-b border-gray-200 bg-white px-3 py-3 sm:px-4 sm:py-3 md:flex-row md:items-center md:justify-between md:gap-4 md:px-8 md:py-4 lg:px-10 lg:py-5">
        <div className="hidden min-w-0 flex-col gap-1 md:flex">
          <h1 className="text-lg font-bold text-slate-700 lg:text-xl">
            Serviços & Clientes
          </h1>
          <p className="text-sm text-slate-500 lg:text-base">
            Gerencie seus clientes e serviços
          </p>
        </div>

        <div className="relative -top-[12px] left-1 flex-shrink-0 md:w-auto [&_svg]:size-auto">
          <CreateSaleButton
            productOptions={productOptionsValues}
            products={JSON.parse(JSON.stringify(products))}
          />
        </div>
      </div>
    </div>
  );
};

export default SalesPage;
