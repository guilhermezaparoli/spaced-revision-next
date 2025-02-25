import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AccordionTrigger } from '@radix-ui/react-accordion';

export default function Home() {
  return (
    <div className='p-3 bg-darkbg h-screen'>
      <header>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="avatar" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </header>
      <main>
      <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className='bg-accordion w-full text-start p-2 rounded-lg text-white'>Matemática</AccordionTrigger>
        <AccordionContent className='bg-rowAccordion p-2 text-white '>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
        <AccordionContent className='bg-slate-400 p-2 text-white '>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
 
    </Accordion>
      </main>
      <footer></footer>
    </div>
  );
}
