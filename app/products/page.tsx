import { DataTable } from "../_components/ui/data-table";
import { productTableColumns } from "./_components/table-columns";
import { getProducts } from "../_data-access/product/get-products";
import AddProductButton from "./_components/add-product-button";

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
          <AddProductButton />
        </div>
      </div>

      <div className="relative top-8">
        <DataTable
          columns={productTableColumns}
          data={JSON.parse(JSON.stringify(products))}
        />
      </div>
    </div>
  );
};

export default ProductsPage;
