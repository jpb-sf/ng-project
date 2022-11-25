import { ShoppingCartItem } from "./shopping-cart-item";

export class ShoppingCart {
  items: ShoppingCartItem[] = [];

  constructor(public itemsMap?: { [productId: string]: ShoppingCartItem }) 
  { 
    if (this.itemsMap)
    {
      for (let itemId in itemsMap)
      { 
          this.items.push(new ShoppingCartItem( { ...this.itemsMap[itemId], key: itemId }))
      }
    }
  }

  get priceTotal() 
  {
    let total = 0;
    for (let item of this.items)
    {
        total += item.itemPriceTotal;
    }
    return total;
  }

  getQuantity(productId: string) {

    if(this.itemsMap && this.itemsMap[productId])
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