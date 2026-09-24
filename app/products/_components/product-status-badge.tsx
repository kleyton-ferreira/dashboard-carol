import { Badge } from "@/app/_components/ui/badge";
import { ProductDto } from "@/app/_data-access/product/get-products";
import { Product } from "@prisma/client";
import { CircleIcon } from "lucide-react";

interface ProductStatusBadgeProps {
  product: ProductDto;
}

const ProductStatusBadge = ({ product }: ProductStatusBadgeProps) => {
  const getStatusLabel = (status: string) => {
    if (status === "OUT_OF_STOCK") {
      return "Cancelado";
    }
    if (status === "IN_STOCK") {
      return "Confirmado";
    }
  };

  const label = getStatusLabel(product.status);

  return (
    <>
      <Badge
        className="gap-1.5"
        variant={label === "Confirmado" ? "secondary" : "outline"}
      >
        <CircleIcon
          size={10}
          className={`${label === "Confirmado" ? "fill-primary-foreground" : "fill-primary-foreground"}`}
        />
        {label}
      </Badge>
    </>
  );
};

export default ProductStatusBadge;
