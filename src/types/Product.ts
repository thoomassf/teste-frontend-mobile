export type BaseProduct = {
  id: string
  name: string
  price: number
  quantity: number
}

export type Product = BaseProduct & {
  observation?: string
  additionalItems?: BaseProduct[]
  drinks?: BaseProduct[]
  cutlery?: BaseProduct[]
  sideDishes?: BaseProduct[]
}