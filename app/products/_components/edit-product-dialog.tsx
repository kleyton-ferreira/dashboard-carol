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

interface EditProductDialogProps {
  defaultValues?: CreateProductSchema;
  onSuccess?: () => void;
}

const EditProductDialog = ({
  onSuccess,
  defaultValues,
}: EditProductDialogProps) => {
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
    try {
      await createdProducts({ ...data, id: defaultValues?.id });

      const isEditing = !!defaultValues?.id;
      const successMessage = isEditing
        ? "Cliente editado com sucesso."
        : "Cliente adicionado com sucesso.";

      toast.success(successMessage);
      onSuccess?.();
    } catch (error) {
      toast.error("Erro ao adicionar/editar cliente.");
    }
  };
  return (
    <DialogContent>
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(handleOnsubmitClick)}>
          <DialogHeader className="mb-3">
            <DialogTitle className="text-purple-600">
              {isEdition ? "Editar" : "Marcação "} de Cliente
            </DialogTitle>
            <DialogDescription>Informções abaixo</DialogDescription>
          </DialogHeader>

          {/* COMPONENTE INPUT */}
          <InputsProduct forms={forms} />

          <DialogFooter className="mt-8">
            <DialogClose asChild>
              <Button variant="ghost" type="reset">
                Cancelar
              </Button>
            </DialogClose>
            <Button
              variant="secondary"
              type="submit"
              className="w-[30%]"
              disabled={forms.formState.isSubmitting}
            >
              {forms.formState.isSubmitting ? (
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
