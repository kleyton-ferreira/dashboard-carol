"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TableHeader,
  TableFooter,
} from "@/app/_components/ui/table";

import { SelectedProduct } from "./upsert-sheet-content";
import { formatBRL } from "@/app/_lib/formatBRL";
import { useMemo } from "react";

import SalesTableDropdownMenu from "./sales-table-dropdown-menu";

interface TableContentProps {
  selectedProducts: SelectedProduct[];
  hanldeSelectedProducts: React.Dispatch<
    React.SetStateAction<SelectedProduct[]>
  >;
}

const TableContent = ({
  selectedProducts,
  hanldeSelectedProducts,
}: TableContentProps) => {
  const productTotal = useMemo(() => {
    return selectedProducts.reduce((acc, prodValue) => {
      return acc + prodValue.price * prodValue.quantity;
    }, 0);
  }, [selectedProducts]);

  const handleDelete = (productId: string) => {
    hanldeSelectedProducts((currentProducts) => {
      return currentProducts.filter((prod) => prod.id !== productId);
    });
  };

  return (
    <div className="w-full overflow-hidden">
      {/* Desktop View (md and up) */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <p className="text-sm text-purple-600">Cliente</p>
              </TableHead>
              <TableHead>
                <p className="text-sm text-purple-600">Preço serviço</p>
              </TableHead>
              <TableHead>
                <p className="text-sm text-purple-600">Qtd. Procedimento</p>
              </TableHead>
              <TableHead>
                <p className="text-sm text-purple-600">Valor total</p>
              </TableHead>
              <TableHead>
                <p className="text-sm text-purple-600">Ações</p>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {selectedProducts.map((productItens) => (
              <TableRow key={productItens.id}>
                <TableCell className="text-slate-700">
                  {productItens.nameClient}
                </TableCell>
                <TableCell className="text-slate-700">
                  {formatBRL(productItens.price)}
                </TableCell>
                <TableCell className="text-slate-700">
                  {productItens.quantity}
                </TableCell>
                <TableCell className="text-slate-700">
                  {formatBRL(productItens.price * productItens.quantity)}
                </TableCell>

                <TableCell>
                  <SalesTableDropdownMenu
                    product={productItens}
                    onDelete={() => handleDelete(productItens.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell className="text-slate-700" colSpan={3}>
                Total
              </TableCell>
              <TableCell className="text-slate-700">
                {formatBRL(productTotal)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      {/* Mobile/Tablet View (below md) */}
      <div className="md:hidden">
        <div className="space-y-3">
          {selectedProducts.map((productItens) => (
            <div
              key={productItens.id}
              className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
            >
              {/* Header: Cliente e Ações */}
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-purple-600">
                    Cliente
                  </p>
                  <p className="mt-1 text-base font-semibold text-slate-500">
                    {productItens.nameClient}
                  </p>
                </div>
                <div className="-mt-1">
                  <SalesTableDropdownMenu
                    product={productItens}
                    onDelete={() => handleDelete(productItens.id)}
                  />
                </div>
              </div>

              {/* Informações: Preço e Quantidade */}
              <div className="mb-4 grid grid-cols-2 gap-14 border-y border-slate-400 py-5">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-purple-600">
                    Preço
                  </p>
                  <p className="mt-2 text-sm font-semibold text-slate-500">
                    {formatBRL(productItens.price)}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-purple-600">
                    Qtd. Procedimento
                  </p>
                  <p className="mt-2 text-sm font-semibold text-slate-500">
                    {productItens.quantity}
                  </p>
                </div>
              </div>

              {/* Valor Total Destaque */}
              <div className="rounded-md bg-purple-500 p-1">
                <p className="text-xs font-medium uppercase tracking-wide text-white">
                  Valor Total
                </p>
                <p className="mt-1 text-lg font-bold text-white">
                  {formatBRL(productItens.price * productItens.quantity)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Total Summary */}
        {selectedProducts.length > 0 && (
          <div className="mt-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-700">
                Total Geral
              </span>
              <span className="text-[22px] font-bold text-purple-700">
                {formatBRL(productTotal)}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableContent;
