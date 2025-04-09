"use client";
import { Review } from "@/@types/review";
import { Subject } from "@/@types/subject";
import { Task } from "@/@types/task";
import { useReviewQueryMutation } from "@/api/queries/review/useReviewQueyMutation";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useTaskQueryDelete } from "@/api/queries/task/taskQuery";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Pen, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { CreateTaskModal } from "./CreateTaskModal";
import { EditTaskModal } from "./EditTaskModal";
import { toast } from "react-toastify";

type TaskProps = {
  idSubject: string;
  tasks: Task[];
};
export function TaskTable({ idSubject, tasks }: TaskProps) {
  const mutationReview = useReviewQueryMutation();
  const mutationTask = useTaskQueryDelete();
  const queryClient = useQueryClient();
  const [openDialogCreate, setOpenDialogCreate] = useState(false);

  async function onClickCheckboxReview(item: Review) {
    mutationReview.mutate(
      {
        id: item.id,
        completed: !item.completed,
      },
      {
        onSuccess: (data) => {
          queryClient.setQueryData(["subjects"], (currentData: Subject[]) =>
            currentData.map((subject) => {
              console.log(subject, "aquiii");
              if (subject.id === data.subject_id) {
                return {
                  ...subject,
                  task: subject.task.map((task) => {
                    if (task.id === data.id) {
                      return {
                        ...task,
                        completed: data.completed,
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

  async function onClickDeleteTask(id: string) {
    mutationTask.mutate(id, {
      onSuccess: () => {
        queryClient.setQueryData(["subjects"], (currentData: Subject[]) =>
          currentData.map((subject) => {
            if (subject.id === idSubject) {
              return {
                ...subject,
                task: subject.task.filter((task) => task.id !== id),
              };
            }
            return subject;
          }),
        );

        toast.success("Tarefa deletada com sucesso")
      },
    });
  }
  return (
    <>
      <Table className="table-auto">
        <TableHeader>
          <TableRow>
            <TableHead className="w-0 flex-1 whitespace-nowrap">
              Título
            </TableHead>
            <TableHead className="min-w-[170px]">Descrição</TableHead>

            {tasks?.[0]?.review.map((task, index) => (
              <TableHead key={task.id} className="min-w-[130px]">
                Revisão {index + 1}
              </TableHead>
            ))}
            <TableHead>Finalizada</TableHead>
            <TableHead className="min-w-[60px]">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task, index) => (
            <TableRow
              key={task.id}
              className={
                index % 2 === 0 ? "bg-rowAccordionEven" : "bg-rowAccordionOdd"
              }
            >
              <TableCell className="w-0 flex-1 whitespace-nowrap font-medium">
                {task.name}
              </TableCell>
              <TableCell className="w-36">{task.description}</TableCell>
              {task.review.map((review) => {
                const isCompleted = review.completed;
                const isLate =
                  !isCompleted &&
                  dayjs(review.review_date).isBefore(dayjs(), "day");
                const isTomorrow =
                  !isCompleted &&
                  dayjs(review.review_date).isSame(
                    dayjs().add(1, "day"),
                    "day",
                  );
                const isToday =
                  !isCompleted &&
                  dayjs(review.review_date).isSame(dayjs(), "day");

                let textClass = "";

                if (isCompleted) textClass = "line-through";
                else if (isLate) textClass = "text-red-500";
                else if (isTomorrow) textClass = "text-blue-500";
                else if (isToday) textClass = "text-green-500";

                return (
                  <TableCell key={review.id}>
                    <div className="flex items-center gap-2">
                      <p
                        className={textClass}
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
                );
              })}
              <TableCell>
                <div className="flex items-center justify-center">
                  <Checkbox
                    checked={task.completed}
                    className="cursor-not-allowed border-details"
                  />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-center gap-2">
                  <EditTaskModal
                    data={task}
                    trigger={<Pen className="size-4 text-blue-500" />}
                  />

                  <Trash2
                    className="size-4 cursor-pointer text-red-600"
                    onClick={() => onClickDeleteTask(task.id)}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="ml-2 mt-4">
        <Button
          className="h-6 cursor-pointer bg-green-700 p-2"
          onClick={(e) => {
            e.preventDefault();
            setOpenDialogCreate(true);
          }}
        >
          <Plus className="size-5" />
          <Label className="cursor-pointer">Nova revisão</Label>
        </Button>
      </div>
      <CreateTaskModal
        open={openDialogCreate}
        setOpen={setOpenDialogCreate}
        id={idSubject}
      />
    </>
  );
}
