
export class ShoppingCartItem  {
  title!: string;
  price!: number;
  imageUrl!: string;
  quantity!: number;
  key!: string;
  
  constructor(init?: Partial<ShoppingCartItem>) {
    Object.assign(this, init)
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