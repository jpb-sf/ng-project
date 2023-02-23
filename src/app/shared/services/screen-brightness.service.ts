import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScreenBrightnessService {
  brightness$: BehaviorSubject<any> = new BehaviorSubject(false);
  darkenedScreen:boolean = false;
  constructor() { }

  changeBrightness(): any {
    this.darkenedScreen = !this.darkenedScreen;
    this.brightness$.next(this.darkenedScreen);
  }
}
