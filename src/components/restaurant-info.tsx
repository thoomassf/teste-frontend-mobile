import Image from "next/image";
import { ChevronRight } from "lucide-react";

import { formatPrice } from "@/utils/format-price";

interface RestaurantInfoProps {
  name: string
  unit?: string
  logo: string
  shippingPrice: number
  stars: number
  distance: number
  minimumOrder: number
  closingTime: string
  estimatedTime: string
  freeShippingValue: number
  isFreeShipping: boolean
}

/**
 * Renders detailed information about a restaurant, including its name, image, delivery details, 
 * shipping costs, rating, and operational information.
 * 
 * @param {RestaurantInfoProps} props - The properties containing restaurant details
 * @returns {JSX.Element} A React component displaying comprehensive restaurant information
 */
export default function RestaurantInfo({
  name,
  unit,
  logo,
  shippingPrice,
  stars,
  distance,
  minimumOrder,
  closingTime,
  freeShippingValue,
  estimatedTime,
  isFreeShipping,
}: RestaurantInfoProps) {
  
  /**
   * Formats a delivery time string into a range of minutes.
   * 
   * @param {string} time - The original delivery time string containing minutes.
   * @returns {string} A formatted time range (e.g., "20-30min") or the original string if no minutes are found.
   */
  function formatDeliveryTime(time: string): string {
    const match = time.match(/\d+/);
    if (!match) return time;

    const minutes = parseInt(match[0]);
    const step = 10;

    const start = Math.floor(minutes / step) * step;
    const end = start + step;

    return `${start}-${end}min`;
  }

  return (
    <div className="flex flex-col py-6 px-4 bg-white">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Image src={logo} alt={`${name} - ${unit}`} width={36} height={36} />
          <h1 className="text-xl font-extrabold text-text-tertiary">{name} - {unit}</h1>
        </div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex gap-6">
            <Image src="/network-icon.svg" alt="Rating" width={16} height={18} />
            <Image src="/heart-icon.svg" alt="Delivery" width={18} height={16} />
          </div>
          <div className="flex items-center gap-1">
            <span className="text-water-green-500 text-xs font-bold">mais infos</span>
            <ChevronRight className="size-2 text-water-green-500" />
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 mb-2">
          <div className="flex gap-2 items-center">
            {isFreeShipping ? (
              <>
                <Image src="/bike.svg" alt="Delivery" width={18} height={13} />
                <span className="text-water-green-700 text-sm font-bold">
                  grátis
                </span>
                <ChevronRight className="size-2 text-purple" />
              </>
            ) : (
              <>
                <Image src="/bike2.svg" alt="Delivery" width={18} height={13} />
                <span className="text-purple text-sm font-bold">
                  {formatPrice(shippingPrice)}
                </span>
                <ChevronRight className="size-2 text-purple" />
              </>
            )}
          </div>

          <div className="w-1 h-1 bg-bg-gray rounded-full" />

          <p className="text-text-secondary font-bold text-xs">
            hoje, {formatDeliveryTime(estimatedTime)}
          </p>

          <div className="w-1 h-1 bg-bg-gray rounded-full" />

          <p className="text-text-secondary font-bold text-xs">
            {distance} km
          </p>
        </div>
        <div className="flex items-center justify-center bg-water-green-100 max-w-[200px] py-1.5 px-1 rounded-md mb-2">
          <p className="text-xs font-bold text-water-green-700">
            Entrega grátis acima de {formatPrice(freeShippingValue)}
          </p>
        </div>
        <div className="flex items-center gap-1.5 mb-2">
          <div className="flex items-center gap-1.5">
            <Image src="star.svg" alt="Avaliação" width={12} height={12} />
            <span className="text-text-secondary font-bold text-xs">{stars} de 5</span>
            <ChevronRight className="size-2 text-text-secondary" />
          </div>
          <div className="w-1 h-1 bg-bg-gray rounded-full" />
          <div>
            <p className="text-green font-bold text-xs">fecha às {closingTime}</p>
          </div>
        </div>
        <p className="text-text-secondary font-bold text-xs">
          pedido mínimo: {formatPrice(minimumOrder)}
        </p>
      </div>
    </div>
  )
}