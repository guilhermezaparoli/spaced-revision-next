import { Checkbox } from "@radix-ui/react-checkbox";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

export function SubjectAccordion() {
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
    )
}   //   );