import { PlusIcon } from "lucide-react";
import { Button } from "../_components/ui/button";
import { DataTable } from "../_components/ui/data-table";
import { productTableColumns } from "./_components/table-columns";
import { getProducts } from "../_data-access/product/get-products";

const ProductsPage = async () => {
  const products = await getProducts();

  return (
    <div className="w-full p-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-800">
            Serviçoes & Clientes
          </h2>
        </div>
        <div className="[&_svg]:size-auto">
          <Button variant="secondary" className="">
            <PlusIcon size={18} /> Adicionar cliente
          </Button>
        </div>
      </div>
      <div className="mt-5">
        <DataTable
          columns={productTableColumns}
          data={JSON.parse(JSON.stringify(products))}
        />
      </div>
    </div>
  );
};

export default ProductsPage;
