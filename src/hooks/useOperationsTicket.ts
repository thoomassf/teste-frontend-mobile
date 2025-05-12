import type { TicketItem } from "@/contexts/ticketContext"
import type { BaseProduct, Product } from "@/types/Product"

type AddToTicketOptions = {
  isAdditionalItem?: boolean
  isDrink?: boolean
  isSideDish?: boolean
  isCutlery?: boolean
  parentProductId?: string
}

export default function useOperationsTicket() {
  const createNewTicket = (
    prev: TicketItem[],
    catalogId: string,
    productToAdd: Product,
    options?: AddToTicketOptions
  ): TicketItem[] | null  => {
    const catalogIndex = prev.findIndex((item) => item.catalogId === catalogId)
    if (catalogIndex === -1 && !options?.isAdditionalItem && !options?.isDrink && !options?.isSideDish && !options?.isCutlery) {
      return [...prev, { catalogId, products: [{ ...productToAdd }] }]
    }
    return null
  }

  const addExtraItemToProduct = (
    product: Product,
    productToAdd: Product,
    options: AddToTicketOptions
  ) => {
    const baseProduct: BaseProduct = {
      id: productToAdd.id,
      name: productToAdd.name,
      price: productToAdd.price,
      quantity: productToAdd.quantity,
    }

    const updateList = (
      list: BaseProduct[] | undefined,
      condition: boolean,
      updater: (list: BaseProduct[]) => BaseProduct[]
    ) => condition ? updater(list || []) : list

    return {
      ...product,
      additionalItems: updateList(product.additionalItems, options.isAdditionalItem ?? false, list => {
        if (!list.some(i => i.id === baseProduct.id)) return [...list, baseProduct]
        return list
      }),
      sideDishes: updateList(product.sideDishes, options.isSideDish ?? false, list => {
        if (!list.some(i => i.id === baseProduct.id)) return [...list, baseProduct]
        return list
      }),
      cutlery: updateList(product.cutlery, options.isCutlery ?? false, list => {
        if (!list.some(i => i.id === baseProduct.id)) return [...list, baseProduct]
        return list
      }),
      drinks: updateList(product.drinks, options.isDrink ?? false, list => {
        const existingIndex = list.findIndex(d => d.id === baseProduct.id)
        if (existingIndex === -1) return [...list, baseProduct]
        return list.map((d, idx) =>
          idx === existingIndex ? { ...d, quantity: d.quantity + baseProduct.quantity } : d
        )
      }),
    }
  }

  const addOrUpdateMainProduct = (
    products: Product[],
    productToAdd: Product
  ): Product[] => {
    const existingIndex = products.findIndex(p => p.id === productToAdd.id)
    if (existingIndex !== -1) {
      const updated = [...products]
      updated[existingIndex] = {
        ...updated[existingIndex],
        quantity: updated[existingIndex].quantity + 1
      }
      return updated
    } else {
      return [...products, { ...productToAdd }]
    }
  }
  
  return {
    createNewTicket,
    addExtraItemToProduct,
    addOrUpdateMainProduct,
  }
}