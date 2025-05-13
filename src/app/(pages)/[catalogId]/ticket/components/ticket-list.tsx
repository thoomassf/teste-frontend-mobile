'use client'

import { useTicket } from "@/contexts/ticketContext"
import CartItemLayout from "./cart-item-layout"

interface TicketListProps {
  catalogId: string
}

/**
 * Renders a list of tickets for a specific catalog.
 * 
 * @param {Object} props - The component props
 * @param {string} props.catalogId - The unique identifier of the catalog
 * @returns {JSX.Element} A list of cart items or a message if no items are present
 */
export default function TicketList({ catalogId }: TicketListProps) {
  const { ticket } = useTicket()

  const filteredTicket = ticket.filter(item => item.catalogId === catalogId)
  
  if (!catalogId || !filteredTicket.length || !filteredTicket[0].products.length) {
    return <div className="text-sm font-bold text-text-primary mt-6">Nenhum item adicionado</div>
  }

  return (
    <>
      {filteredTicket[0].products.map(product => {
        const prod = {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: product.quantity,
          additionalItems: product.additionalItems,
          cutlery: product.cutlery,
          sideDishes: product.sideDishes,
          drinks: product.drinks,
          observation: product.observation,
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