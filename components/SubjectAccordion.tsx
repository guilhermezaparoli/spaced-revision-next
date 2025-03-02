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

export function SubjectAccordion({ subject }: { subject: Subject }) {
  dayjs.locale("pt-br");
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
              {subject.task.map((task, index) => (
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
                      <div className="flex gap-2 items-center">
                        <p
                          className={
                            dayjs().isAfter(review.review_date)
                              ? "text-red-500"
                              : ""
                          }
                        >
                          {dayjs(review.review_date).format("DD/MM/YYYY")}
                        </p>

                        <Checkbox
                          checked={review.completed}
                          className="border-details"
                        />
                      </div>
                    </TableCell>
                  ))}
                  <TableCell>
                    <Checkbox className="border-details" />
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
