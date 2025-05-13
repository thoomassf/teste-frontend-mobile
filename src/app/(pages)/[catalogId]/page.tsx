import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import CatalogItem from "@/components/catalog-item";
import Footer from "@/components/footer";
import Header from "@/components/header";
import RestaurantInfo from "@/components/restaurant-info";
import DrinksList from "@/components/drinks-list";
import Item from "@/components/catalog-item/item";

import data from "../../../mocks/restaurants.json"

export const metadata = {
  title: 'Aiqfome | Catálogo',
}

/**
 * Renders the catalog page for a specific restaurant.
 * 
 * @param params - An object containing the restaurant's catalog ID
 * @returns A React component displaying the restaurant's details, menu, drinks, and desserts
 * @throws Renders a "Restaurant not found" message if the restaurant doesn't exist
 */
export default async function CatalogPage({
  params,
}: {
  params: Promise<{ catalogId: string }>
}) {
  // await new Promise(resolve => setTimeout(resolve, 2000))
  
  const { catalogId } = await params

  const restaurant = data.units.find(restaurant => restaurant.id === catalogId)

  if (!restaurant) {
    return <div>Restaurante não encontrado</div>
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#EEF0F5]">
      <Header />
      
      <main className="flex-grow md:min-w-[700px] md:mx-auto lg:min-w-[1280px]">
        <RestaurantInfo 
          name={restaurant.name}
          unit={restaurant.unit}
          logo={restaurant.logo}
          shippingPrice={restaurant.shippingPrice}
          stars={restaurant.classification}
          distance={restaurant.distance}
          minimumOrder={restaurant.minimumOrderValue}
          closingTime={restaurant.closingTime}
          freeShippingValue={restaurant.minimumValorFreeShipping}
          estimatedTime={restaurant.estimatedTime}
          isFreeShipping={restaurant.isFreeShipping}
        />

        {restaurant?.menu.products.map(catalog => (
          <CatalogItem
            key={catalog.id}
            catalogId={restaurant.id}
            productId={catalog.id}
            title={catalog.name}
            description={catalog.description ?? ''}
            options={catalog.options}
          />
        ))}

        {restaurant?.menu.drinks.length > 0 && (
          <Accordion type="single" collapsible>
            <AccordionItem value="drinks" className="px-4 py-3 bg-white mb-1">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex flex-col gap-1">
                  <h2 className="text-base font-bold text-text-tertiary">Bebidas</h2>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <DrinksList
                  catalogId={restaurant.id}
                  drinks={restaurant.menu.drinks.map((drink) => ({
                    id: drink.id,
                    name: drink.name,
                    price: drink.price,
                  }))}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}

        {restaurant?.menu.desserts.length > 0 && (
          <Accordion type="single" collapsible>
            <AccordionItem value="drinks" className="px-4 py-3 bg-white mb-1">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex flex-col gap-1">
                  <h2 className="text-base font-bold text-text-tertiary">Sobremesas</h2>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                {restaurant.menu.desserts.map(option => (
                  <Item
                    key={option.id}
                    catalogId={restaurant.id}
                    productId={option.id}
                    id={option.id}
                    title={option.name}
                    price={option.price}
                    isDessert
                  />
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </main>

      <Footer />
    </div>
  )
}