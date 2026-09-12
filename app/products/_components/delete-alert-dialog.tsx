import { deleteProduct } from "@/app/_actions/delete-product";
import { toast } from "sonner";

import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/_components/ui/alert-dialog";
import { useAction } from "next-safe-action/hooks";

interface DeleteAlertDialogProps {
  product: string;
  productId: string;
}

const DeleteAlertDialog = ({ product, productId }: DeleteAlertDialogProps) => {
  const { execute: executeDeleteProducts } = useAction(deleteProduct, {
    onSuccess: () => {
      toast.success("Cliente removido com sucesso.");
    },
    onError: () => {
      toast.error("Error ao remover cliente.");
    },
  });

  const handleDelete = () => executeDeleteProducts({ id: productId });

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle className="text-purple-700">
          Você tem certeza?
        </AlertDialogTitle>
        <AlertDialogDescription>
          Você deseja excluir a cliente{" "}
          <strong className="text-purple-700"> {product}</strong>. Esta ação não
          pode ser desfeita. Deseja continuar?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction
          className="bg-purple-700 duration-300 hover:bg-purple-600"
          onClick={handleDelete}
        >
          Continuar
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default DeleteAlertDialog;
