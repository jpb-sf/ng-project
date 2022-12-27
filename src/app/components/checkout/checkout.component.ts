import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCart } from 'src/models/shopping-cart';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Subscription } from 'rxjs';
import { NgForm} from '@angular/forms';
import { OrderService } from 'src/app/services/order.service';
 
@Component({
  selector: 'checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  cart: ShoppingCart = new ShoppingCart();
  subscription: Subscription = new Subscription();
  constructor(
    private router: Router,
    private cartService: ShoppingCartService,
    private orderService: OrderService) {}

  async ngOnInit() {
    this.subscription = (await this.cartService.getCart())
    .subscribe(cart => {
        this.cart = cart;
     });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  submit(f: NgForm) {
    let customer = f.value;
    this.orderService.createOrder(customer, this.cart)
    this.router.navigate(['order-success'])
  }
}
