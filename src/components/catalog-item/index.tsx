import Image from "next/image";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import Item from "./item";

interface OptionProps {
  id: string;
  name: string;
  description: string | null;
  sizes: {
    size: string;
    price: number;
  }[];
  sideDishes: string[];
  drinkIncluded: boolean;
  cutlery: ({
      name: string;
      price: null;
  } | {
      name: string;
      price: number;
  })[];
  additionalRequest: string;
  price: number;
  promotion?: {
    from: number;
    to: number;
  };
  vegan: boolean;
  spicy: boolean;
}

interface CatalogItemProps {
  catalogId: string;
  productId: string;
  title: string;
  description?: string | null;
  options: OptionProps[]
}

export default function CatalogItem({
  catalogId,
  productId,
  title,
  description,
  options,
}: CatalogItemProps) {
  const optionContainsPromotion = options.some(option => option.promotion?.from && option.promotion.to);

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" className="px-4 py-3 bg-white mb-1">
        <AccordionTrigger className="hover:no-underline">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-text-tertiary">
                {title}
              </h2>
              {optionContainsPromotion && (
                <Image 
                  src="/expense.svg" 
                  alt="Ícone de valor" 
                  width={16}
                  height={16}
                />
              )}
            </div>
            {description && (
              <p className="text-xs font-semibold text-text-secondary mr-4">
                {description}
              </p>
            )}
          </div>
        </AccordionTrigger>
        <AccordionContent>
          {options.map((option) => (
            <Item
              key={option.id}
              catalogId={catalogId}
              productId={productId}
              id={option.id}
              title={option.name}
              description={option.description}
              price={option.price}
              promotion={option?.promotion}
              vegan={option.vegan}
              spicy={option.spicy}
            />
          ))}          
        </AccordionContent>
      </AccordionItem>      
    </Accordion>
  )
}                                           