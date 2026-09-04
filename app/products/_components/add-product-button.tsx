"use client";

import { Loader2Icon, PlusIcon } from "lucide-react";
import { Button } from "@/app/_components/ui/button";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/app/_components/ui/form";

import { useState } from "react";
import { createdProducts } from "@/app/_actions/create-product";
import {
  CreateProductSchema,
  createProductSchema,
} from "@/app/_actions/create-product/schema";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import InputsProduct from "./inputs-product";
import { toast } from "sonner";

const AddProductButton = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const forms = useForm<CreateProductSchema>({
    shouldUnregister: true,
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      nameClient: "",
      name: "",
      price: 0,
      stock: 1,
    },
  });

  const handleOnsubmitClick = async (data: CreateProductSchema) => {
    try {
      await createdProducts(data);
      toast.success("Cliente adicionado com sucesso.");
      setDialogIsOpen(false);
    } catch (error) {
      toast.error("Error ao adicionar cliente.");
    }
  };

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <PlusIcon size={18} /> Adicionar cliente
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...forms}>
          <form onSubmit={forms.handleSubmit(handleOnsubmitClick)}>
            <DialogHeader className="mb-3">
              <DialogTitle className="text-purple-600">
                Marcação de Cliente
              </DialogTitle>
              <DialogDescription>Informções abaixo</DialogDescription>
            </DialogHeader>

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
    </Dialog>
  );
};

export default AddProductButton;
