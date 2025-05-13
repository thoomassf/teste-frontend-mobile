'use client'

import AdditionalItem from "@/components/additional-item";
import ItemLayout from "@/components/item-layout";
import { useTicket } from "@/contexts/ticketContext";
import { useSelectedItemIds } from "@/hooks/useSelectedItemIds";

interface SideDishesGroupProps {
  catalogId: string
  productId: string
  setIsSelected: (value: boolean) => void
  isSelected: boolean
  sideDishes: {
    id: string
    name: string
    price: number
  }[]
  errorMessage?: string
}

export default function SideDishesGroup({ 
  sideDishes, 
  catalogId, 
  productId,
  setIsSelected,
  isSelected,
  errorMessage,
}: SideDishesGroupProps) {
  const { addToTicket, removeFromTicket } = useTicket()
  const { selectedIds } = useSelectedItemIds(catalogId, productId, "sideDishes")
  
  const handleSizeSelected = () => {
    setIsSelected(!isSelected)
  }

  const handleToggle = (itemId: string) => {
    const isSelected = selectedIds.includes(itemId);
    
    if (isSelected) {
      removeFromTicket(itemId);
    } else {
      if (selectedIds.length >= 2) return;
      
      const item = sideDishes.find(a => a.id === itemId);
      if (!item) return;

      addToTicket(catalogId, {
        ...item,
        quantity: 1,
      }, {
        isSideDish: true,
        parentProductId: productId
      });
    }
  };

  return (
    <ItemLayout 
      title="acompanhamentos"
      description="escolha de 1 a 2"
      isRequired
      errorMessage={errorMessage}
    >
      {sideDishes.map(additional => (
        <AdditionalItem 
          key={additional.id} 
          label={additional.name} 
          additionalValue={additional.price}
          isChecked={selectedIds.includes(additional.id)}
          onToggle={() => handleToggle(additional.id)}
        />
      ))}
    </ItemLayout>
  )
}