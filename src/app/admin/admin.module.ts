import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { SharedModule } from 'shared/shared.module';

import { AdminProductFormComponent } from './components/admin-product-form/admin-product-form.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminGuard } from './services/admin-guard.service';



@NgModule({
  declarations: [
    AdminProductFormComponent,
    AdminProductsComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [
    AdminGuard
  ],
  exports: [
  ]
})
export class AdminModule { }
