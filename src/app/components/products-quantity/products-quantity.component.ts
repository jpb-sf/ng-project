import { Component, Input } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { ProductAndKey } from 'src/models/productAndKey';
import { ShoppingCart } from 'src/models/shopping-cart';

@Component({
  selector: 'products-quantity',
  templateUrl: './products-quantity.component.html',
  styleUrls: ['./products-quantity.component.scss']
})
export class ProductsQuantityComponent  {
  @Input('shopping-cart') shoppingCart?: ShoppingCart;
  @Input('product') product!: ProductAndKey;
  @Input('key') key!: string;

  constructor(private cartService: ShoppingCartService) { }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  subtractFromCart() {
    this.cartService.subtractFromCart(this.product)
  }


}
