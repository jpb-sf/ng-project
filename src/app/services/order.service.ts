import { Injectable } from '@angular/core';
import { AngularFireDatabase, QueryFn } from '@angular/fire/compat/database';
import { ShoppingCart } from 'src/models/shopping-cart';
import { Order } from 'src/models/order';
import { ShoppingCartService } from './shopping-cart.service';
import { Observable, map, of } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(
    private db: AngularFireDatabase,
    private cartService: ShoppingCartService, 
    private authService: AuthService
  ) { }
  
  async createOrder(shipping: {}, order: ShoppingCart)
  {
    let user = this.authService.user;
    if (user)
    {
      let result = await this.db.list('/orders/')
      .push({
          datePlaced: new Date().getTime(),
          userId: user.uid, 
          shipping: shipping,
          order: {
            items: order.items,
            totalPrice: order.priceTotal
          }
      })
      this.cartService.clearCart();
      await this.cartService.deleteCart();
      this.cartService.getCart();
      return result
    }
    console.log('Something went wrong placing the order')
    return;
  }
  
  getOrder(key: string)
  {
    return this.db.object('orders/' + key).snapshotChanges()
    .pipe(
      map((action:any) => {
        const data = action.payload.val();
        return {orderId: key, ...data};
      })
    )
  }
  
  getAll(): Observable<Order[]>
  {
    return this.db.list('/orders/').snapshotChanges()
    .pipe(
      map((orders:any) => {
        return orders.map((o:any) => {
          const data = o.payload.val();
          const orderId = o.key;
          return {orderId: orderId, ...data}
        })}
      )
    ) as Observable<Order[]>
  }

  getAllByUser(): Observable<Order[]> 
  {
    const user = this.authService.user;
    if (user)
    {
      return this.db.list('/orders/',
        ref => ref.orderByChild('userId').equalTo(user.uid)
    ).snapshotChanges()
      .pipe(
        map((orders:any) => {
          return orders.map((o:any) => {
            const data = o.payload.val();
            const orderKey = o.key;
            return { orderId: orderKey, ...data}
          })
        }) 
      )
    }
    return of() as Observable<Order[]>
  }

//   private modifyCartItemsforOrder(order: ShoppingCart)
//   {
//     let items = [];
//     for (let item of order.items)
//     {
//         // remove imageUrl
//       const { imageUrl, ...rest } = item;
//       items.push(rest);
//     }
//     return items;
//   }
}
