"use client";
import { Task } from "@/@types/task";
import { userTaskQueryUpdate } from "@/api/queries/task/taskQuery";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
type CreateTaskModalProps = {

  data: Task;
  trigger: ReactNode;
};
export function EditTaskModal({ data, trigger }: CreateTaskModalProps) {
  const { mutateAsync: updateTask } = userTaskQueryUpdate();
  const [open, setOpen] = useState(false);
  const zodSchema = z.object({
    name: z.string().min(3, "Nome muito curto").max(50, "Nome muito longo"),
    description: z.string().max(100, "Descrição muito longa"),
  });

  type FormData = z.infer<typeof zodSchema>;

  const {
    register,
    handleSubmit,
    formState: { isDirty },
    reset
  } = useForm({
    resolver: zodResolver(zodSchema),
    defaultValues: {
      name: data.name,
      description: data.description,
    },
  });

  async function onHandleSubmit(dataForm: FormData) {
    console.log(dataForm);
    const response = await updateTask({ id: data.id, ...dataForm },
    );

    if (response) {
      setOpen(false);
      reset({
        name: data.name,
        description: data.description,
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        onClick={(e) => e.stopPropagation()}
      >
        <DialogHeader>
          <DialogTitle>Editar revisão</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <Label htmlFor="name" className="text-right text-white">
              Título
            </Label>
            <Input
              id="name"
              className="col-span-3 text-white"
              placeholder="Digite o título da matéria"
              {...register("name")}
            />
          </div>
          <div className="">
            <Label htmlFor="description" className="text-right text-white">
              Descrição
            </Label>
            <Input
              id="description"
              className="col-span-3 text-white"
              placeholder="Digite a descrição da matéria"
              {...register("description")}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600"
            onClick={handleSubmit(onHandleSubmit)}
            disabled={!isDirty}
          >
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
