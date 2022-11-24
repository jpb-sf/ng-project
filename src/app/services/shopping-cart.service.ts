import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { ProductAndKey } from 'src/models/productAndKey';
import { Observable, take, map } from 'rxjs';
import { ShoppingCart } from 'src/models/shopping-cart';

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

  async addToCart(product: ProductAndKey)
  {
    this.updateItem(product, 1)
  }

  async subtractFromCart(product: ProductAndKey)
  {
    this.updateItem(product, -1)
  }

  private async updateItem(product: ProductAndKey, change: number)
  {
    // this is what is going into the DB
    // 
    console.log('updateItem')
    let cartId = await this.getOrCreateCartId();
    let item = await this.getItem(cartId, product.key)

    // I now have the correct Key to update. boom. 
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
