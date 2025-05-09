import DrinksList from "../drinks-list";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

interface CatalogItemProps {
  title: string;
  description?: string;
  isUnique?: boolean
}

export default function CatalogItem({
  title,
  description,
  isUnique = false,
}: CatalogItemProps) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" className="px-4 py-3 bg-white mb-1">
        <AccordionTrigger className="hover:no-underline">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-text-tertiary">
                {title}
              </h2>
              {isUnique && (
                <img src="/expense.svg" alt="Ícone de valor" className="size-4" />
              )}
            </div>
            {description && (
              <p className="text-xs font-semibold text-text-secondary max-w-[326px]">
                {description}
              </p>
            )}
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <DrinksList />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}                                           