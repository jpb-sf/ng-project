import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderViewService {
  orderView: boolean = false;
  orderView$: BehaviorSubject<any> = new BehaviorSubject(false);
  constructor() { }

  changeOrderView(value: boolean) {
    // this.orderView = this.orderView;
    this.orderView$.next(value);
  }
}
