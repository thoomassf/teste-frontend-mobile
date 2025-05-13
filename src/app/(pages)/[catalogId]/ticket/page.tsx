import Image from "next/image";

import Header from "@/components/header";
import TicketList from "./components/ticket-list";

import data from "../../../../mocks/restaurants.json"
import TicketFooter from "./components/ticket-footer";

export const metadata = {
  title: 'Aiqfome | Ticket',
}

/**
 * Renders the ticket page for a specific restaurant catalog
 * 
 * @param params - An object containing the catalogId for the selected restaurant
 * @returns A page displaying restaurant details, ticket list, and payment options
 */
export default async function TicketPage({
  params,
}: {
  params: Promise<{ catalogId: string }>
}) {
  const { catalogId } = await params

  /**
   * Finds the restaurant unit matching the given catalog ID from the available restaurant data
   * 
   * @returns The restaurant unit object or undefined if no matching restaurant is found
   */
  const restaurant = data.units.find(restaurant => restaurant.id === catalogId)

  if (!restaurant) {
    return <div>Restaurante não encontrado</div>
  }

  return (
    <div className="">
      <Header />

      <main className="flex flex-col py-6 px-4 md:w-[600px] md:mx-auto lg:w-[1200px]">
        <div className="flex gap-2">
          <Image 
            src={restaurant.logo} 
            alt={`${restaurant.name} - ${restaurant.unit}`}
            width={32}
            height={32}
          />
          <div className="flex flex-col gap-1">
            <p className="font-bold text-sm text-text-secondary">seus itens em</p>
            <h1 className="font-bold text-base text-text-tertiary">{restaurant.name} - {restaurant.unit}</h1>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <TicketList catalogId={catalogId} />
        </div>

        <TicketFooter />
      </main>
    </div>
  )
}