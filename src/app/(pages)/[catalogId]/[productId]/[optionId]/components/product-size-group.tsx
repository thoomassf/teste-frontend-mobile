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

export default function ProductSizesGroup({
  catalogId,
  productId,
  sizes,
  promotion,
  setIsSelected,
  isSelected,
  errorMessage,
}: ProductSizeGroupProps) {
  const { ticket, updateProductPrice } = useTicket()
  const [selectedSize, setSelectedSize] = useState<string | null>(null)

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

  const handleToggle = (sizeLabel: string, sizePrice: number) => {
    setSelectedSize(sizeLabel)
    handleSizeSelected()

    updateProductPrice(catalogId, productId, sizePrice)
  }

  const handleSizeSelected = () => {
    setIsSelected(!isSelected)
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