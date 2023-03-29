import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScreenBrightnessService {
  brightness$: Subject<any> = new Subject();
  darkenedScreen:boolean = false;

  changeBrightness(): any {
    this.darkenedScreen = !this.darkenedScreen;
    this.brightness$.next(this.darkenedScreen);
  }

}

