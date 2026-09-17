import { getProducts } from "../_data-access/product/get-products";
import { ComboboxOption } from "../_components/ui/combobox";
import CreateSaleButton from "./_components/create-sale-button";
import { DataTable } from "../_components/ui/data-table";
import { saleTableColmuns } from "./_components/table-columns";
import { getSales } from "../_data-access/sale/get-sales";

const SalesPage = async () => {
  const sales = await getSales();
  const products = await getProducts();
  const productOptionsValues: ComboboxOption[] = products.map((prod) => ({
    procedure: prod.name,
    label: prod.nameClient,
    value: prod.id,
  }));

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex flex-col items-start justify-between gap-4 border-b border-gray-200 bg-white px-4 py-3 sm:flex-row sm:items-center md:px-8 md:py-4">
        <div className="hidden min-w-0 flex-col gap-1 md:flex">
          <h2 className="hidden text-base font-bold text-slate-800 md:block md:text-lg">
            Serviços Concluidos
          </h2>
          <p className="hidden text-sm text-slate-500 sm:block">
            Histórico de serviços concluídos
          </p>
        </div>

        <div className="flex-shrink-0 md:w-auto [&_svg]:size-auto">
          <CreateSaleButton
            productOptions={productOptionsValues}
            products={JSON.parse(JSON.stringify(products))}
          />
        </div>
      </div>
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-8">
        <div className="overflow-x-auto md:flex md:flex-col">
          <DataTable
            columns={saleTableColmuns}
            data={JSON.parse(JSON.stringify(sales))}
          />
        </div>

        {sales.length === 0 && (
          <div className="relative -top-8 flex flex-col items-center justify-center text-center">
            <div className="mt-[120px]">
              <h3 className="mb-2 text-lg font-semibold text-slate-800">
                Nenhum serviço adicionado
              </h3>
              <p className="mb-6 text-sm text-slate-500">
                Comece adicionando um novo serviço
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesPage;
