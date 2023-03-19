import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Subscription } from 'rxjs';
import { NgForm} from '@angular/forms';
import { OrderService } from 'shared/services/order.service';
import { DisplayLoginService } from 'shared/services/display-login.service';
 
@Component({
  selector: 'checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  cart: ShoppingCart = new ShoppingCart();
  subscription: Subscription = new Subscription();
  address: string = '';
  displayLogin: boolean = false; 
  locationOfLogin: string = ''; 

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cartService: ShoppingCartService,
    private orderService: OrderService,
    private displayLoginService: DisplayLoginService) 
    {
        this.address = this.route.snapshot.url.join('/');
        console.log(`baseroute is ${this.address}`);
    }

  async ngOnInit() {
    this.subscription = (await this.cartService.getCart())
    .subscribe(cart => {
        this.cart = cart;
     });

     this.displayLoginService.displayLogin$
     .subscribe((display: any) => {
        this.displayLogin = display.display;
        this.locationOfLogin = display.location;
     })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  submit(f: NgForm) {
    let customer = f.value;
    this.orderService.createOrder(customer, this.cart)
    this.router.navigate(['order-success'])
  }

  showLogin()
  {
    this.displayLoginService._setDisplayLogin();
  }
}
