"use client";
import { Subject } from "@/@types/subject";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Checkbox } from "./ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import dayjs from "dayjs";
import { useState } from "react";
import { Task } from "@/@types/task";
import { Review } from "@/@types/review";
import { EllipsisVertical, Pen, Plus, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import zod from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useReviewQueryMutation } from "@/api/queries/review/useReviewQueyMutation";
import { useQueryClient } from "@tanstack/react-query";
import {
  useSubjectQueryMutationDelete,
  useSubjectQueryMutationUpdate,
} from "@/api/queries/subject/subjectQuery";

export function SubjectAccordion({ subject }: { subject: Subject }) {
  dayjs.locale("pt-br");
  const queryClient = useQueryClient();
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const mutation = useReviewQueryMutation();
  const mutationSubjectUpdate = useSubjectQueryMutationUpdate();
  const mutationSubjectDelete = useSubjectQueryMutationDelete();
  const zodSchema = zod.object({
    name: zod.string().min(3, "Nome muito curto").max(50, "Nome muito longo"),
    intervalo: zod.array(zod.number()),
  });

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

  async function onHandleEditSubmit(data: Subject) {
    mutationSubjectUpdate.mutate(
      {
        id: subject.id,
        data,
      },
      {
        onSuccess: (data) => {
          queryClient.setQueryData(["subjects"], (currentData: Subject[]) =>
            currentData.map((subject) => {
              if (subject.id === data.id) {
                return {
                  ...subject,
                  name: data.name,
                };
              }
              return subject;
            }),
          );
        },
      },
    );

    setOpenModalEdit(false);
  }

  async function onClickCheckboxReview(item: Review) {
    mutation.mutate(
      {
        id: item.id,
        completed: !item.completed,
      },
      {
        onSuccess: (data) => {
          queryClient.setQueryData(["subjects"], (currentData: Subject[]) =>
            currentData.map((subject) => {
              if (subject.id === data.subject_id) {
                return {
                  ...subject,
                  task: subject.task.map((task) => {
                    if (task.id === data.id) {
                      return {
                        ...task,
                        review: data.review,
                      };
                    }
                    return task;
                  }),
                };
              }
              return subject;
            }),
          );
        },
      },
    );
  }

  async function onClickCompleteAllTasks(item: Task) {}

  async function onHandleDeleteSubject(id: string) {
    mutationSubjectDelete.mutate(id, {
      onSuccess: () => {
        queryClient.setQueryData(["subjects"], (currentData: Subject[]) =>
          currentData.filter((subject) => subject.id !== id),
        );
      },
    });
  }

  console.log(subject.task);
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1" className="border-b-0">
        <AccordionTrigger className="h-11 w-full rounded-lg bg-accordion p-2 text-start text-white">
          <div className="flex w-full items-center justify-between">
            <p>{subject.name}</p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <EllipsisVertical className="size-5 text-white" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    onHandleDeleteSubject(subject.id);
                  }}
                >
                  <Trash2 className="text-red-600" />
                  <p>Deletar</p>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenModalEdit(true);
                  }}
                >
                  <Pen className="text-blue-500" />
                  <p>Editar</p>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Dialog open={openModalEdit} onOpenChange={setOpenModalEdit}>
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
        </AccordionTrigger>
        <AccordionContent className="bg-rowAccordionOdd text-white">
            <Plus className="text-primaryButton" />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[130px]" >Nome</TableHead>
                <TableHead className="min-w-[170px]">Descrição</TableHead>
                <TableHead className="min-w-[130px]">Revisão 1</TableHead>
                <TableHead className="min-w-[130px]">Revisão 2</TableHead>
                <TableHead className="min-w-[130px]">Revisão 3</TableHead>
                <TableHead className="min-w-[130px]">Revisão 4</TableHead>
                <TableHead>Finalizada</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subject.task.map((task, index) => (
                <TableRow
                  key={task.id}
                  className={
                    index % 2 === 0
                      ? "bg-rowAccordionEven"
                      : "bg-rowAccordionOdd"
                  }
                >
                  <TableCell className="font-medium">{task.name}</TableCell>
                  <TableCell className="w-36">{task.description}</TableCell>
                  {task.review.map((review) => (
                    <TableCell key={review.id} >
                      <div className="flex items-center gap-2">
                        <p
                          className={`${
                            review.completed ? "line-through" : ""
                          }`}
                        >
                          {dayjs(review.review_date).format("DD/MM/YYYY")}
                        </p>

                        <Checkbox
                          checked={review.completed}
                          className="border-details"
                          onClick={() => onClickCheckboxReview(review)}
                        />
                      </div>
                    </TableCell>
                  ))}
                  <TableCell>
                    <Checkbox
                      checked={task.completed}
                      className="border-details"
                      onClick={() => onClickCompleteAllTasks(task)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            {/* <TableFooter>
                    <TableRow>
                      <TableCell colSpan={3}>Total</TableCell>
                      <TableCell className="text-right">$2,500.00</TableCell>
                    </TableRow>
                  </TableFooter> */}
          </Table>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
