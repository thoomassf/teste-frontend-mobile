import { createContext, useContext } from "react";

import type { Product } from "@/types/Product";

export type TicketItem = {
  catalogId: string
  products: Product[]
}

/**
 * Defines the context type for managing ticket-related operations and state.
 * Provides methods for manipulating ticket items, products, and their properties.
 * 
 * @typedef {Object} TicketContextType
 * @property {TicketItem[]} ticket - The current list of ticket items
 * @property {Function} addToTicket - Adds a product to a ticket with optional configuration
 * @property {Function} removeFromTicket - Removes an entire ticket item by its catalog ID
 * @property {Function} removeProductFromTicket - Removes a specific product from a ticket
 * @property {Function} removeItemFromProduct - Removes a specific item from a product
 * @property {Function} clearTicket - Clears all items from the ticket
 * @property {Function} updateProductPrice - Updates the price of a specific product in a ticket
 * @property {Function} updateProductQuantity - Updates the quantity of a specific product in a ticket
 */
export type TicketContextType = {
  ticket: TicketItem[];
  addToTicket: (catalogId: string, productToAdd: Product, options?: {
    isAdditionalItem?: boolean
    isDrink?: boolean
    isSideDish?: boolean
    isCutlery?: boolean
    parentProductId?: string
    observation?: string
  }) => void;
  removeFromTicket: (id: string) => void;
  removeProductFromTicket: (productId: string) => void;
  removeItemFromProduct: (itemId: string) => void;
  clearTicket: () => void;
  updateProductPrice: (catalogId: string, productId: string, newPrice: number) => void
  updateProductQuantity: (catalogId: string, productId: string, newQuantity: number) => void;
}

export const TicketContext = createContext({} as TicketContextType)

export const useTicket = () => useContext(TicketContext)