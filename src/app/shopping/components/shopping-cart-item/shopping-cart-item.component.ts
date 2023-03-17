import { Component, Input } from '@angular/core';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { ShoppingCartItem } from 'shared/models/shopping-cart-item';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Component({
  selector: 'shopping-cart-item, [shopping-cart-item]',
  templateUrl: './shopping-cart-item.component.html',
  styleUrls: ['./shopping-cart-item.component.scss']
})
export class ShoppingCartItemComponent {
  displayQuantityMenu: boolean = false;
  @Input('cart') cart!: ShoppingCart;
  @Input('item') item!: ShoppingCartItem;
  @Input('swMediumOrSmaller') swMediumOrSmaller: boolean = false;

  constructor(private cartService: ShoppingCartService) {}

  _setDisplayQuantityMenu()
  {
    this.displayQuantityMenu = true;
  }
  
  deselect() 
  {
    this.displayQuantityMenu = false;
  }
    
  addToCart(product: any, quantity: number) {
    console.log(`time to add to cart, ${quantity}`);
    this.cartService.addToCart(product, Number(quantity));
    this.displayQuantityMenu = false;
  }

}
