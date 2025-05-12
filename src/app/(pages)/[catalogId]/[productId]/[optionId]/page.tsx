import Header from "@/components/header";
import { formatPrice } from "@/utils/format-price";

import data from "../../../../../mocks/restaurants.json"
import ItemForm from "./item-form";

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

      <img src="/products/ceviche.png" alt="ceviche" className="w-full" />

      <div className="flex flex-col gap-1">
        <div className="flex flex-col p-4 bg-white">
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
        <ItemForm 
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