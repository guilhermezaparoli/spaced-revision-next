"use client";
import { Subject } from "@/@types/subject";
import { useAuthQueryMutationLogout } from "@/api/queries/auth/authQuery";
import {
  useSubjectQuery,
  useSubjectQueryMutationCreate,
} from "@/api/queries/subject/subjectQuery";

import Loader from "@/components/Loader/Loader";
import { SubjectAccordion } from "@/components/SubjectAccordion/SubjectAccordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { CircleUserIcon, LogOutIcon, Plus, Search } from "lucide-react";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { useForm } from "react-hook-form";
import zod from "zod";
export default function Home() {
  const { data, isFetching } = useSubjectQuery();
  const [openModal, setOpenModal] = useState(false);
  const mutationSubjectCreate = useSubjectQueryMutationCreate();
  const mutationAuthLogout = useAuthQueryMutationLogout();
  const queryClient = useQueryClient();
  const router = useRouter();
  const zodSchema = zod.object({
    name: zod.string().min(3, "Nome muito curto").max(50, "Nome muito longo"),
    intervals: zod.array(zod.number()),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(zodSchema),
    defaultValues: {
      name: "",
      intervals: [1, 7, 14, 30, 60],
    },
  });

  async function onHandleSubmit(data: zod.infer<typeof zodSchema>) {
    mutationSubjectCreate.mutate(data, {
      onSuccess: (data) => {
        queryClient.setQueryData(["subjects"], (currentData: Subject[]) => [
          ...currentData,
          data,
        ]);
      },
    });

    setOpenModal(false);
    reset();
  }

  async function onHandleLogout() {
    mutationAuthLogout.mutate(undefined, {
      onSuccess: () => {
        router.push("/signin");
      },
      onError: (error) => {
        console.error("Logout failed:", error);
      },
    });
  }

  return (
    <div className="min-h-screen bg-darkbg p-3">
      <header className="flex items-center justify-between">
        <p>teste</p>
        <div className="flex flex-col items-center">
          <h1 className="text-lg font-bold text-slate-50">SPACED REVISION</h1>
          <p className="text-details">{dayjs().format("DD MMM YYYY")}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage src="https://github.com/shadcn.png" alt="avatar" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="cursor-pointer">
              <CircleUserIcon />
              <p>Ver perfil</p>
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="cursor-pointer"
              onClick={onHandleLogout}
            >
              <LogOutIcon className="text-red-600" />
              <p>Sair</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <main className="mt-4 flex flex-col gap-12">
        <div className="relative w-full">
          <label className="relative flex items-center">
            <Input
              placeholder="Buscar tarefas"
              aria-label="Buscar tarefas"
              className="h-10 w-full rounded-lg border-details pl-3 text-white"
            />
            <Search className="absolute right-3 size-6 text-details" />
          </label>
        </div>

        <div className="flex flex-col">
          <Dialog open={openModal} onOpenChange={setOpenModal}>
            <DialogTrigger asChild>
              <Button className="mb-4 flex w-36 items-center gap-2 bg-primaryButton text-white transition-colors hover:bg-primaryButton/80">
                <Plus className="size-6 text-white" />
                <span>Nova matéria</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Criar Matéria</DialogTitle>
                <DialogDescription>
                  Crie uma nova matéria e adicione suas revisões
                </DialogDescription>
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
                  <Label htmlFor="intervals" className="text-right text-white">
                    Intervalos de revisões
                  </Label>
                  <Input
                    id="intervals"
                    className="col-span-3 text-white"
                    placeholder="Digite o intervalo"
                    {...register("intervals")}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  className="w-full bg-cyan-500 hover:bg-cyan-600"
                  onClick={handleSubmit(onHandleSubmit)}
                >
                  Confirmar criação
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <div className="flex flex-col gap-4">
            {data?.map((subject) => (
              <SubjectAccordion key={subject.id} subject={subject} />
            ))}
          </div>

          {data?.length === 0 && !isFetching && (
            <div className="flex flex-col items-center justify-center">
              <p className="text-lg text-white">Nenhuma matéria cadastrada</p>
            </div>
          )}

          {isFetching && (
            <div className="flex h-full w-full items-center justify-center">
              <Loader />
            </div>
          )}
        </div>
      </main>
      <footer></footer>
    </div>
  );
}
