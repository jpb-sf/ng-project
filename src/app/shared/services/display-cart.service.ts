import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisplayCartService {
  displayCart$: Subject<any> = new Subject();
  displayCart: boolean = false;

  _setDisplayCart() {
    this.displayCart = !this.displayCart;
    this.displayCart$.next(this.displayCart);
  }
}



