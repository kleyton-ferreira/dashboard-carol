import { DataTable } from "../_components/ui/data-table";
import { productTableColumns } from "./_components/table-columns";
import { getProducts } from "../_data-access/product/get-products";
import AddProductButton from "./_components/add-product-button";

const ProductsPage = async () => {
  const products = await getProducts();

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex flex-col items-start justify-between gap-4 border-b border-gray-200 bg-white px-4 py-3 sm:flex-row sm:items-center md:px-8 md:py-4">
        <div className="hidden min-w-0 flex-col gap-1 md:flex">
          <h2 className="hidden text-base font-bold text-slate-800 md:block md:text-lg">
            Serviços & Clientes
          </h2>
          <p className="hidden text-sm text-slate-500 sm:block">
            Gerencie seus clientes e serviços
          </p>
        </div>
        <div className="w-full sm:w-auto [&_svg]:size-auto">
          <AddProductButton />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4 md:p-8">
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="overflow-x-auto md:flex md:flex-col">
              <DataTable
                columns={productTableColumns}
                data={JSON.parse(JSON.stringify(products))}
              />
            </div>
          </div>

          {products.length === 0 && (
            <div className="relative -top-8 flex flex-col items-center justify-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100"></div>
              <h3 className="mb-2 text-lg font-semibold text-slate-800">
                Nenhum cliente encontrado
              </h3>
              <p className="mb-6 text-sm text-slate-500">
                Comece criando seu primeiro cliente
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
