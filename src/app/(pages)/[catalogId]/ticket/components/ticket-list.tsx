'use client'

import { useTicket } from "@/contexts/ticketContext"
import CartItemLayout from "./cart-item-layout"

interface TicketListProps {
  catalogId: string
}

/**
 * Renders a list of ticket items for a specific catalog.
 * 
 * @param {Object} props - The component props
 * @param {string} props.catalogId - The unique identifier for the catalog
 * @returns {JSX.Element} A list of cart items or a message if no items are present
 */
export default function TicketList({ catalogId }: TicketListProps) {
  const { ticket } = useTicket()

  if (!ticket.length || !catalogId) {
    return <div>Nenhum item adicionado</div>
  }

  return (
    <>
      {ticket[0].products.map(product => {
        const prod = {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: product.quantity,
          additionalItems: product.additionalItems,
          cutlery: product.cutlery,
          sideDishes: product.sideDishes,
          drinks: product.drinks,
        }

        return (
          <CartItemLayout 
            key={product.id}
            catalogId={catalogId}
            product={prod}
          />
        )
      })}
    </>
  )
}