export default function Header() {
  return (
    <div className="w-full h-[72px] bg-purple flex flex-col">
      <div className="flex items-center justify-between p-4 gap-6">
        <div>
          <img src="/logo.svg" alt="Logo" />
        </div>
        
        <div className="flex flex-row gap-2.5 mr-10">
          <img src="/point-icon.svg" alt="Logo" />
          <div className="flex flex-col gap-0.5 items-start">
            <p className="text-sm font-bold text-purple-light">entregando em</p>
            <div className="flex gap-2">
              <p className="text-base font-bold text-white">Rua Mandaguari, 198</p>
              <button>
                <img src="/chevron_right.svg" alt="Logo" />            
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-center mr-10">
          <button className="pointer">
            <img src="/person-icon.svg" alt="Logo" className="size-6" />
          </button>
        </div>
      </div>      
    </div>
  )
}