'use client'

import { useTicket } from "@/contexts/ticketContext"
import type { Product } from "@/types/Product"
import { Plus, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"

interface AddTicketProps {
  catalogId: string
  product: Product
}

/**
 * Renders an add-to-ticket button component for a specific product.
 * 
 * @param {Object} props - The component props
 * @param {string} props.catalogId - The ID of the catalog containing the product
 * @param {Product} props.product - The product details to be added to the ticket
 * 
 * @returns {JSX.Element} A button or control group for adding/managing product quantity in the ticket
 */
export default function AddTicket({ catalogId, product }: AddTicketProps) {
  const { ticket, addToTicket, removeFromTicket } = useTicket()
  const [count, setCount] = useState(1)

  const { id, name, price, quantity } = product

  /**
   * Updates the local count state based on the current ticket's product quantity.
   * 
   * @description Finds the product in the ticket for the current catalog and updates
   * the local count state to reflect its quantity. If no matching product is found,
   * sets the count to 0.
   * 
   * @effect Synchronizes the local count with the ticket's product quantity
   */
  useEffect(() => {
    const catalog = ticket.find(t => t.catalogId === catalogId)
    const product = catalog?.products.find(p => p.id === id)

    setCount(product?.quantity || 0)
  }, [ticket, catalogId, id])

  /**
   * Adds the current product to the ticket with its associated catalog ID.
   * 
   * @description Invokes the addToTicket function with the current catalog ID and product details,
   * including the product's id, name, price, and quantity.
   */
  const handleAddToTicket = () => {
    addToTicket(catalogId, {
      id,
      name,
      price,
      quantity
    })
  }

  return (
    <>
      {count === 0 ? (
        <button 
          onClick={handleAddToTicket}
          className="bg-text-secondary py-[10px] px-6 rounded-md text-white font-bold text-sm cursor-pointer"
        >
          Adicionar
        </button>
      ) : (
        <div className="flex items-center gap-4 mr-2">
          <button
            className='w-5 h-5 flex items-center justify-center text-water-green-500 cursor-pointer'
            onClick={() => removeFromTicket(id)}
          >
            <Trash2 className="size-5" />
          </button>

          <span className="font-bold text-sm text-text-primary">{count}</span>

          <button 
            className="w-5 h-5 flex items-center justify-center border border-water-green-500 rounded-full text-water-green-500 cursor-pointer" 
            onClick={handleAddToTicket}
          >
            <Plus className="size-3" />
          </button>
        </div>
      )}
    </>
  )
}