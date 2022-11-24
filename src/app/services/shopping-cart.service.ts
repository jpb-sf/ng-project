import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { ProductAndKey } from 'src/models/productAndKey';
import { Observable, take, map } from 'rxjs';
import { ShoppingCart } from 'src/models/shopping-cart';
import { ShoppingCartItem } from 'src/models/shopping-cart-item';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private createCart()
  {
    return this.db.list('/shopping-carts/')
    .push({ dateCreated: new Date().getTime() })
  }

  async getCart(): Promise<Observable<ShoppingCart>>
  {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('shopping-carts/' + cartId)
    .valueChanges()
    .pipe(
        map((x:any) => {
          console.log('x is: ')
          console.log(x)
          return new ShoppingCart(x.items)
        })
    )
  }

  private async getItem(cartId: any, productId: any)
  { 
    return this.db.object('shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId()
  {
    let cartId = localStorage.getItem('cartId');
    // TODO, check if cartId exists in DB
    console.log(cartId)
    if (cartId) return cartId
    let result = await this.createCart();
    localStorage.setItem('cartId', result.key!)
    return result.key;
  }

  async addToCart(product: ProductAndKey | ShoppingCartItem)
  {
    this.updateItem(product, 1)
  }

  async subtractFromCart(product: ProductAndKey | ShoppingCartItem)
  {
    this.updateItem(product, -1)
  }

  private async updateItem(product: ShoppingCartItem | ProductAndKey, change: number)
  {
    let cartId = await this.getOrCreateCartId();
    console.log(product.key)
    console.log('oh hey')
    let item = await this.getItem(cartId, product.key);
    item.valueChanges()
    .pipe(
      take(1)
    ).subscribe((result: any) => {
      item.update({
        'title': product.title,
        'price': product.price,
        'imageUrl': product.imageUrl,
        'quantity': (result?.quantity || 0) + change })
    })
  }

}
