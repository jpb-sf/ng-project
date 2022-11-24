
export class ShoppingCartItem  {
  title: string;
  price: number;
  imageUrl: string;
  quantity: number;
  key: string;
  
  constructor(public item: any) {
    this.title = item.title;
    this.price = item.price;
    this.imageUrl = item.imageUrl;
    this.quantity = item.quantity;
    this.key = item.key
  }
  
  get itemPriceTotal(): number
  {
    if(this.price)
    {
      return this.price * this.quantity;
    }
    else
    return 0;
  }
}