import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart';
import { NgForm} from '@angular/forms';
import { OrderService } from 'shared/services/order.service';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.scss']
})
export class ShippingFormComponent {
  @Input('cart') cart!: ShoppingCart;

  constructor( private router: Router, private orderService: OrderService) {}

  submit(f: NgForm) {
    let customer = f.value;
    this.orderService.createOrder(customer, this.cart)
    this.router.navigate(['order-success'])
  }
}


