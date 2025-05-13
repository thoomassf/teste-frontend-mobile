'use client'

import { useRouter } from "next/navigation";
import { Minus, Pencil, Plus } from "lucide-react";

import DetailsItemCart from "./details-item-cart";
import type { Product } from "@/types/Product";
import { formatPrice } from "@/utils/format-price";
import { useProductQuantityControlInTicket } from "@/hooks/useProductQuantityControlInTicket";

interface CartItemLayoutProps {
  product: Product
  catalogId: string
}

/**
 * Renders a cart item layout with product details, quantity control, and additional options.
 * 
 * @component
 * @param {Object} props - The component properties
 * @param {Product} props.product - The product details to be displayed in the cart
 * @param {string} props.catalogId - The identifier of the current catalog
 * 
 * @returns {React.ReactElement} A cart item layout with product information and interaction controls
 */
export default function CartItemLayout({ product, catalogId }: CartItemLayoutProps) {
  const router = useRouter()

  const { id, name, price, additionalItems, cutlery, drinks, sideDishes, observation } = product

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

  /**
   * Navigates to the catalog page for the current catalog.
   * Used to edit or modify the current item in the cart.
   */
  const handleEditItem = () => {
    router.push(`/${catalogId}`)
  }

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-text-tertiary text-sm">{name}</h3>
        <span className="text-purple text-sm font-bold">
          {formatPrice(price)}
        </span>
      </div>

      <div className="flex items-center justify-end mt-3 gap-6">
        <button 
          onClick={handleEditItem}
          className="flex items-center gap-2 text-water-green-500 font-bold text-sm hover:cursor-pointer hover:text-water-green-700 hover:transition-colors"
        >
          <Pencil className="size-4" />
          editar
        </button>

        <div className="flex items-center gap-4">
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
            className="w-5 h-5 flex items-center justify-center border rounded-full border-water-green-500 text-water-green-500 hover:cursor-pointer hover:border-water-green-700 hover:text-water-green-700 hover:transition-colors"
            onClick={handleIncrementProduct}
          >
            <Plus className="size-3" />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <DetailsItemCart 
          title="tamanho"
          items={[
            {
              name: 'médio',
            },
          ]}
        />

        {sideDishes && sideDishes?.length > 0 && (
          sideDishes.map(item => (
            <DetailsItemCart 
              key={item.id}
              title="Acompanhamentos"
              items={[
                {
                  name: item.name,
                  price: item.price === 0 ? undefined : item.price,
                },
              ]}
            />
          ))
        )}

        {drinks && drinks?.length > 0 && (
          drinks.map(item => (
            <DetailsItemCart 
              key={item.id}
              title="vai querer bebida?"
              items={[
                {
                  name: item.name,
                  price: item.price,
                },
              ]}
            />
          ))
        )}

        {additionalItems && additionalItems?.length > 0 && (
          additionalItems.map(item => (
            <DetailsItemCart 
              key={item.id}
              title="Mais alguma coisa?"
              items={[
                {
                  name: item.name,
                  price: item.price,
                },
              ]}
            />
          ))
        )}

        {cutlery && cutlery?.length > 0 && (
          cutlery.map(item => (
            <DetailsItemCart 
              key={item.id}
              title="Mais alguma coisa?"
              items={[
                {
                  name: item.name,
                  price: item.price,
                },
              ]}
            />
          ))
        )}  

        {observation && (
          <div className="w-fit max-w-full bg-[#F5F6F9] rounded-md mt-1.5 md:max-w-[600px]">
            <p className="text-xs font-bold text-text-primary p-1.5 break-words">
              <strong>observação:</strong> {observation}
            </p>
          </div>
        )}      
      </div>
    </div>
  )
}