import { ShoppingCartItem } from "./shopping-cart-item";

export class ShoppingCart {
  items: ShoppingCartItem[] = [];
  priceTotal?: number

  constructor(public itemsMap: { [productId: string]: ShoppingCartItem }) 
  { 
    this.priceTotal = 0;
    for (let itemId in itemsMap)
    { 
      let item = this.itemsMap[itemId];
      item.key = itemId;
      let shoppingCartItem = 
      new ShoppingCartItem(item)
      this.priceTotal += shoppingCartItem.itemPriceTotal;
      this.items.push(shoppingCartItem)
    }
  }

  getQuantity(productId: string) {
    if(this.itemsMap[productId])
    {
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