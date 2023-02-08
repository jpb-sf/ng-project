import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './shopping/components/checkout/checkout.component';
import { LoginComponent } from './core/components/login/login.component';
import { ProductsComponent } from './shopping/components/products/products.component';
import { AdminProductFormComponent } from './admin/components/admin-product-form/admin-product-form.component';
import { AdminProductsComponent } from './admin/components/admin-products/admin-products.component';
import { OrderManageComponent } from './core/components/order-manage/order-manage.component';
import { OrderSuccessComponent } from './shopping/components/order-success/order-success.component';
import { ShoppingCartComponent } from './shopping/components/shopping-cart/shopping-cart.component';
import { RegisterComponent } from './core/components/register/register.component';

import { AuthGuard } from './shared/services/auth-guard.service';
import { AdminGuard } from './admin/services/admin-guard.service';


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
        component: OrderManageComponent,
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
