'use client'

import { formatPrice } from "@/utils/format-price"
import AddTicket from "./components/add-ticket-button"
import type { Product } from "@/types/Product"
import ProductSizesGroup from "./components/product-size-group"
import SideDishesGroup from "./components/side-dishes-group"
import DrinksList from "@/components/drinks-list"
import CutleryGroup from "./components/cutlery-group"
import AdditionalItemsGroup from "./components/additional-items-group"
import type { OptionProps } from "@/types/Option"
import { Textarea } from "@/components/ui/textarea"
import ViewTicketFooter from "./components/view-ticket-footer"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface ItemFormProps {
  catalogId: string
  productToAdd: Product
  optionId: string
  option: OptionProps
  drinksOptions: {
    id: string
    name: string
    price: number
  }[]
  initialPrice: number
}

export default function ItemForm({
  catalogId,
  productToAdd,
  optionId,
  option,
  drinksOptions,
  initialPrice,
}: ItemFormProps) {
  const router = useRouter()

  const [sizeSelected, setSizeSelected] = useState<boolean>(false)
  const [sideDishesSelected, setSideDishesSelected] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleViewTicket = () => {
    if (!sizeSelected) {
      setErrorMessage("Item obrigatório")
      return
    }

    if (!sideDishesSelected) {
      setErrorMessage("Item obrigatório")
      return
    }

    router.push(`/${catalogId}/ticket`)
  }

  return (
    <div className="flex flex-col gap-1 md:min-w-[700px] md:mx-auto lg:min-w-[1280px]">
      <div className="flex items-center justify-between -mt-1 p-4 bg-white">
        <div>
          <h2 className="font-bold text-base text-text-primary">quantos?</h2>
          <div className="flex items-center gap-1">
            <p className="font-semibold text-sm text-text-secondary">a partir de </p>
            <span className="text-text-primary font-bold text-sm">
              {formatPrice(initialPrice)}
            </span>
          </div>
        </div>

        <AddTicket catalogId={catalogId} product={productToAdd} />
      </div>

      <ProductSizesGroup 
        catalogId={catalogId}
        productId={optionId}
        sizes={option.sizes}
        promotion={option.promotion}
        setIsSelected={setSizeSelected}
        isSelected={sizeSelected}
        errorMessage={errorMessage}
      />      

      <SideDishesGroup 
        catalogId={catalogId}
        productId={optionId}
        sideDishes={option.sideDishes}        
        setIsSelected={setSideDishesSelected}
        isSelected={sideDishesSelected}
        errorMessage={errorMessage}
      />

      <DrinksList 
        catalogId={catalogId}
        productId={optionId}
        drinks={drinksOptions} 
      />

      {option?.cutlery.length > 0 && (
        <CutleryGroup 
          catalogId={catalogId}
          productId={optionId}
          cutlery={option.cutlery}
        />
      )}

      <AdditionalItemsGroup 
        catalogId={catalogId}
        productId={optionId}
        additionalRequest={option.additionalRequest}           
      />

      <div className="bg-white py-6 px-4">
        <div className="flex flex-col items-center w-full border border-text-secondary rounded-md">
          <Textarea name="" id="" placeholder="Alguma observação do item? • opcional ex: tirar algum ingrediente, ponto do prato" />
        </div>
      </div>

      <ViewTicketFooter onClickViewTicket={handleViewTicket} />
    </div>
  )
}