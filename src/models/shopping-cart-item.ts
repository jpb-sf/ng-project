import { Product } from "./product";
import { ProductAndKey } from "./productAndKey";

export class ShoppingCartItem {
  constructor(public product: ProductAndKey, public quantity:number) { }
  key?: string;
  get itemPriceTotal(): number
  {
    if(this.product.price)
    {
      return this.product.price * this.quantity;
    }
    else
    return 0;
  }
}