import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AccordionTrigger } from "@radix-ui/react-accordion";
import { Plus, Search } from "lucide-react";

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
  return (
    <div className="h-screen bg-darkbg p-3">
      <header className="flex items-center justify-between">
        <p>teste</p>
        <div className="flex flex-col items-center">
          <h1 className="text-lg font-bold text-slate-50">SPACED REVISION</h1>
          <p className="text-details">2025, Feb 09</p>
        </div>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="avatar" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
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
              <Button className="bg-primaryButton hover:bg-primaryButton/80 mb-4 flex w-24 items-center gap-2 text-white transition-colors">
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

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-b-0">
              <AccordionTrigger className="h-11 w-full rounded-lg bg-accordion p-2 text-start text-white">
                Matemática
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
                      <TableHead>Finalizada</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.map((invoice, index) => (
                      <TableRow
                        key={invoice.invoice}
                        className={
                          index % 2 === 0
                            ? "bg-rowAccordionEven"
                            : "bg-rowAccordionOdd"
                        }
                      >
                        <TableCell className="font-medium">
                          {invoice.invoice}
                        </TableCell>
                        <TableCell className="w-36">
                          {invoice.paymentStatus}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <p>16/01/2025</p>
                            <Checkbox className="border-details" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <p>16/01/2025</p>
                            <Checkbox className="border-details" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <p>16/01/2025</p>
                            <Checkbox className="border-details" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-center gap-2">
                            <Checkbox className="border-details" />
                          </div>
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
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-b-0">
              <AccordionTrigger className="w-full rounded-lg bg-accordion p-2 text-start text-white">
                Português
              </AccordionTrigger>
              <AccordionContent className="bg-rowAccordionOdd p-2 text-white">
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
              <AccordionContent className="bg-rowAccordionEven p-2 text-white">
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </main>
      <footer></footer>
    </div>
  );
}
