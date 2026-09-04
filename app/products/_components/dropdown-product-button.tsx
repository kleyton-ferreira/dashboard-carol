import { Button } from "@/app/_components/ui/button";
import {
  ClipboardCopyIcon,
  EditIcon,
  MoreHorizontalIcon,
  TrashIcon,
} from "lucide-react";

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
import DeleteAlertDialog from "./delete-alert-dialog";

interface DropdownProductButtonProps {
  product: Pick<Product, "id" | "nameClient">;
}

const DropdownProductButton = ({ product }: DropdownProductButtonProps) => {
  const handleCopyProducId = () => {
    return navigator.clipboard.writeText(product.id);
  };

  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <MoreHorizontalIcon size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup className="space-y-2">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            {/* OPTIONAL... */}
            <DropdownMenuItem className="gap-1.5" onClick={handleCopyProducId}>
              <div className="group flex items-center gap-2 duration-300 hover:text-purple-700">
                <ClipboardCopyIcon size={16} />
                <p>Copiar ID</p>
              </div>
            </DropdownMenuItem>

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
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* DIALOG - MESSAGE - ESSE COMPONENTE ESTA EXCLUINDO E PASSANDO O NAME NA OPÇAO DE DELETAR O CLIENTE */}
      <DeleteAlertDialog product={product.nameClient} productId={product.id} />
    </AlertDialog>
  );
};

export default DropdownProductButton;
