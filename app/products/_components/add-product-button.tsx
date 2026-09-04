"use client";

import { PlusIcon } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { useState } from "react";
import { Dialog, DialogTrigger } from "@/app/_components/ui/dialog";
import EditProductDialog from "./edit-product-dialog";

const AddProductButton = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <PlusIcon size={18} /> Adicionar cliente
        </Button>
      </DialogTrigger>

      {/* COMPONENTE DE EDITAR */}
      <EditProductDialog onSuccess={() => setDialogIsOpen(false)} />
    </Dialog>
  );
};

export default AddProductButton;
