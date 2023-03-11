import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisplayLoginService {
    displayLogin$: BehaviorSubject<any> = new BehaviorSubject(false);
    displayLogin: boolean = false;
  
    _setDisplayLogin() {
      this.displayLogin = !this.displayLogin;
      this.displayLogin$.next(this.displayLogin);
    }
  }
  