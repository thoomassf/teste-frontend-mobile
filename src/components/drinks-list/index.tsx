import { DrinkItem } from "./drink-item"

export default function DrinksList() {
  return (
    <div className="bg-white p-4">
      <h2 className="font-bold text-text-tertiary text-base">vai querer bebida ?</h2>
      <p className="font-bold text-xs text-text-secondary mb-4">escolha quantos quiser</p>

      <DrinkItem name="coca-cola" price={5} />
      <DrinkItem name="fanta laranja" price={5} />
      <DrinkItem name="guaraná antarctica" price={5} />
      <DrinkItem name="suco prats laranja" price={6} />
      <DrinkItem name="água sem gás" price={3} />
    </div>
  )
}