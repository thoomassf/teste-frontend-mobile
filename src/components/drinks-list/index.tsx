'use client'

import { useTicket } from "@/contexts/ticketContext"
import { DrinkItem } from "./drink-item"
import { useEffect, useState } from "react"

interface DrinkItemProps {
  id: string
  name: string
  price: number
}

interface DrinkListProps {
  catalogId: string
  productId?: string
  drinks: DrinkItemProps[]
  isDetailsProduct?: boolean
}

export default function DrinksList({ 
  drinks, 
  catalogId, 
  productId,
  isDetailsProduct = false
}: DrinkListProps) {
  const { ticket, addToTicket, removeFromTicket } = useTicket()
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({})

  useEffect(() => {
    const catalog = ticket.find(t => t.catalogId === catalogId)
    const product = catalog?.products.find(p => p.id === productId)
    
    const newQuantities: { [key: string]: number } = {}
    product?.drinks?.forEach(drink => {
      newQuantities[drink.id] = (newQuantities[drink.id] || 0) + drink.quantity
    })
    
    setQuantities(newQuantities)
  }, [ticket, catalogId, productId])

  const handleIncrement = (drinkId: string) => {
    const drink = drinks.find(d => d.id === drinkId)
    if (!drink) return

    addToTicket(catalogId, {
      ...drink,
      quantity: 1,
    }, {
      isDrink: productId ? true : false,
      parentProductId: productId ?? '',
    })
  }

  const handleDecrement = (drinkId: string) => {
    removeFromTicket(drinkId)
  }

  return (
    <div className={`bg-white` + (isDetailsProduct ? ' p-4' : '')}>
      <h2 className="font-bold text-text-tertiary text-base">vai querer bebida ?</h2>
      <p className="font-bold text-xs text-text-secondary mb-4">escolha quantos quiser</p>

      {drinks.map(drink => (
        <DrinkItem 
          key={drink.id} 
          id={drink.id} 
          name={drink.name} 
          price={drink.price} 
          count={quantities[drink.id] || 0}
          onIncrement={() => handleIncrement(drink.id)}
          onDecrement={() => handleDecrement(drink.id)}
        />
      ))}
    </div>
  )
}