import { ProductAndKey } from "./productAndKey";
import { ShoppingCartItem } from "./shopping-cart-item";

export class ShoppingCart {
  items: ShoppingCartItem[] = [];
  priceTotal?: number
  constructor(public itemsMap: { [productId: string]: ShoppingCartItem }) 
  { 
    this.priceTotal = 0;
    for (let productId in itemsMap)
    { 
      let product = this.itemsMap[productId].product;
      product.key = "productId";
      let item = new ShoppingCartItem(product, this.itemsMap[productId].quantity)
      this.priceTotal += item.itemPriceTotal;
      this.items.push(item)
    }
  }

  getQuantity(productId: string) {
    console.log('hello one')
    if(this.itemsMap)
    {
      console.log('hello two')
      console.log(productId)
      let item = this.itemsMap[productId];
      console.log(`item quantity is ${item.quantity}`);
      return item ? item.quantity : 0;
    }
    else {
      return 0;
    }
   
  }

  get productId(): string[]
  {
    return Object.keys(this.items);
  }
    
  get totalItemsCount() 
  {
    let count = 0;
    for (let item of this.items)
    { 
      count += item.quantity;
    }
    return count;
  }
}