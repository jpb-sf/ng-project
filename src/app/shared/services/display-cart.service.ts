import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisplayCartService {
  displayCart$: BehaviorSubject<any> = new BehaviorSubject(false);
  displayCart: boolean = false;

  _setDisplayCart() {
    this.displayCart = !this.displayCart;
    this.displayCart$.next(this.displayCart);
  }
}



