import { useTicket } from "@/contexts/ticketContext";
import { useEffect, useState } from "react";

interface ProductQuantityControlInTicketProps {
  catalogId: string
  productId: string
}

/**
 * A custom hook for managing product quantity within a ticket.
 * 
 * @param {Object} props - The configuration properties for the hook
 * @param {string} props.catalogId - The unique identifier of the catalog
 * @param {string} props.productId - The unique identifier of the product
 * 
 * @returns {Object} An object containing:
 * - count: Current quantity of the product
 * - setCount: Function to manually set the product quantity
 * - handleIncrementProduct: Function to increase product quantity
 * - handleDecrementProduct: Function to decrease product quantity
 */
export function useProductQuantityControlInTicket({
  catalogId,
  productId
}: ProductQuantityControlInTicketProps) {
  const { ticket, updateProductQuantity } = useTicket()
  const [count, setCount] = useState(1)

  /**
     * Updates the count state based on the current ticket's product quantity.
     * 
     * This effect synchronizes the local count state with the quantity of a specific
     * product in the ticket. It finds the catalog and product by their respective IDs
     * and sets the count to the product's quantity, defaulting to 0 if not found.
     * 
     * @effect
     * @triggers When ticket, catalogId, or productId changes
     */
  useEffect(() => {
    const catalog = ticket.find(t => t.catalogId === catalogId)
    const product = catalog?.products.find(p => p.id === productId)
    setCount(product?.quantity || 0)
  }, [ticket, catalogId, productId])

  /**
     * Increments the product quantity in the ticket by 1.
     * 
     * This method calls the updateProductQuantity function with the current
     * catalog ID, product ID, and incremented count.
     */
  const handleIncrementProduct = () => {
    updateProductQuantity(catalogId, productId, count + 1)
  }

  /**
   * Decrements the product quantity in the ticket by 1.
   * 
   * This method reduces the product quantity by 1 if the current count is greater than 1.
   * It calls the updateProductQuantity function with the current catalog ID, 
   * product ID, and decremented count.
   */
  const handleDecrementProduct = () => {
    if (count > 1) {
      updateProductQuantity(catalogId, productId, count - 1)
    }
  }

  return {
    count,
    setCount,
    handleIncrementProduct,
    handleDecrementProduct,
  }
}