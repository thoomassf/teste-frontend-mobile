import { formatPrice } from "@/utils/format-price";

interface RadioOptionProps {
  id: string
  label: string
  value: number
  isChecked: boolean
  onToggle: () => void
  name?: string
  isAdditionalValue?: boolean
}

export default function RadioOptionComponent({ 
  id, 
  label, 
  value, 
  isChecked,
  onToggle, 
  name = "radio-size-group",
  isAdditionalValue = false
}: RadioOptionProps) {
  return (
    <div className="flex items-center gap-2">
      <input 
        type="radio" 
        name={name}
        className="rounded-full mr-1.5" 
        checked={isChecked}
        onChange={onToggle}
        id={`radio-${id}`}
      />
      <div className="flex items-center justify-between w-full pr-4">
        <div className="flex items-center gap-1.5">
          <label htmlFor={`radio-${id}`} className="text-text-secondary text-sm lowercase">
            {label}
          </label>
        </div>

        {value > 0 && (
          <span className="text-purple font-bold text-sm">
            {isAdditionalValue && (
              <span className="text-purple font-bold text-sm">+</span>
            )}
            {formatPrice(value)}
          </span>
        )}
      </div>
    </div>
  )
}