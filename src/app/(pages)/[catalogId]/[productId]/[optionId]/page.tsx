import Image from "next/image";
import Header from "@/components/header";
import { formatPrice } from "@/utils/format-price";

import data from "../../../../../mocks/restaurants.json"
import OptionContent from "./option-content";

export const metadata = {
  title: 'Aiqfome | Produto',
}

/**
 * Renders a product page for a specific restaurant menu item option.
 * 
 * @param params - An object containing route parameters: catalogId, productId, and optionId
 * @returns A React component displaying product details and an item form
 * 
 * This page fetches and displays details for a specific product option from a restaurant's menu,
 * including the option name, price, description, and allows adding the item to an order.
 */
export default async function ProductPage({
  params,
}: {
  params: Promise<{ catalogId: string, productId: string, optionId: string }>
}) {
  const { catalogId, productId, optionId } = await params

  const restaurant = data.units.find(restaurant => restaurant.id === catalogId)
  const product =  restaurant?.menu.products.find(item => item.id === productId)
  const option = product?.options.find(item => item.id === optionId)

  if (!restaurant || !product || !option) {
    return <div>Restaurante não encontrado</div>
  }

  const productToAdd = {
    id: option.id,
    name: `${product.name} ${option.name}`,
    price: option.price,
    quantity: 1
  }

  return (
    <div className="bg-[#EEF0F5]">
      <Header />

      <Image 
        src="/products/ceviche.png" 
        alt="ceviche" 
        width={300}
        height={200}
        className="w-full lg:max-w-[1280px] lg:mx-auto h-auto object-contain"
      />

      <div className="flex flex-col gap-1">
        <div className="flex flex-col p-4 bg-white md:min-w-[700px] md:mx-auto lg:min-w-[1280px]">
          <div className="flex flex-col">         
            <h1 className="font-bold text-xl text-text-primary">{option.name}</h1>
            <div className="flex items-center gap-2">
              <p className="font-extrabold text-sm text-text-secondary">a partir de </p>
              <span className="text-purple font-extrabold text-lg">
                {formatPrice(option.price)}
              </span>
            </div>
            {option.description && (
              <p className="font-semibold text-sm text-text-secondary">
                {option.description}
              </p>
            )}
          </div>

        </div>
        <OptionContent 
          catalogId={catalogId}
          productToAdd={productToAdd}
          drinksOptions={restaurant.menu.drinks}
          optionId={optionId}
          option={option}
          initialPrice={option.price}
        />
      </div>
    </div>
  )
}