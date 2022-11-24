import { ProductAndKey } from "./productAndKey";
import { ShoppingCartItem } from "./shopping-cart-item";

export class ShoppingCart {
  items: ShoppingCartItem[] = [];
  priceTotal?: number
  // right now the getCart() build this object
  // right now a key is  stored in db -- shopping-cart: { product: { key: hu4df68Rdf
  // Important: not using that ' db product: { key ' to build this object's key value
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