'use client'

import { useRouter } from "next/navigation";

import { formatPrice } from "@/utils/format-price";

interface ItemProps {
  catalogId: string
  productId: string
  id: string
  title: string
  description?: string | null
  price: number
  promotion?: {
    from: number
    to: number
  };
  isDessert?: boolean
}

export default function Item({
  catalogId,
  productId,
  id,
  title,
  description,
  price,
  promotion,
  isDessert,
}: ItemProps) {
  const router = useRouter()

  const handleClick = () => {
    if (!isDessert) {
      router.push(`/${catalogId}/${productId}/${id}`)
    }
  }

  return (
    <div 
      className="flex items-start justify-between mb-4 rounded-lg p-2 cursor-pointer hover:bg-bg-secondary hover:transition-colors"
      onClick={handleClick}
    >
      <div>
        <h3 className="font-bold text-text-tertiary text-sm">{title}</h3>
        {description && (
          <p className="text-text-secondary text-xs text-justify mr-8 line-clamp-2">{description}</p>
        )}
      </div>

      <div>
        {promotion && promotion.from && promotion.to ? (
          <div className="flex flex-col gap-1 text-end">
            <span className="font-bold text-xs text-text-secondary line-through">{formatPrice(promotion.from)}</span>
            <span className="text-sm text-green font-bold">{formatPrice(promotion.to)}</span>
          </div>
        ) : (
          <span className="font-bold text-sm text-purple">{formatPrice(price)}</span>
        )}
      </div>
    </div>
  )
}