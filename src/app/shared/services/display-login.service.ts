import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisplayLoginService {
    displayLogin$: BehaviorSubject<any> = new BehaviorSubject(false);
    displayLogin: boolean = false;
  
    _setDisplayLogin(location?: string) 
    {
      this.displayLogin = !this.displayLogin;
      if(!location) location = '';
      this.displayLogin$.next({'display': this.displayLogin, 'location': location});
    
    }
  }
  