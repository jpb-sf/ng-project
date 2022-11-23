import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { ProductAndKey } from 'src/models/productAndKey';
import { ShoppingCart } from 'src/models/shopping-cart';

@Component({
  selector: 'products-card',
  templateUrl: './products-card.component.html',
  styleUrls: ['./products-card.component.scss']
})
export class ProductsCardComponent {
  @Input('product') product!: ProductAndKey;
  @Input('showActions') showActions!: boolean;
  @Input('shopping-cart') shoppingCart!: ShoppingCart;
 
  constructor(private cartService: ShoppingCartService, ) { }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

}
