interface ViewTicketFooterProps {
  onClickViewTicket: () => void
}

/**
 * Footer component for displaying a ticket view section
 * @param {Object} props - Component properties
 * @param {() => void} props.onClickViewTicket - Callback function triggered when the "Ver Ticket" button is clicked
 * @returns {React.ReactElement} A footer with a message and a button to view ticket details
 */
export default function ViewTicketFooter({ onClickViewTicket }: ViewTicketFooterProps) {
  return (
    <footer className="flex flex-col items-center justify-center py-6 px-4 mt-auto text-purple-bold bg-bg-tertiary">
      <p className="text-sm font-bold mb-4">feito com 💜 em maringá-PR</p>
      <button 
        onClick={onClickViewTicket}
        className="px-6 mb-4 w-full h-[48px] rounded-md bg-purple text-white text-base cursor-pointer lg:w-[380px]"
      >
        Ver Ticket
      </button>
    </footer>
  )
}