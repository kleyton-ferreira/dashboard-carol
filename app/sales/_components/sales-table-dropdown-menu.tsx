import {
  AlertDialog,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";

import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { EditIcon, MoreHorizontalIcon, TrashIcon } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { Dialog, DialogTrigger } from "@/app/_components/ui/dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { Product } from "@prisma/client";

interface TableDropdownMenuProps {
  product: Pick<Product, "id">;
  onDelete: (productId: string) => void;
}

const SalesTableDropdownMenu = ({
  product,
  onDelete,
}: TableDropdownMenuProps) => {
  return (
    <AlertDialog>
      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <MoreHorizontalIcon
                size={16}
                className="text-bg-textGreen-primary"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup className="space-y-1">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>

              {/*  BOTAO - 1 */}
              <DialogTrigger asChild>
                <DropdownMenuItem className="gap-1.5">
                  <div className="group flex items-center gap-2 duration-300 hover:text-purple-700">
                    <EditIcon size={16} /> <p>Editar</p>
                  </div>
                </DropdownMenuItem>
              </DialogTrigger>
              <DropdownMenuSeparator />

              {/*  BOTAO - 2 */}
              <AlertDialogTrigger asChild>
                <DropdownMenuItem
                  className="gap-1.5"
                  onClick={() => onDelete(product.id)}
                >
                  <div className="group flex items-center gap-2 duration-300 hover:text-purple-700">
                    <TrashIcon size={16} /> <p>Deletar</p>
                  </div>
                </DropdownMenuItem>
              </AlertDialogTrigger>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </Dialog>
    </AlertDialog>
  );
};

export default SalesTableDropdownMenu;
