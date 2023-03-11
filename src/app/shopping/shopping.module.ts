import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'shared/shared.module';

import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { ProductsFilterComponent } from './components/products-filter/products-filter.component';
import { ProductsComponent } from './components/products/products.component';
import { ShippingFormComponent } from './components/shipping-form/shipping-form.component';
import { ShoppingCartSummaryComponent } from './components/shopping-cart-summary/shopping-cart-summary.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ProductsNavComponent } from './components/products-nav/products-nav.component';

@NgModule({
  declarations: [
    ShoppingCartComponent,
    CheckoutComponent,
    OrderSuccessComponent,
    ProductsComponent,
    ProductsFilterComponent,
    ShippingFormComponent,
    ShoppingCartSummaryComponent,
    ProductsNavComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ProductsNavComponent,
    ShoppingCartComponent
  ]
})
export class ShoppingModule { }
