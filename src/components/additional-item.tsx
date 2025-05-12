import { formatPrice } from "@/utils/format-price"

interface AdditionalItemProps {
  label: string
  additionalValue: number
  isChecked: boolean
  onToggle: () => void
}

export default function AdditionalItem({ 
  label, 
  additionalValue,
  isChecked,
  onToggle, 
}: AdditionalItemProps) {
  return (
    <div className="flex items-center gap-2">
      <input 
        type="checkbox" 
        name="checkbox-group"
        className="rounded-full" 
        checked={isChecked}
        onChange={onToggle}
        id={`checkbox-${label}`}
      />
      <div className="flex items-center justify-between w-full pr-4">
        <label htmlFor={`checkbox-${label}`} className="text-text-secondary text-sm lowercase">
          {label}
        </label>

        {additionalValue > 0 && (
          <span className="text-purple font-bold text-sm">
            +{formatPrice(additionalValue)}
          </span>
        )}
      </div>
    </div>
  )
}