import { Badge } from "@/app/_components/ui/badge";
import { Product } from "@prisma/client";
import { CircleIcon } from "lucide-react";

interface ProductStatusBadgeProps {
  product: Product;
}

const ProductStatusBadge = ({ product }: ProductStatusBadgeProps) => {
  const getStatusLabel = (product: Product) => {
    if (product.stock === 0) {
      return "Cancelado";
    }
    if (product.status === "IN_STOCK") {
      return "Confirmado";
    }
  };

  const label = getStatusLabel(product);

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
