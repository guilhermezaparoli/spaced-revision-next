import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { AccordionTrigger } from '@radix-ui/react-accordion';
import { Search } from 'lucide-react';

export default function Home() {
  const invoices = [
    {
      invoice: 'INV001',
      paymentStatus: 'dasdasdsadasd asd as das dasd ad ',
      paymentStatus1: 'Paid',
      paymentStatus2: 'Paid',
      totalAmount: '$250.00',
      paymentMethod: 'Credit Card',
    },
    {
      invoice: 'INV002',
      paymentStatus: 'Paid',
      paymentStatus1: 'Paid',
      paymentStatus2: 'Paid',
      totalAmount: '$250.00',
      paymentMethod: 'Credit Card',
    },
    {
      invoice: 'INV003',
      paymentStatus: 'Paid',
      paymentStatus1: 'Paid',
      paymentStatus2: 'Paid',
      totalAmount: '$250.00',
      paymentMethod: 'Credit Card',
    },
    {
      invoice: 'INV0014',
      paymentStatus: 'Paid',
      paymentStatus1: 'Paid',
      paymentStatus2: 'Paid',
      totalAmount: '$250.00',
      paymentMethod: 'Credit Card',
    },
    {
      invoice: 'INV0015',
      paymentStatus: 'Paid',
      paymentStatus1: 'Paid',
      paymentStatus2: 'Paid',
      totalAmount: '$250.00',
      paymentMethod: 'Credit Card',
    },
    {
      invoice: 'INV0016',
      paymentStatus: 'Paid',
      paymentStatus1: 'Paid',
      paymentStatus2: 'Paid',
      totalAmount: '$250.00',
      paymentMethod: 'Credit Card',
    },
  ];
  return (
    <div className="p-3 bg-darkbg h-screen">
      <header className="flex justify-between items-center">
        <p>teste</p>
        <div className="flex flex-col items-center">
          <h1 className="text-white text-lg font-bold">SPACED REVISION</h1>
          <p className="text-details">2025, Feb 09</p>
        </div>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="avatar" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </header>
      <main className="flex flex-col gap-12 mt-4">
        <div className="relative w-full">
          <label className="relative flex items-center">
            <Input
              placeholder="Buscar tarefas"
              aria-label="Buscar tarefas"
              className="h-10 w-full rounded-lg border-details text-white pl-3"
            />
            <Search className="text-details size-6 absolute right-3" />
          </label>
        </div>

        <div className="flex flex-col gap-2">
          <Dialog>
            <Button className="bg-cyan-500 w-24 mb-4 hover:bg-cyan-600 transition-colors">
              Adicionar
            </Button>
          </Dialog>

          <Accordion type="single" collapsible className="w-full ">
            <AccordionItem value="item-1" className="border-b-0">
              <AccordionTrigger className="bg-accordion w-full text-start p-2 rounded-lg text-white h-11 ">
                Matemática
              </AccordionTrigger>
              <AccordionContent className="bg-rowAccordionOdd p-2 text-white ">
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
                    {invoices.map((invoice) => (
                      <TableRow key={invoice.invoice}>
                        <TableCell className="font-medium">
                          {invoice.invoice}
                        </TableCell>
                        <TableCell className="w-36 ">
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
              <AccordionTrigger className="bg-accordion w-full text-start p-2 rounded-lg text-white">
                Português
              </AccordionTrigger>
              <AccordionContent className="bg-rowAccordionOdd p-2 text-white ">
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
              <AccordionContent className="bg-rowAccordionEven p-2 text-white ">
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
