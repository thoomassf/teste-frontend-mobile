import SubTotalLabel from "./sub-total-label";

export default function TicketFooter() {
  return (
    <div className="absolute bottom-0 w-full bg-white border-t-2 rounded-md z-50 py-4 px-6 flex flex-row items-center justify-center gap-3 md:px-10 md:max-w-[700px] md:mx-auto lg:max-w-[1200px]">
      <div className="">
        <h4 className="font-bold text-text-tertiary text-xs uppercase tracking-wide">subtotal</h4>
        <SubTotalLabel />
      </div>

      <button className="text-white font-bold bg-purple px-10 py-4 rounded-md hover:bg-purple/90 transition-colors cursor-pointer">
        ir para pagamento
      </button>
    </div>
  )
}