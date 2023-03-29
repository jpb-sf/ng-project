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
import { RegisterComponent} from './core/register/register.component';
import { AuthGuard } from './shared/services/auth-guard.service';
import { AdminGuard } from './admin/services/admin-guard.service';
import { EmptyCartGuard } from 'shared/services/empty-cart-guard.service';


const routes: Routes = [
    {
        path: 'register', 
        component: RegisterComponent,
        canActivate: [EmptyCartGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: ProductsComponent,
    },
    {
        path: 'shopping-cart',
        component: ShoppingCartComponent,
    },
    {
        path: 'orders',
        component: OrderManageComponent,
        canActivate: [AuthGuard]
    },
    {   
        path: 'check-out/login',
        component: CheckoutComponent
    },
    {   
        path: 'check-out/sign-up',
        component: CheckoutComponent,
        canActivate: [EmptyCartGuard]
    },
    {
        path: 'check-out',
        component: CheckoutComponent,
        canActivate: [AuthGuard, EmptyCartGuard]
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
    },
    {
        path: '**',
        component: ProductsComponent,
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
