import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

import { environment } from 'Environments/environment';
import * as firebase from 'firebase/app';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import { USE_EMULATOR as USE_AUTH_EMULATOR } from '@angular/fire/compat/auth';
import { USE_EMULATOR as USE_DATABASE_EMULATOR } from '@angular/fire/compat/database';
// import { USE_EMULATOR as USE_FIRESTORE_EMULATOR } from '@angular/fire/compat/firestore';
import { USE_EMULATOR as USE_FUNCTIONS_EMULATOR } from '@angular/fire/compat/functions';

import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { CategoryService } from './services/category.service'
import { ProductService } from './services/product.service';
import { AuthGuard } from './services/auth-guard.service';
import { AdminGuard } from './services/admin-guard.service';
import { ShoppingCartService } from './services/shopping-cart.service';

import { NavbarComponent } from './components/navbar/navbar.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { MyOrderComponent } from './components/my-order/my-order.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductFormComponent } from './admin/admin-product-form/admin-product-form.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductsFilterComponent } from './components/products-filter/products-filter.component';
import { ProductsCardComponent } from './components/products-card/products-card.component';
import { ProductsQuantityComponent } from './components/products-quantity/products-quantity.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ShoppingCartComponent,
    CheckoutComponent,
    OrderSuccessComponent,
    LoginComponent,
    HomeComponent,
    AdminOrdersComponent,
    MyOrderComponent,
    OrdersComponent,
    AdminProductFormComponent,
    AdminProductsComponent,
    ProductsComponent,
    ProductsFilterComponent,
    ProductsCardComponent,
    ProductsQuantityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    DataTablesModule
  ],
  providers: [
    AuthService,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    AuthGuard,
    AdminGuard
    // AngularFireAuth,
    // {
    //     provide: SETTINGS,
    //     useValue: environment.useEmulators ? {
    //         host: 'http://localhost:8000',
    //         ssl: false
    //     } : undefined
    // },
    // { provide: USE_AUTH_EMULATOR, useValue: environment.useEmulators ? 
    //     ['http://localhost', 9097] : undefined
    // },
    // { provide: USE_DATABASE_EMULATOR, useValue: environment.useEmulators ? 
    //     ['http://localhost', 7000] : undefined
    // }
    // { provide: USE_FUNCTIONS_EMULATOR, useValue: environment.useEmulators ? 
    //     ['http://localhost', 5001] : undefined
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
    constructor() {
        firebase.initializeApp(environment.firebaseConfig)
    }
}
