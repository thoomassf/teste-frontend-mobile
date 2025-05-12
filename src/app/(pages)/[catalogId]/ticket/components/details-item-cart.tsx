import { formatPrice } from "@/utils/format-price"

interface DetailsItemCartProps {
  title: string
  items: {
    name: string
    price?: number
  }[]
}

/**
 * Renders a cart details section with a title and list of items.
 * 
 * @param {Object} props - The component props
 * @param {string} props.title - The title of the cart section
 * @param {Array<{name: string, price?: number}>} props.items - The list of items in the cart
 * @returns {React.ReactElement} A React component displaying cart item details
 */
export default function DetailsItemCart({
  title,
  items,
}: DetailsItemCartProps) {
  return (
    <div className="flex flex-col gap-1"> 
      <div className="flex items-center gap-2">
        <div className="w-1 h-1 bg-text-secondary rounded-full" />
        <p className="text-text-secondary text-xs font-bold lowercase">{title}</p>
      </div>
      
      {items.map((item, index) => (
        <div key={index} className="flex justify-between items-center gap-3">
          <p className="text-text-secondary text-xs font-semibold ml-3 lowercase">{item.name}</p>
          {item.price && (
            <span className="text-water-green-500 text-xs font-semibold">
              +{formatPrice(item.price)}
            </span>
          )}
        </div>
      ))}
    </div>
  )
}