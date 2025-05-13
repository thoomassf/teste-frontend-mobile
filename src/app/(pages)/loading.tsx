import LoadingLayout from "@/components/loading-layout";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

export default function Loading() {
  return (
    <LoadingLayout>
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
          {Array.from({ length: 9 }).map((_, index) => (
            <Skeleton key={index} className="h-[90px] w-[380px] rounded-md" />
          ))}
        </div>

        <h1 className="text-xl font-extrabold text-purple pl-4 pt-8 pb-4">fechados</h1>

        <div className='md:grid md:grid-cols-4 lg:grid-cols-3 gap-4 mb-8'>
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-[90px] w-[380px] rounded-md" />
          ))}
        </div>
      </main>
    </LoadingLayout>
  )
}