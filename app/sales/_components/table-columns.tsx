"use client";

import { SalesDto } from "@/app/_data-access/sale/get-sales";
import { formatBRL } from "@/app/_lib/formatBRL";
import { ColumnDef } from "@tanstack/react-table";

import SaleTableDropdownMenu from "./sale-table-dropdown-menu";
import { Product } from "@prisma/client";

export const saleTableColmuns: ColumnDef<SalesDto>[] = [
  {
    accessorKey: "serviceNames",
    header: () => (
      <p className="group relative w-fit cursor-pointer pb-1 font-bold text-purple-600">
        Serviço
        <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-purple-600 transition-all duration-300 group-hover:w-[calc(100%)]"></span>
      </p>
    ),
  },
  {
    accessorKey: "totalProducts",
    header: () => (
      <p className="group relative w-fit cursor-pointer pb-1 font-bold text-purple-600">
        QTD. de Procedimento
        <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-purple-600 transition-all duration-300 group-hover:w-[calc(100%)]"></span>
      </p>
    ),
  },
  {
    accessorKey: "totalAmount",
    header: () => (
      <p className="group relative w-fit cursor-pointer pb-1 font-bold text-purple-600">
        Valor Total
        <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-purple-600 transition-all duration-300 group-hover:w-[calc(100%)]"></span>
      </p>
    ),
    cell: ({
      row: {
        original: { totalAmount },
      },
    }) => formatBRL(totalAmount),
  },
  {
    accessorKey: "Date",
    header: () => (
      <p className="group relative w-fit cursor-pointer pb-1 font-bold text-purple-600">
        Data
        <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-purple-600 transition-all duration-300 group-hover:w-[calc(100%)]"></span>
      </p>
    ),
    cell: ({
      row: {
        original: { date },
      },
    }) => new Date(date).toLocaleDateString("pt-BR"),
  },
  {
    accessorKey: "actions",
    header: () => (
      <p className="group relative w-fit cursor-pointer pb-1 font-bold text-purple-600">
        Ações
        <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-purple-600 transition-all duration-300 group-hover:w-[calc(100%)]"></span>
      </p>
    ),
    cell: ({ row: { original: sale } }) => (
      <SaleTableDropdownMenu
        sale={sale}
        product={{ name: sale.serviceNames } as Product}
      />
    ),
  },
];
