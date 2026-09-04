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

interface DropdownProductButtonProps {
  product: Product;
}

const DropdownProductButton = ({ product }: DropdownProductButtonProps) => {
  return (
    <AlertDialog>
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
              <DropdownMenuItem>
                <div className="group flex items-center gap-2 duration-300 hover:text-purple-700">
                  <EditIcon size={16} /> <p>Editar</p>
                </div>
              </DropdownMenuItem>

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

      {/* DIALOG - MESSAGE - ESSE COMPONENTE ESTA EXCLUINDO E PASSANDO O NAME NA OPÇAO DE DELETAR O CLIENTE */}
      <DeleteAlertDialog product={product.nameClient} productId={product.id} />
    </AlertDialog>
  );
};

export default DropdownProductButton;
