import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { DateTimeService } from './date-time.service';
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
    private dateService: DateTimeService,
    private cartService: ShoppingCartService, 
    private authService: AuthService
  ) { }
  
  async createOrder(customer: {}, order: ShoppingCart)
  {
    let items = this.modifyCartItemsforOrder(order);
    let user = this.authService.user;
    console.log('user is')
    console.log(user)
    if (user)
    {
      let result = await this.db.list('/orders/')
      .push({
          customer: { ...customer, id: user.uid },
          order: {
            date: this.dateService.getDate,
            time: this.dateService.getTime,
            items: items,
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
        console.log({key: key, ...data})
        return {key: key, ...data};
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
          const id = o.key;
          return {key: id, ...data}
        })}
      )
    ) as Observable<Order[]>
  }

  getAllMyOrders(): Observable<Order[]> 
  {
    console.log('welcome to getAllMyOrders')
    const user = this.authService.user;
    console.log(user)
    if (user)
    {
      return this.db.list('/orders/').snapshotChanges()
      .pipe(
        map((orders:any) => {
          return orders.filter((o:any) => {
            const userId = o.payload.val().customer.id;
            if (user.uid === userId)
            {
                return true;
            }
            else {
                return false;
            }
          }).map((o:any) => {
            const data = o.payload.val();
            const orderId = o.key;
            return { key: orderId, ...data}
        })
      })
      ) as Observable<Order[]>
    }
    return of() as Observable<Order[]>
  }

  private modifyCartItemsforOrder(order: ShoppingCart)
  {
    let items = [];
    for (let item of order.items)
    {
      const { imageUrl, ...rest } = item;
      items.push(rest);
    }
    return items;
  }
}
