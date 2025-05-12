export interface OptionProps {
  id: string;
  name: string;
  description: string | null;
  sizes: {
    size: string;
    price: number;
  }[];
  sideDishes: {
    id: string;
    name: string;
    price: number;
  }[]
  drinkIncluded: boolean;
  cutlery: {
    id: string;
    name: string;
    price: number;
  }[]
  additionalRequest: {
    id: string;
    name: string;
    price: number;
  }[];
  price: number;
  promotion?: {
    from: number | null;
    to: number | null;
  };
  vegan: boolean;
  spicy: boolean;
}