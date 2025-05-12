import Image from "next/image"
import { formatPrice } from "@/utils/format-price"

interface RadioOptionProps {
  id: string
  label: string
  additionalValue: number
  fixedValue: number
  isChecked: boolean
  onToggle: () => void
  name?: string
}

/**
 * Renders a radio option component with a label, price details, and toggle functionality.
 * 
 * @param {RadioOptionProps} props - The properties for the radio option.
 * @param {string} props.id - Unique identifier for the radio option.
 * @param {string} props.label - Label text for the radio option.
 * @param {number} props.additionalValue - The promotional or selected price value.
 * @param {number} props.fixedValue - The original price value.
 * @param {boolean} props.isChecked - Indicates whether the radio option is currently selected.
 * @param {() => void} props.onToggle - Callback function triggered when the radio option is toggled.
 * @param {string} [props.name='radio-size-group'] - Name attribute for the radio input group.
 * @returns {JSX.Element} A radio option component with price and label details.
 */
export default function RadioOptionPromotion({
  id,
  label,
  additionalValue,
  fixedValue,
  isChecked,
  onToggle,
  name = "radio-size-group",
}: RadioOptionProps) {
  return (
    <div className="flex items-center gap-2">
      <input 
        id={`radio-${id}`}
        name={name}
        type="radio" 
        className="rounded-full mr-1.5" 
        onChange={onToggle}
        checked={isChecked}
      />
      <div className="flex items-center justify-between w-full pr-4">
        <div className="flex items-center gap-1.5">
          <Image 
            src="/expense.svg" 
            alt="Ícone de valor"
            width={18}  
            height={18}  
          />
          <label htmlFor="" className="text-text-secondary text-sm lowercase">
            {label}
          </label>
        </div>

        <span className="text-sm">
          <span className="text-text-secondary text-xs mr-1">
            de {formatPrice(fixedValue)} por
          </span>
          <span className="text-green text-sm font-bold">
            {additionalValue}
          </span>
        </span>
      </div>
    </div>
  )
}