"use client";

import { Product } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

import ProductStatusBadge from "./product-status-badge";
import DropdownProductButton from "./dropdown-product-button";

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
    accessorKey: "price",
    header: () => (
      <p className="group relative w-fit cursor-pointer pb-1 font-bold text-purple-600">
        Valor do Serviço
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
    cell: ({ row }) => <ProductStatusBadge product={row.original} />,
  },
  {
    accessorKey: "actions",
    header: () => (
      <p className="group relative w-fit cursor-pointer pb-1 font-bold text-purple-600">
        Ações
        <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-purple-600 transition-all duration-300 group-hover:w-[calc(100%)]"></span>
      </p>
    ),
    cell: ({ row }) => <DropdownProductButton product={row.original} />,
  },
];
