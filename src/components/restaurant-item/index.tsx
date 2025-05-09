interface RestaurantItemProps {
  title: string
  img: string
  price: string
  stars: number
  isClosed?: boolean
}

export default function RestaurantItem({ title, img, price, stars }: RestaurantItemProps) {
  return (
    <div className="flex gap-3 bg-bg-secondary mx-4 rounded-lg mb-4">
      <img src={img} alt="Burguer King" className="size-[92px]" />

      <div className="flex flex-col justify-center">
        <h2 className="text-base font-bold text-text-primary">{title}</h2>
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-2">
            <img src="/price-icon.svg" alt="Icone preço" className="size-[18px]" />
            <span className="text-purple text-sm font-bold">{price}</span>
          </div>
          <div className="flex items-center gap-2">
            <img src="/star.svg" alt="Icone preço" />
            <span className="text-sm font-bold text-text-secondary">{stars}</span>
          </div>
        </div>
      </div>
    </div>
  )
}