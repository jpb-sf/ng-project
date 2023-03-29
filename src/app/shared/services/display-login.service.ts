import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisplayLoginService {
    displayLogin$: Subject<any> = new Subject();
    _setDisplayLogin(stateNav?: boolean) 
    {
      this.displayLogin$.next(stateNav);
    }
  }
  