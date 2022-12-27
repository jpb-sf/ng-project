import { ShoppingCartItem } from "./shopping-cart-item";
export interface Order {
  key?: string;
  customer: {
    name: string;
    addressFirst: string;
    addressSecond: string;
    city: string;
    id?: string;
  }
  order: {
    items: [ShoppingCartItem]
    date: string;
    time: string;
    totalPrice: number;
  }
}
