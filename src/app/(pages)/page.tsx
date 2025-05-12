import Image from 'next/image'

import Footer from "../../components/footer";
import Header from "../../components/header";
import RestaurantItem from "../../components/restaurant-item";

import data from "../../mocks/restaurants.json"

export default async function HomePage() {
  return (
    <div className='min-h-screen flex flex-col'>
      <Header />

      <main className="flex-grow">
        <Image 
          src="/banner.png" 
          alt="Banner promoção de dias das crianças" 
          width={300}
          height={200}
          className="w-full"
        />

        <h1 className="text-xl font-extrabold text-purple pl-4 pt-6 pb-4">abertos</h1>

        {data.units.filter(unit => !unit.isClosed).map((unit) => (
          <RestaurantItem 
            key={unit.id} 
            id={unit.id}
            title={unit.name} 
            unit={unit.unit}
            img={unit.logo} 
            price={unit.shippingPrice} 
            stars={unit.classification}
            isClosed={unit.isClosed}
            isFreeShipping={unit.isFreeShipping}
          />
        ))}      

        <h1 className="text-xl font-extrabold text-purple pl-4 pt-8 pb-4">fechados</h1>

        {data.units.filter(unit => unit.isClosed).map((unit) => (
          <RestaurantItem
            key={unit.id}
            id={unit.id}
            title={unit.name} 
            unit={unit.unit}
            img={unit.logo} 
            price={unit.shippingPrice} 
            stars={unit.classification}
            isClosed={unit.isClosed}
            isFreeShipping={unit.isFreeShipping}
          />
        ))}
      </main>
      
      <Footer />
    </div>
  )
}