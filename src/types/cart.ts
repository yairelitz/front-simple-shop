export interface CartResponse {
  success: boolean;
  data: Cart;
}

export interface Cart {
  _id: string;
  userId: string;
  sessionId: string;
  items: CartItem[];
  total: number;
  description?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  lockedPrice: number | null;
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
}
