import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProductsComponent } from './components/products/products.component';
import { AdminProductFormComponent } from './admin/admin-product-form/admin-product-form.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { OrdersComponent } from './components/orders/orders.component'
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { MyOrderComponent } from './components/my-order/my-order.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { RegisterComponent } from './components/register/register.component';

import { AuthGuard } from './services/auth-guard.service';
import { AdminGuard } from './services/admin-guard.service';
import { OrderManageComponent } from './components/order-manage/order-manage.component';


const routes: Routes = [
    {
        path: 'register', 
        component: RegisterComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: ProductsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'shopping-cart',
        component: ShoppingCartComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'orders',
        component: OrdersComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'check-out',
        component: CheckoutComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'order-success',
        component: OrderSuccessComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'admin/products/:id',
        component: AdminProductFormComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path: 'admin/products/new',
        component: AdminProductFormComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path: 'admin/products',
        component: AdminProductsComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path: 'my-orders/:id', 
        component: OrderManageComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'my-orders', 
        redirectTo: 'my-orders/',
        pathMatch: 'full',
        canActivate: [AuthGuard]
    },
    {
        path: 'admin/admin-orders/:id', 
        component: OrderManageComponent,
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path: 'admin/admin-orders', 
        redirectTo: 'admin/admin-orders/', 
        pathMatch: 'full',
        canActivate: [AuthGuard, AdminGuard]
    }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
