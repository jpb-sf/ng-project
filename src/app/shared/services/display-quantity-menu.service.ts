import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisplayQuantityMenuService {
  displayQuantityId$: BehaviorSubject<number> = new BehaviorSubject(NaN); 
  constructor() { }
  
  setId(cardId: number)
  {
    this.displayQuantityId$.next(cardId)
  }
}
