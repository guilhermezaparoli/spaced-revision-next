"use client";
import { Subject } from "@/@types/subject";
import { useTaskQueryCreate } from "@/api/queries/task/taskQuery";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import zod from "zod";
type CreateTaskModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: string;
};
export function CreateTaskModal({ open, setOpen, id }: CreateTaskModalProps) {
  const { mutateAsync: createTaskMutate } = useTaskQueryCreate();
  const queryClient = useQueryClient();
  const zodSchema = zod.object({
    name: zod.string().min(3, "Nome muito curto").max(50, "Nome muito longo"),
    description: zod.string().max(100, "Descrição muito longa"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(zodSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  console.log(id)
  async function onHandleSubmit(data: any) {
    console.log(data);
    createTaskMutate({ id, ...data });
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="sm:max-w-[425px]"
        onClick={(e) => e.stopPropagation()}
      >
        <DialogHeader>
          <DialogTitle>Cadastrar nova revisão</DialogTitle>
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
          >
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
