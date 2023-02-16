import { Component, Output, Input, OnInit, EventEmitter } from '@angular/core';
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
  swMediumOrSmaller: boolean = false;
  @Input('inputDisplayCart') inputDisplayCart: boolean = false;
  @Output('hideCart') hideCart = new EventEmitter;

  constructor(private shoppingCartService: ShoppingCartService,
    private responsiveService: ResponsiveService,
    private router: Router) {
      this.responsiveService.screenWidth$
      .subscribe((sw: number) => {
          console.log(sw)
          if (sw <= 992 ) {
            this.swMediumOrSmaller = true;
          }
          else {
            this.swMediumOrSmaller = false;
          }
      })
   }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
  }

  clearCart(){
    this.shoppingCartService.clearCart();
  }

  onHide() {
    this.hideCart.emit();
    this.inputDisplayCart = false;
  }

  onCheckOut() {
    this.hideCart.emit();
    this.router.navigate(['check-out'])
  }
}