"use client";

import { Badge } from "@/app/_components/ui/badge";
import { Product } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { CircleIcon, CircleSlash } from "lucide-react";

const getStatusLabel = (product: Product) => {
  if (product.stock === 0) {
    return "Cancelado";
  }
  if (product.status === "IN_STOCK") {
    return "Confirmado";
  }
};

export const productTableColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "nameClient",
    header: () => (
      <p className="group relative w-fit cursor-pointer pb-1 font-bold text-purple-600">
        Cliente
        <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-purple-600 transition-all duration-300 group-hover:w-[calc(100%)]"></span>
      </p>
    ),
  },
  {
    accessorKey: "name",
    header: () => (
      <p className="group relative w-fit cursor-pointer pb-1 font-bold text-purple-600">
        Serviço
        <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-purple-600 transition-all duration-300 group-hover:w-[calc(100%)]"></span>
      </p>
    ),
  },
  {
    accessorKey: "stock",
    header: () => (
      <p className="group relative w-fit cursor-pointer pb-1 font-bold text-purple-600">
        Procedimento
        <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-purple-600 transition-all duration-300 group-hover:w-[calc(100%)]"></span>
      </p>
    ),
  },
  {
    accessorKey: "status",
    header: () => (
      <p className="group relative w-fit cursor-pointer pb-1 font-bold text-purple-600">
        Status
        <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-purple-600 transition-all duration-300 group-hover:w-[calc(100%)]"></span>
      </p>
    ),

    cell: (row) => {
      const product = row.row.original;
      const label = getStatusLabel(product);
      return (
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
      );
    },
  },
];
