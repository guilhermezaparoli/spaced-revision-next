"use client";
import { Subject } from "@/@types/subject";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Checkbox } from "../ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
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
} from "../ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import zod from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useReviewQueryMutation } from "@/api/queries/review/useReviewQueyMutation";
import { useQueryClient } from "@tanstack/react-query";
import {
  useSubjectQueryMutationDelete,
  useSubjectQueryMutationUpdate,
} from "@/api/queries/subject/subjectQuery";
import { CreateTaskModal } from "./components/CreateTaskModal";
import { EditSubjectModal } from "./components/EditSubjectModal";
import { TaskTable } from "./components/TaskTable";

export function SubjectAccordion({ subject }: { subject: Subject }) {
  dayjs.locale("pt-br");
  const queryClient = useQueryClient();
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const mutationSubjectDelete = useSubjectQueryMutationDelete();

  async function onHandleDeleteSubject(id: string) {
    mutationSubjectDelete.mutate(id, {
      onSuccess: () => {
        queryClient.setQueryData(["subjects"], (currentData: Subject[]) =>
          currentData.filter((subject) => subject.id !== id),
        );
      },
    });
  }

  return (
    <>
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
          </AccordionTrigger>
          <AccordionContent className="bg-rowAccordionOdd text-white">
            <TaskTable tasks={subject.task} idSubject={subject.id} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <EditSubjectModal
        open={openModalEdit}
        setOpen={setOpenModalEdit}
        subject={subject}
      />
    </>
  );
}
