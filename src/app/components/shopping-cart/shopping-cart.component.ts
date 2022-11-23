import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { ShoppingCart } from 'src/models/shopping-cart';

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  
  cart$?: Observable<ShoppingCart>;
  constructor(private shoppingCartService: ShoppingCartService) {
   }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
  }

  
}
