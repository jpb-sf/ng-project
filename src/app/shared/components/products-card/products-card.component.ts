import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ProductAndKey } from 'shared/models/product';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart';

@Component({
  selector: 'products-card',
  templateUrl: './products-card.component.html',
  styleUrls: ['./products-card.component.scss']
})
export class ProductsCardComponent {
  @Input('product') product!: ProductAndKey;
  @Input('show-actions') showActions!: boolean;
  @Input('shopping-cart') shoppingCart!: ShoppingCart;
  @Input('filteredProducts') filteredProducts!: ProductAndKey[];
 
  constructor(private cartService: ShoppingCartService, ) { }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

}
