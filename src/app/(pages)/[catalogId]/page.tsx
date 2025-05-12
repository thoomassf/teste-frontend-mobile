import CatalogItem from "@/components/catalog-item";
import Footer from "@/components/footer";
import Header from "@/components/header";
import RestaurantInfo from "@/components/restaurant-info";

import data from "../../../mocks/restaurants.json"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import DrinksList from "@/components/drinks-list";
import Item from "@/components/catalog-item/item";

export default async function CatalogPage({
  params,
}: {
  params: Promise<{ catalogId: string }>
}) {
  const { catalogId } = await params

  const restaurant = data.units.find(restaurant => restaurant.id === catalogId)

  if (!restaurant) {
    return <div>Restaurante não encontrado</div>
  }

  return (
    <div className="className='min-h-screen flex flex-col bg-[#EEF0F5]">
      <Header />
      
      <main className="flex-grow">
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