import { Component, Input } from '@angular/core';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ProductAndKey } from 'shared/models/product';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { ShoppingCartItem } from 'shared/models/shopping-cart-item';

@Component({
  selector: 'products-quantity',
  templateUrl: './products-quantity.component.html',
  styleUrls: ['./products-quantity.component.scss']
})
export class ProductsQuantityComponent  {
  @Input('shopping-cart') shoppingCart?: ShoppingCart;
  @Input('product') product!: ProductAndKey | ShoppingCartItem;
  @Input('key') key!: string;
  @Input('color') color!: boolean;
  @Input('btnSize') btnSize!: 'large' | 'small';

  constructor(private cartService: ShoppingCartService) { }

  addToCart() {
    console.log('add to cart')
    console.log(this.product)
    this.cartService.addToCart(this.product, 1);
  }

  subtractFromCart() {
    this.cartService.subtractFromCart(this.product)
  }
}
