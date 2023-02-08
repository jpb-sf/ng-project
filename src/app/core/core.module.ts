import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'shared/shared.module';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { OrderManageComponent } from './components/order-manage/order-manage.component';
import { OrderSelectComponent } from './components/order-select/order-select.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { RegisterComponent } from './components/register/register.component';
import { UsernameFormComponent } from './components/username-form/username-form.component';


@NgModule({
  declarations: [
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    UsernameFormComponent,
    OrderSummaryComponent,
    OrderSelectComponent,
    OrderManageComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class CoreModule { }
