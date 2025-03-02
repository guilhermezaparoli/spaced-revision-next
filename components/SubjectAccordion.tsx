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
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "@/api/api";
import { TaskService } from "@/api/services/task/taskService";

export function SubjectAccordion({ subject }: { subject: Subject }) {
  dayjs.locale("pt-br");
  const [optimisticTasks, setOptimisticTasks] = useState<Task[]>(subject.task);

  async function onClickCheckboxReview(item: Review) {
    const updatedTasks = optimisticTasks.map((task) => {
      const updatedReviews = task.review.map((review) => {
        if (review.id === item.id) {
          return { ...review, completed: !review.completed };
        }

        if (review.task_id === item.task_id) {
          if (item.review_date > review.review_date) {
            return { ...review, completed: true };
          }
          if (item.review_date < review.review_date) {
            return { ...review, completed: false };
          }
        }

        return review;
      });

      return { ...task, review: updatedReviews };
    });

    setOptimisticTasks(updatedTasks);

    try {
      await api.put(`/review/${item.id}`, {
        completed: !item.completed,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function onClickCompleteAllTasks(item: Task) {
    const updatedTasks = optimisticTasks.map((task) => {
      const updatedReviews = task.review.map((review) => {
        if (review.task_id === item.id) {
          return { ...review, completed: !task.completed };
        }

        return review;
      });

      if (item.id === task.id) {
        return { ...task, completed: !task.completed, review: updatedReviews };
      }

      return { ...task, review: updatedReviews };
    });

    setOptimisticTasks(updatedTasks);

    try {
      const response = await TaskService.update(item.id, {
        completed: !item.completed,
      });
      console.log(response)
    } catch (error) {
      console.log(error);
    }
  }

  console.log(optimisticTasks);
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1" className="border-b-0">
        <AccordionTrigger className="h-11 w-full rounded-lg bg-accordion p-2 text-start text-white">
          {subject.name}
        </AccordionTrigger>
        <AccordionContent className="bg-rowAccordionOdd text-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead className="min-w-[170px]">Descrição</TableHead>
                <TableHead className="min-w-[130px]">Revisão 1</TableHead>
                <TableHead className="min-w-[130px]">Revisão 2</TableHead>
                <TableHead className="min-w-[130px]">Revisão 3</TableHead>
                <TableHead className="min-w-[130px]">Revisão 4</TableHead>
                <TableHead>Finalizada</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {optimisticTasks.map((task, index) => (
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
                    <TableCell key={review.id}>
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
} //   );
