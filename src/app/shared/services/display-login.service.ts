import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisplayLoginService {
    displayLogin$: BehaviorSubject<any> = new BehaviorSubject(false);
    _setDisplayLogin(stateNav?: boolean) 
    {
      this.displayLogin$.next(stateNav);
    }
  }
  