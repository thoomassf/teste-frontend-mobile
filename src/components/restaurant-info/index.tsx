import { ChevronRight } from "lucide-react";

export default function RestaurantInfo() {
  return (
    <div className="flex flex-col py-6 px-4 bg-white">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <img src="/bk.svg" alt="Burger King" className="size-9" />
          <h1 className="text-xl font-extrabold text-text-tertiary">Burger King</h1>
        </div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex gap-6">
            <img src="/network-icon.svg" alt="Rating" className="size-4" />
            <img src="/heart-icon.svg" alt="Delivery" className="size-4" />
          </div>
          <div className="flex items-center gap-1">
            <span className="text-text-water-green text-xs font-bold">mais infos</span>
            <ChevronRight className="size-2 text-water-green-500" />
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 mb-2">
          <div className="flex gap-2 items-center">
            <img src="/bike2.svg" alt="Delivery" className="w-[18px] h-[13px]" />
            <span className="text-purple text-sm font-bold">R$ 4,99</span>
            <ChevronRight className="size-2 text-purple" />
          </div>

          <div className="w-1 h-1 bg-bg-gray rounded-full" />

          <p className="text-text-secondary font-bold text-xs">
            hoje, 30-40 min
          </p>

          <div className="w-1 h-1 bg-bg-gray rounded-full" />

          <p className="text-text-secondary font-bold text-xs">
            5.2km
          </p>
        </div>
        <div className="flex items-center justify-center bg-water-green-100 max-w-[200px] py-1.5 px-1 rounded-md mb-2">
          <p className="text-xs font-bold text-water-green-700">Entrega grátis acima de R$35,00</p>
        </div>
        <div className="flex items-center gap-1.5 mb-2">
          <div className="flex items-center gap-1.5">
            <img src="star.svg" className="size-3" />
            <span className="text-text-secondary font-bold text-xs">4.5 de 5</span>
            <ChevronRight className="size-2 text-text-secondary" />
          </div>
          <div className="w-1 h-1 bg-bg-gray rounded-full" />
          <div>
            <p className="text-green font-bold text-xs">fecha às 20:00</p>
          </div>
        </div>
        <p className="text-text-secondary font-bold text-xs">pedido mínimo: R$ 15,00</p>
      </div>
    </div>
  )
}