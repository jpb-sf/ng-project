import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DisplayCartService } from './display-cart.service';
import { OrderViewService } from './order-view.service';

@Injectable({
  providedIn: 'root'
})
export class ScreenBrightnessService {
  brightness$: BehaviorSubject<any> = new BehaviorSubject(false);
  darkenedScreen:boolean = false;
  
  constructor(private orderViewService: OrderViewService, 
    private displayCartService: DisplayCartService) { }

  changeBrightness(): any {
    this.darkenedScreen = !this.darkenedScreen;
    this.brightness$.next(this.darkenedScreen);
  }

}

