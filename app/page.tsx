'use client'
import { SubjectService } from "@/api/services/subjects/subjectService";
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
import { useQuery } from "@tanstack/react-query";
import { CircleUserIcon, LogOutIcon, Plus, Search } from "lucide-react";

export default function Home() {
  const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "dasdasdsadasd asd as das dasd ad ",
      paymentStatus1: "Paid",
      paymentStatus2: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Paid",
      paymentStatus1: "Paid",
      paymentStatus2: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV003",
      paymentStatus: "Paid",
      paymentStatus1: "Paid",
      paymentStatus2: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV0014",
      paymentStatus: "Paid",
      paymentStatus1: "Paid",
      paymentStatus2: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV0015",
      paymentStatus: "Paid",
      paymentStatus1: "Paid",
      paymentStatus2: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV0016",
      paymentStatus: "Paid",
      paymentStatus1: "Paid",
      paymentStatus2: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
  ];

  const {data, isLoading, status} = useQuery({
    queryKey: ["subjects"],
    queryFn: SubjectService.getSubjects,
  })

  console.log(data)

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
          <Dialog>
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
                  {/* <Label htmlFor="name" className="text-right text-white">
                    Nome
                  </Label> */}
                  <Input
                    id="name"
                    className="col-span-3 text-white"
                    placeholder="Nome da matéria"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  className="w-full bg-cyan-500 hover:bg-cyan-600"
                >
                  Confirmar criação
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {status == "success" && data.map((subject) => (
            <SubjectAccordion key={subject.id} subject={subject} />
          ))}

        </div>
      </main>
      <footer></footer>
    </div>
  );
}
