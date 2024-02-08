export interface Product {
  id: string;
  name: string;
  description: string;
  ingredients: string;
  qty: number;
  price: number;
  photo: string;
  categories?: Category[];
  categoryIds: string[];
}

export interface Category {
  id: string;
  name: string;
}

export interface ProductCardProps {
  product: Product;
}
