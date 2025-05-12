'use client'

import { formatPrice } from "@/utils/format-price"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface RestaurantItemProps {
  id: string
  title: string
  unit?: string
  img: string
  price: number
  stars: number
  isClosed?: boolean
  isFreeShipping?: boolean
}

export default function RestaurantItem({ 
  id,
  title,
  unit,
  img,
  price,
  stars,
  isClosed, 
  isFreeShipping,
}: RestaurantItemProps) {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/${id}`)
  }

  return (
    <div       
      className={`flex gap-3 bg-bg-secondary mx-4 rounded-lg mb-4 cursor-pointer md:col-span-2 lg:md:col-span-1 hover:bg-bg-tertiary transition-colors ${
        isClosed ? 'pointer-events-none' : 'opacity-100'
      }`}
      onClick={!isClosed ? handleClick : undefined}
    >
      <Image 
        src={img} 
        alt={`${title} - ${unit}`}
        width={72}
        height={72}
        className={`${isClosed ? 'opacity-50' : ''}`}
      />

      <div className="flex flex-col justify-center">
        <h2 className="text-base font-bold text-text-primary">{title} - {unit}</h2>
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-2">
            {isFreeShipping ? (
              <>
                <Image 
                  src="/bike.svg" 
                  alt="Icone preço" 
                  width={18}
                  height={13}
                />
                <span className="text-water-green-700 text-sm font-bold mr-1">grátis</span>
              </>
            ) : (
              <>
                <Image 
                  src="/price-icon.svg" 
                  alt="Icone preço" 
                  width={18}
                  height={13}
                />
                <span className="text-purple text-sm font-bold mt-1 mr-1">{formatPrice(price)}</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Image 
              src="/star.svg" 
              alt="Icone preço" 
              width={18}
              height={18}
            />
            <span className="text-sm font-bold text-text-secondary mt-1 mr-1">{stars}</span>
          </div>
        </div>
      </div>
    </div>
  )
}