import { TicketProvider } from "@/providers/ticketProvider"

export default function CatalogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <TicketProvider>
      {children}
    </TicketProvider>
  )
}