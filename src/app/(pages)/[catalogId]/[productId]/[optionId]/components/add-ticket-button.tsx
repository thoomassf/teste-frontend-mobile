'use client'

import { Minus, Plus, Trash2 } from "lucide-react"
import { useTicket } from "@/contexts/ticketContext"
import { useProductQuantityControlInTicket } from "@/hooks/useProductQuantityControlInTicket"
import type { Product } from "@/types/Product"

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
  const { id, name, price, quantity } = product

  /**
   * Destructures ticket-related methods from the ticket context.
   * 
   * @description Extracts functions for adding and removing products from the ticket.
   * @returns {Object} An object containing methods to manipulate ticket contents.
   */
  const { addToTicket, removeFromTicket } = useTicket()

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

  /**
   * Extracts product quantity control hooks and methods for a specific product in a ticket context.
   * 
   * @param {Object} options - Configuration options for quantity control
   * @param {string} options.catalogId - The identifier of the current catalog
   * @param {string} options.productId - The unique identifier of the product
   * 
   * @returns {Object} An object containing the current product count and methods to increment/decrement the quantity
   */
  const { 
    count, 
    handleIncrementProduct, 
    handleDecrementProduct   
  } = useProductQuantityControlInTicket({ catalogId, productId: id })

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

          <button 
            className={`w-5 h-5 flex items-center justify-center rounded-full border ${
              count === 0 ? 'bg-[#EEF0F5] text-[#A8ADB7] cursor-not-allowed' : 'border-water-green-500 text-water-green-500 hover:cursor-pointer hover:border-water-green-700 hover:text-water-green-700 hover:transition-colors'
            }`}
            onClick={handleDecrementProduct}
            disabled={count === 0}
          >
            <Minus className="size-4" />
          </button>

          <span className="font-bold text-sm text-text-primary">{count}</span>

          <button 
            className="w-5 h-5 flex items-center justify-center border border-water-green-500 rounded-full text-water-green-500 cursor-pointer" 
            onClick={handleIncrementProduct}
          >
            <Plus className="size-3" />
          </button>
        </div>
      )}
    </>
  )
}