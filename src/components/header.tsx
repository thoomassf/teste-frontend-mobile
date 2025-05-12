import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <div className="w-full h-[72px] bg-purple flex flex-col">
      <div className="flex items-center justify-between p-4 gap-6 md:min-w-[700px] md:mx-auto lg:min-w-[1280px]">
        <div>
          <Link href="/" className="cursor-pointer">
            <Image 
              src="/logo.svg" 
              alt="Logo"
              width={32}
              height={32}
            />
          </Link>
        </div>
        
        <div className="flex flex-row gap-2.5 mr-10">
          <Image 
            src="/point-icon.svg" 
            alt="Ícone de mapa" 
            width={13}
            height={16}
          />
          <div className="flex flex-col gap-0.5 items-start md:flex-row md:items-center md:gap-2">
            <p className="text-sm font-bold text-purple-light">entregando em</p>
            <div className="flex gap-2">
              <p className="text-base font-bold text-white">Rua Mandaguari, 198</p>
              <button>
                <Image 
                  src="/chevron_right.svg" 
                  alt="Ícone seta para direita" 
                  width={6}
                  height={10}
                />
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-center mr-10">
          <button className="cursor-pointer">
            <Image 
              src="/person-icon.svg" 
              alt="Ícone de perfil"
              width={16}
              height={18}
            />
          </button>
        </div>
      </div>      
    </div>
  )
}