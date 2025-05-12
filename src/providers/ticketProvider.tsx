'use client'

import { useCallback, useEffect, useState } from "react"

import { TicketContext, type TicketContextType, type TicketItem } from "@/contexts/ticketContext"
import type { BaseProduct } from "@/types/Product"
import useOperationsTicket from "@/hooks/useOperationsTicket"

export const TicketProvider = ({ children }: { children: React.ReactNode }) => {
  /**
   * Initializes the ticket state with data from localStorage, if available.
   * Falls back to an empty array if no ticket data is found or if running on the server.
   * 
   * @returns {TicketItem[]} An array of ticket items, either from localStorage or an empty array
   */
  const [ticket, setTicket] = useState<TicketItem[]>(() => {
    if (typeof window === "undefined") return [];
    const saved = localStorage.getItem("ticket");
    return saved ? JSON.parse(saved) : [];
  });

  /**
   * Synchronizes the ticket state with localStorage whenever the ticket changes.
   * Ensures that the current ticket data is persistently stored in the browser's local storage.
   */
  useEffect(() => {
    localStorage.setItem('ticket', JSON.stringify(ticket))
  }, [ticket])

  /**
   * Destructures utility functions from the useOperationsTicket hook
   * to manage ticket-related operations like creating new tickets,
   * adding extra items to products, and updating main products.
   * 
   * @returns {Object} An object containing ticket manipulation functions
   */
  const { 
    createNewTicket,
    addExtraItemToProduct,
    addOrUpdateMainProduct,
  } = useOperationsTicket()

  /**
   * Adds a product or item to the ticket, handling different scenarios like main products, additional items, drinks, side dishes, and cutlery.
   * 
   * @param catalogId - The unique identifier of the catalog where the product will be added
   * @param productToAdd - The product or item to be added to the ticket
   * @param options - Optional configuration for adding the product, such as specifying parent product or item type
   * 
   * This function manages the ticket state by creating a new ticket, updating existing catalogs,
   * and handling various product addition scenarios based on the provided options.
   */
  const addToTicket = useCallback<TicketContextType["addToTicket"]>(
    (catalogId, productToAdd, options) => {
      setTicket(prev => {
        /**
           * Attempts to create a new ticket based on the current ticket state, catalog ID, product to add, and optional configuration.
           * 
           * @param prev - The previous ticket state
           * @param catalogId - The unique identifier of the catalog where the new ticket will be created
           * @param productToAdd - The product to be added to the new ticket
           * @param options - Optional configuration for creating the ticket
           * @returns {TicketItem[] | null} A new ticket array or null if ticket creation is not possible
           */
        const newTicket = createNewTicket(prev, catalogId, productToAdd, options)
        if (newTicket) return newTicket

        /**
         * Prepares a deep copy of the current ticket state for modification.
         * 
         * Creates a new array of ticket catalogs, finds the specific catalog by its ID,
         * and creates a copy of the catalog and its products to enable immutable state updates.
         * 
         * @param prev - The current ticket state array
         * @param catalogId - The unique identifier of the catalog to be modified
         * @returns {Object} An object containing references to the copied ticket state, specific catalog, and its products
         */
        const updatedTicket = [...prev]
        const catalogIndex = updatedTicket.findIndex(item => item.catalogId === catalogId)
        const catalog = { ...updatedTicket[catalogIndex] }
        const products = [...catalog.products]

        /**
         * Handles adding extra items or updating main products within the ticket.
         * 
         * @param {Object} options - Configuration options for adding the product
         * @param {boolean} [options.isAdditionalItem] - Indicates if the item is an additional item
         * @param {boolean} [options.isDrink] - Indicates if the item is a drink
         * @param {boolean} [options.isSideDish] - Indicates if the item is a side dish
         * @param {boolean} [options.isCutlery] - Indicates if the item is cutlery
         * @param {string} [options.parentProductId] - The ID of the parent product for extra items
         * 
         * @returns {void} Updates the products array in-place
         * 
         * This block handles two primary scenarios:
         * 1. Adding extra items (additional items, drinks, side dishes, cutlery) to an existing parent product
         * 2. Adding or updating main products in the ticket
         */
        if (options?.isAdditionalItem || options?.isDrink || options?.isSideDish || options?.isCutlery) {
          const parentIndex = products.findIndex(p => p.id === options.parentProductId)
          if (parentIndex === -1) return prev

          const updatedParent = addExtraItemToProduct(products[parentIndex], productToAdd, options)
          products[parentIndex] = updatedParent
        } else {          
          const updatedProducts = addOrUpdateMainProduct(products, productToAdd)
          catalog.products = updatedProducts
        }

        catalog.products = products
        updatedTicket[catalogIndex] = catalog
        return updatedTicket
      })
    },
    [createNewTicket, addExtraItemToProduct, addOrUpdateMainProduct]
  );

  /**
   * Updates the price of a specific product within a catalog in the ticket.
   * 
   * @param catalogId - The unique identifier of the catalog containing the product
   * @param productId - The unique identifier of the product to update
   * @param newPrice - The new price to set for the product
   */
  const updateProductPrice = (catalogId: string, productId: string, newPrice: number) => {
    setTicket(prev => {
      const updatedTicket = prev.map(catalog => {
        if (catalog.catalogId !== catalogId) return catalog

        const updatedProducts = catalog.products.map(product => {
          if (product.id !== productId) return product
          return {
            ...product,
            price: newPrice,
          }
        })

        return {
          ...catalog,
          products: updatedProducts,
        }
      })

      return updatedTicket
    })
  }

  /**
   * Removes either a product or an item from the ticket based on the provided ID.
   * 
   * @param id - The unique identifier of the product or item to remove
   * @returns void
   * 
   * This function determines whether the given ID corresponds to a product or an item
   * within the ticket. If it's a product, it calls removeProductFromTicket to remove
   * the entire product. If it's an item (like a drink or additional item), it calls
   * removeItemFromProduct to remove or decrement the specific item.
   */
  const removeFromTicket = useCallback((id: string) => {
    const isProduct = ticket.some(catalog =>
      catalog.products.some(p => p.id === id)
    )

    if (isProduct) {
      removeProductFromTicket(id)
    } else {
      removeItemFromProduct(id)
    }
  }, [ticket])

  /**
   * Removes a specific product from the ticket by filtering out the product with the given ID.
   * 
   * @param productId - The unique identifier of the product to remove from the ticket
   * @returns void
   * 
   * This function updates the ticket state by removing the product with the matching ID
   * from its respective catalog. If a catalog becomes empty after removing the product,
   * it is also filtered out from the ticket.
   */
  const removeProductFromTicket = (productId: string) => {
    setTicket(prev => 
      prev
        .map(catalog => ({
          ...catalog,
          products: catalog.products.filter(product => product.id !== productId)
        }))
        .filter(catalog => catalog.products.length > 0)
    )
  }

  /**
   * Removes a specific item from a product in the ticket, adjusting quantities or filtering out items.
   * 
   * @param itemId - The unique identifier of the item to remove
   * @returns void
   * 
   * This function handles removing items like drinks, additional items, side dishes, or cutlery
   * from a product. For drinks, it decrements the quantity, removing the item if the quantity reaches zero.
   * For other item types, it simply filters out the item with the matching ID.
   */
  const removeItemFromProduct = (itemId: string) => {
    setTicket(prev => 
      prev
        .map(catalog => {
          const updatedProducts = catalog.products.map(product => {
            const updatedDrinks = product.drinks
              ?.map(drink => {
                if (drink.id === itemId) {
                  const newQty = drink.quantity - 1
                  return newQty > 0 ? { ...drink, quantity: newQty } : null
                }
                return drink
              })
              .filter((drink): drink is BaseProduct => drink !== null)

            return {
              ...product,
              additionalItems: product.additionalItems?.filter(i => i.id !== itemId),
              sideDishes: product.sideDishes?.filter(i => i.id !== itemId),
              cutlery: product.cutlery?.filter(i => i.id !== itemId),
              drinks: updatedDrinks,
            }
          })

          return {
            ...catalog,
            products: updatedProducts
          }
        })
        .filter(catalog => catalog.products.length > 0)
    )
  }

  /**
   * Clears the entire ticket by resetting the ticket state to an empty array.
   * This function removes all items and products from the current ticket.
   */
  const clearTicket = useCallback<TicketContextType["clearTicket"]>(() => {
    setTicket([]);
  }, []);

  /**
   * Updates the quantity of a specific product within a catalog in the ticket.
   * 
   * @param catalogId - The unique identifier of the catalog containing the product
   * @param productId - The unique identifier of the product to update
   * @param newQuantity - The new quantity to set for the specified product
   */
  const updateProductQuantity = (catalogId: string, productId: string, newQuantity: number) => {
    setTicket(prev => 
      prev.map(catalog => {
        if (catalog.catalogId !== catalogId) return catalog

        const updatedProducts = catalog.products.map(product => {
          if (product.id !== productId) return product
          return { ...product, quantity: newQuantity }
        })

        return { ...catalog, products: updatedProducts }
      })
    )
  }

  const value: TicketContextType = {
    ticket,
    addToTicket,
    removeFromTicket,
    removeProductFromTicket,
    removeItemFromProduct,
    updateProductPrice,
    clearTicket,
    updateProductQuantity,
  }

  return (
    <TicketContext.Provider value={value}>
      {children}
    </TicketContext.Provider>
  )
}