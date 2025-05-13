'use client'

import ItemLayout from "@/components/item-layout";
import RadioOptionPromotion from "@/components/radio-option";
import RadioOptionComponent from "@/components/radio-option/radio-option";
import { useTicket } from "@/contexts/ticketContext";
import { useEffect, useState } from "react";

interface ProductSizeGroupProps {
  catalogId: string
  productId: string
  sizes: {
    size: string
    price: number
  }[]
  promotion?: {
    from: number | null
    to: number | null
  }
  setIsSelected: (value: boolean) => void
  isSelected: boolean
  errorMessage?: string
}

/**
 * Renders a group of product sizes with optional promotion handling.
 * 
 * @component
 * @param {Object} props - The component properties
 * @param {string} props.catalogId - The ID of the catalog
 * @param {string} props.productId - The ID of the product
 * @param {Array<{size: string, price: number}>} props.sizes - Available sizes for the product
 * @param {Object} [props.promotion] - Optional promotion details
 * @param {number} [props.promotion.from] - Promotion starting price
 * @param {number} [props.promotion.to] - Promotion ending price
 * @param {function} props.setIsSelected - Callback to update selection state
 * @param {string} [props.errorMessage] - Error message to display
 * 
 * @returns {JSX.Element} A radio button group for selecting product sizes
 */
export default function ProductSizesGroup({
  catalogId,
  productId,
  sizes,
  promotion,
  setIsSelected,
  errorMessage,
}: ProductSizeGroupProps) {
  const { ticket, updateProductPrice } = useTicket()
  const [selectedSize, setSelectedSize] = useState<string | null>(null)

  /**
     * Synchronizes the selected size with the current ticket state.
     * 
     * This effect checks the ticket for an existing product matching the current catalog and product IDs.
     * If a matching product is found and sizes are available, it attempts to find a size with a matching price
     * and sets the selected size accordingly.
     * 
     * @remarks
     * This effect runs when the ticket, catalogId, productId, or sizes change, ensuring the selected size
     * reflects the current state of the ticket.
     */
  useEffect(() => {
    const catalog = ticket.find(c => c.catalogId === catalogId)
    const product = catalog?.products.find(p => p.id === productId)
    if (product && sizes.length > 0) {
      const match = sizes.find(s => s.price === product.price)
      if (match) {
        setSelectedSize(match.size)        
      }
    }
  }, [ticket, catalogId, productId, sizes])

  /**
     * Updates the selection state based on whether a size has been selected.
     * Triggers when the selectedSize changes to update the parent component's
     * selection status.
     */
  useEffect(() => {
    setIsSelected(selectedSize !== null);
  }, [selectedSize, setIsSelected]);

  /**
   * Handles the selection of a product size and updates the product price.
   * 
   * @param {string} sizeLabel - The label of the selected size.
   * @param {number} sizePrice - The price associated with the selected size.
   */
  const handleToggle = (sizeLabel: string, sizePrice: number) => {
    setSelectedSize(sizeLabel)
    updateProductPrice(catalogId, productId, sizePrice)
  }

  return (
    <ItemLayout 
      title="qual o tamanho?"
      description="escolha 1"
      isRequired
      errorMessage={errorMessage}
    >
      {promotion && promotion.from && promotion.to ? (
        sizes.map((size, index) => (
          index === 0 ? (
            <RadioOptionPromotion 
              key={index}
              id={`${productId}-${size.size}`}
              label={size.size}
              additionalValue={promotion.to!}
              fixedValue={promotion.from!}
              isChecked={selectedSize === size.size}
              onToggle={() => handleToggle(size.size, promotion.to!)}
            />
          ) : (
            <RadioOptionComponent
              key={index}
              id={`${productId}-${size.size}`}
              label={size.size}
              value={size.price}
              isChecked={selectedSize === size.size}
              onToggle={() => handleToggle(size.size, size.price)}
              name={`product-size-${productId}`}
            />
          )
        ))
      ) : (
        sizes.map((size, index) => (
          <RadioOptionComponent 
            key={index}
            id={`${productId}-${size.size}`}
            label={size.size}
            value={size.price}
            isChecked={selectedSize === size.size}
            onToggle={() => handleToggle(size.size, size.price)}
            name={`product-size-${productId}`}
          />
        ))
      )}
    </ItemLayout>
  )
}