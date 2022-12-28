import { ShoppingCartItem } from "./shopping-cart-item";
export interface Order {
  orderId?: string;
  datePlaced: string,
  userId: string,
  shipping: {
    name: string;
    addressFirst: string;
    addressSecond: string;
    city: string;
  }
  order: {
    items: [ShoppingCartItem]
    totalPrice: number;
  }
}
