import { deleteProduct } from "@/app/_actions/delete-product";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/_components/ui/alert-dialog";
import { toast } from "sonner";

interface DeleteAlertDialogProps {
  product: string;
  productId: string;
}

const DeleteAlertDialog = ({ product, productId }: DeleteAlertDialogProps) => {
  const handleDelete = async () => {
    try {
      await deleteProduct({ id: productId });
      toast.success("Cliente removido com sucesso.");
    } catch (error) {
      toast.error("Error ao remover cliente.");
    }
  };

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
