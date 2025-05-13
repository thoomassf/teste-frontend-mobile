'use client'

import AdditionalItem from "@/components/additional-item";
import ItemLayout from "@/components/item-layout";
import { useTicket } from "@/contexts/ticketContext";
import { useSelectedItemIds } from "@/hooks/useSelectedItemIds";
import { useEffect } from "react";

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

/**
 * Renders a group of side dishes with selection functionality.
 * Allows users to select 1-2 side dishes for a product.
 * 
 * @param {Object} props - Component properties
 * @param {Array} props.sideDishes - List of available side dishes
 * @param {string} props.catalogId - Identifier for the current catalog
 * @param {string} props.productId - Identifier for the current product
 * @param {function} props.setIsSelected - Callback to update selection state
 * @param {string} [props.errorMessage] - Optional error message to display
 */
export default function SideDishesGroup({ 
  sideDishes, 
  catalogId, 
  productId,
  setIsSelected,
  errorMessage,
}: SideDishesGroupProps) {
  const { addToTicket, removeFromTicket } = useTicket()
  const { selectedIds } = useSelectedItemIds(catalogId, productId, "sideDishes")
  
  /**
   * Updates the parent component's selected state based on the number of selected side dishes.
   * Sets the selection state to true if at least one side dish is selected.
   */
  useEffect(() => {
    setIsSelected(selectedIds.length >= 1);
  }, [selectedIds, setIsSelected]);

  /**
     * Handles toggling the selection of a side dish item.
     * 
     * @param {string} itemId - The unique identifier of the side dish item
     * @description Manages side dish selection logic:
     * - Removes item if already selected
     * - Prevents selection beyond 2 side dishes
     * - Adds selected side dish to ticket with specific metadata
     */
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