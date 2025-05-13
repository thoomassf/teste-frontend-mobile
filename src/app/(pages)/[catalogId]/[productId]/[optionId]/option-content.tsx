'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { formatPrice } from "@/utils/format-price"
import { Textarea } from "@/components/ui/textarea"
import AddTicket from "./components/add-ticket-button"
import ProductSizesGroup from "./components/product-size-group"
import SideDishesGroup from "./components/side-dishes-group"
import DrinksList from "@/components/drinks-list"
import CutleryGroup from "./components/cutlery-group"
import AdditionalItemsGroup from "./components/additional-items-group"
import ViewTicketFooter from "./components/view-ticket-footer"
import type { OptionProps } from "@/types/Option"
import type { Product } from "@/types/Product"
import { useTicket } from "@/contexts/ticketContext"

interface OptionContentProps {
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

export default function OptionContent({
  catalogId,
  productToAdd,
  optionId,
  option,
  drinksOptions,
  initialPrice,
}: OptionContentProps) {
  const router = useRouter()
  const { addToTicket } = useTicket()

  const [observation, setObservation] = useState<string>('')
  const [sizeSelected, setSizeSelected] = useState<boolean>(false)
  const [sideDishesSelected, setSideDishesSelected] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleObservationChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newObservation = e.target.value
    setObservation(newObservation)

    addToTicket(catalogId, productToAdd, {
      observation: newObservation,
      parentProductId: optionId
    })
  }

  const handleViewTicket = () => {
    if (!sizeSelected || !sideDishesSelected) {
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
        isDetailsProduct
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
          <Textarea 
            placeholder="Alguma observação do item? • opcional ex: tirar algum ingrediente, ponto do prato" 
            value={observation}
            onChange={handleObservationChange}
          />
        </div>
      </div>

      <ViewTicketFooter onClickViewTicket={handleViewTicket} />
    </div>
  )
}