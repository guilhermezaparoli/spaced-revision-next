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
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Pen, Plus, Trash2 } from "lucide-react";
import { CreateTaskModal } from "./CreateTaskModal";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { EditTaskModal } from "./EditTaskModal";

type TaskProps = {
  idSubject: string;
  tasks: Task[];
};
export function TaskTable({ idSubject, tasks }: TaskProps) {
  const mutation = useReviewQueryMutation();
  const queryClient = useQueryClient();
  const [openDialogCreate, setOpenDialogCreate] = useState(false);


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
  console.log(tasks);
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[130px]">Título</TableHead>
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
              <TableCell className="font-medium">{task.name}</TableCell>
              <TableCell className="w-36">{task.description}</TableCell>
              {task.review.map((review) => (
                <TableCell key={review.id}>
                  <div className="flex items-center gap-2">
                    <p className={`${review.completed ? "line-through" : ""}`}>
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
                <div className="flex items-center justify-center">
                  <Checkbox
                    checked={task.completed}
                    className="border-details"
                    onClick={() => onClickCompleteAllTasks(task)}
                  />
                </div>
              </TableCell>
              <TableCell className="flex gap-2">
                <EditTaskModal
                  idSubject={idSubject}
                  data={task}
                  trigger={
                    <Pen
                      className="size-4 text-blue-500"
                    />
                  }
                />

                <Trash2 className="size-4 text-red-600" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow className="bg-rowAccordionEven">
            <TableCell colSpan={3}>
              <Button
                className="h-6 bg-green-700 p-2"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenDialogCreate(true);
                }}
              >
                <Plus className="size-5" />
                <Label>Nova revisão</Label>
              </Button>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <CreateTaskModal
        open={openDialogCreate}
        setOpen={setOpenDialogCreate}
        id={idSubject}
      />
    </>
  );
}
