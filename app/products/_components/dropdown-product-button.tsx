"use cliente";

import { Button } from "@/app/_components/ui/button";
import { EditIcon, MoreHorizontalIcon, TrashIcon } from "lucide-react";
import DeleteAlertDialog from "./delete-alert-dialog";
import { Product } from "@prisma/client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import EditProductDialog from "./edit-product-dialog";
import { Dialog } from "@/app/_components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useState } from "react";

interface DropdownProductButtonProps {
  product: Product;
}

const DropdownProductButton = ({ product }: DropdownProductButtonProps) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  return (
    <AlertDialog>
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <MoreHorizontalIcon size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup className="space-y-1">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>

              <div className="space-y-3">
                <DialogTrigger asChild>
                  <DropdownMenuItem>
                    <div className="group flex items-center gap-2 duration-300 hover:text-purple-700">
                      <EditIcon size={16} /> <p>Editar</p>
                    </div>
                  </DropdownMenuItem>
                </DialogTrigger>

                <AlertDialogTrigger asChild>
                  <DropdownMenuItem>
                    <div className="group flex items-center gap-2 duration-300 hover:text-purple-700">
                      <TrashIcon size={16} /> <p>Deletar</p>
                    </div>
                  </DropdownMenuItem>
                </AlertDialogTrigger>
              </div>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <EditProductDialog
          defaultValues={{
            id: product.id,
            nameClient: product.nameClient,
            name: product.name,
            price: Number(product.price),
            stock: product.stock,
          }}
          onSuccess={() => setEditDialogOpen(false)}
        />

        {/* DIALOG - MESSAGE - ESSE COMPONENTE ESTA EXCLUINDO E PASSANDO O NAME NA OPÇAO DE DELETAR O CLIENTE */}
        <DeleteAlertDialog
          product={product.nameClient}
          productId={product.id}
        />
      </Dialog>
    </AlertDialog>
  );
};

export default DropdownProductButton;
