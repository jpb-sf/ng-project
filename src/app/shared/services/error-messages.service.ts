import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessagesService {
  emptyCart$: Subject<boolean> = new Subject();  
  constructor() { }

  _setEmptyCartError(state: boolean)
  {
    this.emptyCart$.next(state)
  }
}
