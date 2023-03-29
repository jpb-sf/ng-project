import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisplayQuantityMenuService {
  displayQuantityId$: Subject<number> = new Subject(); 
  constructor() { }
  
  setId(cardId: number)
  {
    this.displayQuantityId$.next(cardId)
  }
}
