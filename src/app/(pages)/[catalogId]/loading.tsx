import LoadingLayout from "@/components/loading-layout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <LoadingLayout>
      <main className="flex-grow md:min-w-[700px] md:mx-auto lg:min-w-[1280px]">
        <div className="flex flex-col py-6 px-4 bg-white">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Skeleton className="w-[450px] h-10 rounded-md" />
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 my-2">
              <Skeleton className="w-[100px] h-6 rounded-md" />

              <div className="w-1 h-1 bg-bg-gray rounded-full" />

              <Skeleton className="w-[100px] h-6 rounded-md" />

              <div className="w-1 h-1 bg-bg-gray rounded-full" />

              <Skeleton className="w-[100px] h-6 rounded-md" />
            </div>
            <div className="flex items-center my-2">
              <Skeleton className="w-[300px] h-6 rounded-md" />
            </div>
            <div className="flex items-center gap-1.5 mb-2">
              <Skeleton className="w-[300px] h-6 rounded-md" />
              <div className="w-1 h-1 bg-bg-gray rounded-full" />
              <Skeleton className="w-[450px] h-6 rounded-md" />
            </div>
          </div>
        </div>

        {Array.from({ length: 4 }).map((_, index) => (
          <Accordion key={index} type="single" collapsible>
            <AccordionItem value="drinks" className="px-4 py-3 bg-white mb-1">
              <AccordionTrigger className="hover:no-underline">
                <Skeleton className="w-[450px] h-6 rounded-md" />
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-2" />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </main>
    </LoadingLayout>
  )
}