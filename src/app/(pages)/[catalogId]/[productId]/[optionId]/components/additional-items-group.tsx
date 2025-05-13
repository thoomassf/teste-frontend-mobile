'use client'

import AdditionalItem from "@/components/additional-item";
import ItemLayout from "@/components/item-layout";
import { useTicket } from "@/contexts/ticketContext";
import { useSelectedItemIds } from "@/hooks/useSelectedItemIds";

interface AdditionalItemsGroupProps {
  catalogId: string
  productId: string
  additionalRequest: {
    id: string
    name: string
    price: number
  }[]
}

export default function AdditionalItemsGroup({ 
  additionalRequest, 
  catalogId, 
  productId 
}: AdditionalItemsGroupProps) {
  const { addToTicket, removeFromTicket } = useTicket()
  const { selectedIds } = useSelectedItemIds(catalogId, productId, "additionalItems")

  const handleToggle = (additionalId: string) => {    
    const isSelected = selectedIds.includes(additionalId);
    
    if (isSelected) {
      removeFromTicket(additionalId);
    } else {
      if (selectedIds.length >= 2) return;
      
      const additional = additionalRequest.find(a => a.id === additionalId);
      if (!additional) return;

      addToTicket(catalogId, {
        ...additional,
        quantity: 1,
      }, {
        isAdditionalItem: true,
        parentProductId: productId
      });
    }
  };

  return (
    <ItemLayout 
      title="mais alguma coisa?"
      description="escolha até 2"          
    >
      {additionalRequest.map(additional => (
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