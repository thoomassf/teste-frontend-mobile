import { Minus, Plus } from "lucide-react";
import { formatPrice } from "@/utils/format-price";

interface DrinkItemProps {
  id: string
  name: string
  price: number
  count: number
  onIncrement: () => void
  onDecrement: () => void
}

export function DrinkItem({ 
  id, 
  name, 
  price, 
  count,
  onIncrement,
  onDecrement, 
}: DrinkItemProps) {
  return (
    <div key={id} className="flex items-center justify-between mb-3">
      <div className="flex">
        <div className="flex items-center gap-4 mr-2">
          <button
            className={`w-5 h-5 flex items-center justify-center rounded-full border ${
              count === 0 ? 'bg-[#EEF0F5] text-[#A8ADB7] cursor-not-allowed' : 'border-water-green-500 text-water-green-500 cursor-pointer'
            }`}
            onClick={onDecrement}
            disabled={count === 0}
          >
            <Minus className="size-3" />
          </button>

          <span className="font-bold text-sm text-text-primary">{count}</span>

          <button 
            className="w-5 h-5 flex items-center justify-center border border-water-green-500 rounded-full text-water-green-500 cursor-pointer" 
            onClick={onIncrement}
          >
            <Plus className="size-3" />
          </button>
        </div>

        <span className="font-semibold text-text-secondary text-sm lowercase">{name}</span>
      </div>

      <div className="flex">
        <span className="text-purple font-bold text-sm">+{formatPrice(price)}</span>
      </div>
    </div>
  )
}