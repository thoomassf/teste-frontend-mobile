import Image from 'next/image'

import Footer from "../../components/footer";
import Header from "../../components/header";
import RestaurantItem from "../../components/restaurant-item";

import data from "../../mocks/restaurants.json"

export const metadata = {
  title: 'Aiqfome | Restaurantes',
}

/**
 * Renders the home page of the restaurant application.
 * 
 * Displays two sections of restaurants:
 * - Open restaurants (not closed)
 * - Closed restaurants
 * 
 * Uses data from a local JSON mock to populate restaurant items.
 * Includes a responsive layout with a header, banner image, restaurant lists, and footer.
 * 
 * @returns {JSX.Element} The rendered home page component
 */
export default async function HomePage() {
  // await new Promise(resolve => setTimeout(resolve, 2000))

  return (
    <div className='min-h-screen flex flex-col'>
      <Header />

      <Image 
        src="/banner.png" 
        alt="Banner promoção de dias das crianças" 
        width={300}
        height={200}
        className="w-full lg:max-w-[1280px] lg:mx-auto h-auto object-contain"
      />
      <main className="flex-grow md:min-w-[700px] md:mx-auto lg:min-w-[1280px]">

        <h1 className="text-xl font-extrabold text-purple pl-4 pt-6 pb-4">abertos</h1>

        <div className='md:grid md:grid-cols-4 lg:grid-cols-3 gap-4'>
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
        </div>        

        <h1 className="text-xl font-extrabold text-purple pl-4 pt-8 pb-4">fechados</h1>

        <div className='md:grid md:grid-cols-4 lg:grid-cols-3 gap-4 mb-8'>
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
        </div>
      </main>
      
      <Footer />
    </div>
  )
}