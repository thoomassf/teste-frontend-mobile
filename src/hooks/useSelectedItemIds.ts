import { useEffect, useState } from "react";
import { useTicket } from "@/contexts/ticketContext";

export function useSelectedItemIds(
  catalogId: string, 
  productId: string, 
  type: "cutlery" | "sideDishes" | "additionalItems" | "drinks"
) {
  const { ticket } = useTicket();
  
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const getProductInTicket = () => {
    const catalog = ticket.find(c => c.catalogId === catalogId);
    const product = catalog?.products.find(p => p.id === productId);

    return product
  }

  useEffect(() => {
    const product = getProductInTicket();
    const items = product?.[type] || [];

    const ids = Array.isArray(items) ? items.map(i => i.id) : [];

    setSelectedIds(ids)
  }, [catalogId, productId, ticket, type]);
  
  return {
    selectedIds,
    getProductInTicket,
  }
}