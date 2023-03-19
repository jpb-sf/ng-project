import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'shared/shared.module';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { OrderManageComponent } from './components/order-manage/order-manage.component';
import { OrderSelectComponent } from './components/order-select/order-select.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';

import { ScreenBrightnessComponent } from './components/screen-brightness/screen-brightness.component';
import { RegisterComponent } from './register/register.component';
import { UsernameFormComponent } from './username-form/username-form.component';


@NgModule({
  declarations: [
    NavbarComponent,
    LoginComponent,
    OrderSummaryComponent,
    OrderSelectComponent,
    OrderManageComponent,
    ScreenBrightnessComponent,
    RegisterComponent,
    UsernameFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    NavbarComponent,
    ScreenBrightnessComponent,
    LoginComponent,
    RegisterComponent,
    UsernameFormComponent
  ]
})
export class CoreModule { }
