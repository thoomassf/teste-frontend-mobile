interface ItemLayoutProps {
  title: string
  description: string
  children: React.ReactNode
  isRequired?: boolean
  errorMessage?: string
}

export default function ItemLayout({ 
  title, 
  description, 
  children, 
  isRequired = false,
  errorMessage,
}: ItemLayoutProps) {
  return (
    <div className="bg-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-start">
          <h2 className="font-bold text-text-tertiary text-base lowercase">{title}</h2>
          <p className="font-bold text-xs text-text-secondary mb-4">{description}</p>
        </div>

        {isRequired && (
          <div className="flex items-center gap-3">
            {errorMessage && (
              <p className="text-red-500 text-sm font-bold mb-4">
                {errorMessage}
              </p>
            )}
            <button className="bg-text-primary py-2 px-2.5 rounded-md text-white font-bold text-sm cursor-pointer lowercase mb-4">
              obrigatório
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4 my-2">
        {children}
      </div>    
    </div>
  )
}