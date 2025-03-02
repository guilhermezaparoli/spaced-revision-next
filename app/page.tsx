"use client";
import { SubjectService } from "@/api/services/subject/subjectService";
import { SubjectAccordion } from "@/components/SubjectAccordion";
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { CircleUserIcon, LogOutIcon, Plus, Search } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import zod from "zod";
export default function Home() {
  const { data, isLoading, status } = useQuery({
    queryKey: ["subjects"],
    queryFn: SubjectService.getAll,
  });
  const [openModal, setOpenModal] = useState(false);

  const zodSchema = zod.object({
    name: zod.string().min(3, "Nome muito curto").max(50, "Nome muito longo"),
    intervalo: zod.array(zod.number()),
  });

  const {register, handleSubmit, formState: {errors}, getValues} = useForm({
    resolver: zodResolver(zodSchema),
    defaultValues: {
      name: "",
      intervalo: [1, 7, 14, 30, 60],
    },
  });
  

  async function onHandleSubmit(data) {
    const response = await SubjectService.create(data)

    console.log(response)
    setOpenModal(false)
  }


  console.log(errors, "12312")
  return (
    <div className="h-screen bg-darkbg p-3">
      <header className="flex items-center justify-between">
        <p>teste</p>
        <div className="flex flex-col items-center">
          <h1 className="text-lg font-bold text-slate-50">SPACED REVISION</h1>
          <p className="text-details">2025, Feb 09</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage src="https://github.com/shadcn.png" alt="avatar" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <CircleUserIcon className="" />
              <DropdownMenuItem>Meu perfil</DropdownMenuItem>
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem>
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

        <div className="flex flex-col gap-2">
          <Dialog open={openModal} onOpenChange={setOpenModal}>
            <DialogTrigger asChild>
              <Button className="mb-4 flex w-24 items-center gap-2 bg-primaryButton text-white transition-colors hover:bg-primaryButton/80">
                <Plus className="size-6" />
                <span>Adicionar</span>
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
                  <Label htmlFor="intervalo" className="text-right text-white">
                    Intervalos de revisões
                  </Label>
                  <Input
                    id="intervalo"
                    className="col-span-3 text-white"
                    placeholder="Digite o intervalo"
                    {...register("intervalo")}
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

          {status == "success" &&
            data.map((subject) => (
              <SubjectAccordion key={subject.id} subject={subject} />
            ))}
        </div>
      </main>
      <footer></footer>
    </div>
  );
}
