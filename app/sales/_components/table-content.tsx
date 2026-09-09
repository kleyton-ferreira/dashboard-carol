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

interface TableContentProps {
  selectedProducts: SelectedProduct[];
}

const TableContent = ({ selectedProducts }: TableContentProps) => {
  const productTotal = useMemo(() => {
    return selectedProducts.reduce((acc, prodValue) => {
      return acc + prodValue.price * prodValue.quantity;
    }, 0);
  }, [selectedProducts]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-purple-700">Cliente</TableHead>
          <TableHead className="text-purple-700">Preço Unitário</TableHead>
          <TableHead className="text-purple-700">Quantidade</TableHead>
          <TableHead className="text-purple-700">Total</TableHead>
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
  );
};

export default TableContent;
