import { EditIcon, MoreHorizontalIcon, TrashIcon } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { Dialog, DialogTrigger } from "@/app/_components/ui/dialog";
import { Product, Sale } from "@prisma/client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";

import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";
import { useAction } from "next-safe-action/hooks";
import { deleteSale } from "@/app/_actions/sale/delete-sale";
import { toast } from "sonner";

interface TableDropdownMenuProps {
  sale: Pick<Sale, "id">;
  product?: Product;
}

const AlertTableDropdownMenu = ({ sale, product }: TableDropdownMenuProps) => {
  const { execute } = useAction(deleteSale, {
    onSuccess: () => {
      toast.success("Serviço removido com sucesso.");
    },
    onError: () => {
      toast.error("Erro ao remover serviço.");
    },
  });

  const handleDeleteClick = () => execute({ id: sale.id });

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

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-purple-700">
              Você tem certeza?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base">
              Você deseja excluir esse serviço{" "}
              <strong className="text-purple-700">"{product?.name}"</strong>.
              Esta ação não pode ser desfeita. Deseja continuar?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-purple-700 duration-300 hover:bg-purple-600"
              onClick={handleDeleteClick}
            >
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </Dialog>
    </AlertDialog>
  );
};

export default AlertTableDropdownMenu;
