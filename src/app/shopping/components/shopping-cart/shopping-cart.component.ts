import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { ResponsiveService } from 'shared/services/responsive.service';

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  cart$?: Observable<ShoppingCart>;
  currentBreakingPoint?: string;
  @Output('showCart') showCart = new EventEmitter;

  constructor(private shoppingCartService: ShoppingCartService,
    private responsiveService: ResponsiveService,
    private router: Router) {
      this.responsiveService.mediaBreakpoint$
      .subscribe((bp: string) => {
          console.log(bp)
          this.currentBreakingPoint = bp;
      })
   }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
  }

  clearCart()
  {
    this.shoppingCartService.clearCart();
  }

  onShow() {
    this.showCart.emit();
  }

  onCheckOut() {
    this.showCart.emit();
    this.router.navigate(['check-out'])
  }
}