import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCartShopping as fasCartShopping} from '@fortawesome/free-solid-svg-icons';

import { ProductsCardComponent } from './components/products-card/products-card.component';
import { ProductsQuantityComponent } from './components/products-quantity/products-quantity.component';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { CategoryService } from './services/category.service';
import { DateTimeService } from './services/date-time.service';
import { OrderService } from './services/order.service';
import { ProductService } from './services/product.service';
import { ShoppingCartService } from './services/shopping-cart.service';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    ProductsCardComponent,
    ProductsQuantityComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    DataTablesModule
  ],
  //  only necessary to export if outside modules are using these components
  exports: [
    ProductsCardComponent,
    ProductsQuantityComponent,
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    DataTablesModule,
    FontAwesomeModule
  ],
  providers: [
    AuthService,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService,
    DateTimeService,
    AuthGuard
  ]
})
export class SharedModule {
    constructor(library: FaIconLibrary) {
        library.addIcons(fasCartShopping)
    }
 }
