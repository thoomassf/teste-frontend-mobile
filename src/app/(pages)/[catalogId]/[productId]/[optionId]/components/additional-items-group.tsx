'use client'

import AdditionalItem from "@/components/additional-item";
import ItemLayout from "@/components/item-layout";
import { useTicket } from "@/contexts/ticketContext";
import { useEffect, useState } from "react";

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
  const { ticket, addToTicket, removeFromTicket } = useTicket()
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    const catalog = ticket.find(t => t.catalogId === catalogId);
    const product = catalog?.products.find(p => p.id === productId);
    const ids = product?.additionalItems?.map(item => item.id) || [];
    setSelectedIds(ids);
  }, [ticket, catalogId, productId]);

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