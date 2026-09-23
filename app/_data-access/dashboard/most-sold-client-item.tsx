import { MostSoldProductDto } from "./get-dashboard";
import { formatBRL } from "@/app/_lib/formatBRL";

interface MostSoldClientItemProps {
  product: MostSoldProductDto;
}

const MostSoldClientItem = ({ product }: MostSoldClientItemProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="m-[10px] space-y-2 pt-6">
        <h2 className="font-bold text-purple-700"> {product.nameClient} </h2>
        <h3 className="text-slate-90000 font-semibold"> {product.name} </h3>
        <p className="font-medium text-slate-500">
          {formatBRL(Number(product.price))}
        </p>
      </div>
      <div className="px-6 text-sm font-semibold">
        <p className="text-slate-500">
          {" "}
          <span className="text-slate-900">{product.totalRevenue}</span>{" "}
          Atendimento
          {product.totalRevenue !== 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
};

export default MostSoldClientItem;
