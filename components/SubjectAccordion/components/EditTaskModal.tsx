"use client";
import { Subject } from "@/@types/subject";
import { Task } from "@/@types/task";
import { userTaskQueryUpdate, useTaskQueryCreate } from "@/api/queries/task/taskQuery";
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
import { useQueryClient } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import zod from "zod";
type CreateTaskModalProps = {

  data: Task;
  trigger: ReactNode;
};
export function EditTaskModal({ data, trigger }: CreateTaskModalProps) {
  const mutation = userTaskQueryUpdate();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const zodSchema = zod.object({
    name: zod.string().min(3, "Nome muito curto").max(50, "Nome muito longo"),
    description: zod.string().max(100, "Descrição muito longa"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm({
    resolver: zodResolver(zodSchema),
    defaultValues: {
      name: data.name ,
      description: data.description,
    },
  });

  async function onHandleSubmit(dataForm: any) {
    console.log(dataForm);
    mutation.mutate(
      {
        id: data.id,
        ...dataForm
      },
      {
        onSuccess: (data) => {
          console.log(data, "2312123");
          queryClient.setQueryData(["subjects"], (currentData: Subject[]) =>
            currentData.map((subject) => {
              if (subject.id === data.subject_id) {
                return {
                  ...subject,
                  task: subject.task.map((task) => { 
                    if (task.id === data.id) {
                      return {
                        ...task,
                        ...data,
                      };
                    }
                    return task;
                  }
                  ),
                };
              }
              return subject;
            }),
          );
          setOpen(false);
        },
      },
    );
  }

  console.log(getValues())
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
          >
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
