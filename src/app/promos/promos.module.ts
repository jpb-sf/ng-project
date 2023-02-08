import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'shared/shared.module';
import { TopPromoComponent } from './top-promo/top-promo.component';

@NgModule({
  declarations: [
    TopPromoComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ], 
  exports: [
    TopPromoComponent
  ]
})
export class PromosModule { }
