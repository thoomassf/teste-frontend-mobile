'use client'

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

interface DrinkItemProps {
  name: string
  price: number
}

export function DrinkItem({ name, price }: DrinkItemProps) {
  const [count, setCount] = useState(0)

  function handleIncrement() {
    setCount(count + 1)
  }

  function handleDecrement() {
    setCount(count - 1)
  }

  return (
    <div className="flex items-center justify-between pr-4 mb-3">
      <div className="flex">
        <div className="flex items-center gap-4 mr-2">
          <button 
            className={`rounded-full ${count === 0 ? 'bg-gray cursor-not-allowed' : 'border-water-green-500'}`}
            onClick={handleDecrement}
            disabled={count === 0}
          >
            <Minus className="size-4" />
          </button>

          <span className="font-bold text-sm text-text-primary">{count}</span>

          <button 
            className="border border-water-green-500 rounded-full" onClick={handleIncrement}
          >
            <Plus className="size-2 text-water-green-500 p-2" />
          </button>
        </div>

        <span className="font-semibold text-text-secondary text-sm lowercase">{name}</span>
      </div>

      <div className="flex">
        <span className="text-purple font-bold text-sm">+R$ {price},00  </span>
      </div>
    </div>
  )
}