'use client'

import { useTicket, type TicketItem } from "@/contexts/ticketContext"
import { formatPrice } from "@/utils/format-price"

/**
 * Renders the subtotal label for a ticket, calculating the total price of all items.
 * 
 * @returns A span element displaying the formatted subtotal price in bold purple text.
 */
export default function SubTotalLabel() {
  const { ticket } = useTicket()

  /**
   * Calculates the total price of a ticket, including all products, additional items, drinks, cutlery, and side dishes.
   * 
   * @param ticket - An array of ticket items to calculate the total price for
   * @returns The total price of all items in the ticket
   */
  const getTicketTotal = (ticket: TicketItem[]): number => {
    let total = 0

    ticket.forEach(item => {
      item.products.forEach(product => {
        total += product.price * product.quantity

        if (product.additionalItems) {
          product.additionalItems.forEach(additional => {
            total += additional.price * additional.quantity
          })
        }

        if (product.drinks) {
          product.drinks.forEach(drink => {
            total += drink.price * drink.quantity
          })
        }

        if (product.cutlery) {
          product.cutlery.forEach(cutlery => {
            total += cutlery.price * cutlery.quantity
          })
        }

        if (product.sideDishes) {
          product.sideDishes.forEach(cutlery => {
            total += cutlery.price * cutlery.quantity
          })
        }
      })
    })

    return total
  }

  /**
     * Calculates the subtotal for the current ticket by calling the getTicketTotal function.
     * 
     * @returns {number} The total price of all items in the ticket, including products, additional items, drinks, cutlery, and side dishes.
     */
  const subTotal = getTicketTotal(ticket)

  return (
    <span className="font-extrabold text-xl text-purple">{formatPrice(subTotal)}</span>
  )
}