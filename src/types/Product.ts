export type BaseProduct = {
  id: string
  name: string
  price: number
  quantity: number
}

export type Product = {
  id: string
  name: string
  price: number
  quantity: number
  additionalItems?: BaseProduct[]
  drinks?: BaseProduct[]
  cutlery?: BaseProduct[]
  sideDishes?: BaseProduct[]
}