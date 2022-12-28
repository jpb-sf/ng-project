import { ShoppingCartItem } from "./shopping-cart-item";

export class ShoppingCart {
  items: ShoppingCartItem[] = [];

  constructor(private itemsMap?: { [productId: string]: ShoppingCartItem }) 
  { 
    if (this.itemsMap)
    {
      for (let itemId in itemsMap)
      { 
        this.items.push(new ShoppingCartItem( { ...this.itemsMap[itemId], key: itemId }))
      }
    }
  }

  get productId(): string[]
  {
    return Object.keys(this.items);
  }
  
  getQuantity(productId: string) {
      
    if(this.itemsMap && this.itemsMap[productId])
    {
        let item = this.itemsMap[productId];
        return item ? item.quantity : 0;
    }
    else {
        return 0;
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