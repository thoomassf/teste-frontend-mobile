'use client'

import ItemLayout from "@/components/item-layout"
import RadioOptionComponent from "@/components/radio-option/radio-option"
import { useTicket } from "@/contexts/ticketContext"
import { useEffect, useState } from "react"

interface CutleryGroupProps {
  catalogId: string
  productId: string
  cutlery: {
    id: string
    name: string
    price: number
  }[]
}

export default function CutleryGroup({ 
  catalogId,
  productId,
  cutlery,
}: CutleryGroupProps) {
  const { ticket, addToTicket, removeFromTicket } = useTicket()
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    const catalog = ticket.find(t => t.catalogId === catalogId);
    const product = catalog?.products.find(p => p.id === productId);
    const currentCutlery = product?.cutlery?.[0]
    setSelectedId(currentCutlery?.id || null);
  }, [ticket, catalogId, productId]);

  const handleToggle = (itemId: string) => {
    const isSelected = selectedId === itemId;
    
    if (isSelected) {
      removeFromTicket(itemId);
      setSelectedId(null);
    } else {
      if (selectedId) {
        removeFromTicket(selectedId);
      }
      
      const newItem = cutlery.find(a => a.id === itemId);      
      if (!newItem) return;

      addToTicket(catalogId, {
        ...newItem,
        quantity: 1,
      }, {
        isCutlery: true,
        parentProductId: productId
      });
      setSelectedId(itemId);
    }
  }

  return (
    <ItemLayout
      title="Precisa de talher?"
      description="escolha até 1"
    >
      {cutlery.map(item => (
        <RadioOptionComponent
          key={item.id}
          id={item.id}
          label={item.name}
          value={item.price}
          isChecked={selectedId === item.id}
          onToggle={() => handleToggle(item.id)}
          name="radio-group-cutlery"
          isAdditionalValue       
        />
      ))}
    </ItemLayout>
  )
}