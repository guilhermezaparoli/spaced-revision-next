"use client";
import { Subject } from "@/@types/subject";
import { useSubjectQueryMutationUpdate } from "@/api/queries/subject/subjectQuery";
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
import zod, { infer } from "zod";

type CreateTaskModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  subject: Subject;
};

export function EditSubjectModal({
  open,
  setOpen,
  subject,
}: CreateTaskModalProps) {
  const { mutate: updateSubject } = useSubjectQueryMutationUpdate();
  const zodSchema = zod.object({
    name: zod.string().min(3, "Nome muito curto").max(50, "Nome muito longo"),
    intervalo: zod.array(zod.number()),
  });

  type FormData = zod.infer<typeof zodSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: zodResolver(zodSchema),
    defaultValues: {
      name: subject.name,
      intervalo: [1, 7, 14, 30, 60],
    },
  });

  async function onHandleEditSubmit(data: FormData) {
    updateSubject(
      {
        id: subject.id,
        name: data.name,
        task: subject.task,
      }
    );

    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="sm:max-w-[425px]"
        onClick={(e) => e.stopPropagation()}
      >
        <DialogHeader>
          <DialogTitle>Editar Matéria</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="">
            <Label htmlFor="name" className="text-right text-white">
              Nome
            </Label>
            <Input
              id="name"
              className="col-span-3 text-white"
              placeholder="Digite o nome da matéria"
              {...register("name")}
            />
          </div>
          <div className="">
            <Label htmlFor="intervalo" className="text-right text-white">
              Intervalos de revisões (não pode ser alterado)
            </Label>
            <Input
              id="intervalo"
              className="col-span-3 text-white"
              placeholder="Digite o intervalo"
              disabled
              {...register("intervalo")}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600"
            onClick={handleSubmit(onHandleEditSubmit)}
          >
            Confirmar edição
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
