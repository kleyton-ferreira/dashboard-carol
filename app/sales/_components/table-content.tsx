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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-purple-700">Cliente</TableHead>
          <TableHead className="text-purple-700">Preço Unitário</TableHead>
          <TableHead className="text-purple-700">Quantidade</TableHead>
          <TableHead className="text-purple-700">Total</TableHead>
          <TableHead className="text-purple-700">Ações</TableHead>
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
  );
};

export default TableContent;
