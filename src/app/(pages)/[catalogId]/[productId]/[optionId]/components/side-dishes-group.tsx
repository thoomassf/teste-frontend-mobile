'use client'

import AdditionalItem from "@/components/additional-item";
import ItemLayout from "@/components/item-layout";
import { useTicket } from "@/contexts/ticketContext";
import { useEffect, useState } from "react";

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
  const { ticket, addToTicket, removeFromTicket } = useTicket()
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleSizeSelected = () => {
    setIsSelected(!isSelected)
  }

  useEffect(() => {
    const catalog = ticket.find(t => t.catalogId === catalogId);
    const product = catalog?.products.find(p => p.id === productId);
    const ids = product?.sideDishes?.map(item => item.id) || [];

    setSelectedIds(ids);

    if (selectedIds.length === 1) {
      return
    } else if (selectedIds.length === 0) {
      handleSizeSelected();
    }
  }, [ticket, catalogId, productId]);

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