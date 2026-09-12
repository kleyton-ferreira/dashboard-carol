import InputsProduct from "./inputs-product";
import { Form } from "@/app/_components/ui/form";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createdProducts } from "@/app/_actions/create-product";
import {
  CreateProductSchema,
  createProductSchema,
} from "@/app/_actions/create-product/schema";

import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import { Button } from "@/app/_components/ui/button";
import { useAction } from "next-safe-action/hooks";

interface EditProductDialogProps {
  defaultValues?: CreateProductSchema;
  onSuccess?: () => void;
}

const EditProductDialog = ({
  onSuccess,
  defaultValues,
}: EditProductDialogProps) => {
  const { execute: executeCreatedProduct, isPending } = useAction(
    createdProducts,
    {
      onSuccess: () => {
        const isEditing = !!defaultValues?.id;
        const successMessage = isEditing
          ? "Cliente editado com sucesso."
          : "Cliente adicionado com sucesso.";

        toast.success(successMessage);
        onSuccess?.();
      },
      onError: () => {
        toast.error("Erro ao adicionar/editar cliente.");
      },
    },
  );

  const forms = useForm<CreateProductSchema>({
    shouldUnregister: true,
    resolver: zodResolver(createProductSchema),
    defaultValues: defaultValues ?? {
      nameClient: "",
      name: "",
      price: 0,
      stock: 1,
    },
  });

  const isEdition = !!defaultValues;

  const handleOnsubmitClick = async (data: CreateProductSchema) => {
    executeCreatedProduct(data);
  };

  return (
    <DialogContent className="w-[95%] max-w-lg rounded-lg sm:w-full">
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(handleOnsubmitClick)}>
          <DialogHeader className="mb-4 space-y-2 sm:mb-6">
            <DialogTitle className="text-lg text-purple-600 sm:text-xl">
              {isEdition ? "Editar" : "Marcação"} de Cliente
            </DialogTitle>
            <DialogDescription className="text-sm sm:text-base">
              Informações abaixo
            </DialogDescription>
          </DialogHeader>

          {/* COMPONENTE INPUT */}
          <div className="max-h-[60vh] overflow-y-auto sm:max-h-none">
            <InputsProduct forms={forms} />
          </div>

          <DialogFooter className="mt-6 flex flex-col-reverse gap-3 sm:mt-8 sm:flex-row sm:justify-end">
            <DialogClose asChild>
              <Button variant="ghost" type="reset" className="w-full sm:w-auto">
                Cancelar
              </Button>
            </DialogClose>
            <Button
              variant="secondary"
              type="submit"
              disabled={isPending}
              className="w-full sm:w-[150px]"
            >
              {isPending ? (
                <>
                  <Loader2Icon size={16} className="animate-spin" />
                  Salvando...
                </>
              ) : (
                "Salvar"
              )}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export default EditProductDialog;
