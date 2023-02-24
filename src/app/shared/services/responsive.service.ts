import { Injectable, OnDestroy} from '@angular/core';
import { Subject, BehaviorSubject, fromEvent } from 'rxjs';
import { takeUntil, debounceTime} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService implements OnDestroy {
    private unsubscriber$: Subject<any> = new Subject();
    screenWidth$: BehaviorSubject<number> = new BehaviorSubject(NaN);
    mediaBreakpoint$: BehaviorSubject<string> = new BehaviorSubject('');
    swMediumOrSmaller$: BehaviorSubject<any> = new BehaviorSubject(true);
  
    constructor() {
      this.init();
    }
  
    init() {
      this._setScreenWidth(window.innerWidth);
      this._setMediaBreakpoint(window.innerWidth);
      fromEvent(window, 'resize')
        .pipe(
        //   debounceTime(1000),
          takeUntil(this.unsubscriber$)
        ).subscribe((evt: any) => {
          this._setScreenWidth(evt.target.innerWidth);
          this._setMediaBreakpoint(evt.target.innerWidth);
        });
    
        this.screenWidth$
        .subscribe((sw: number) => {
            console.log(sw)
            if (sw <= 760 ) {
              this.swMediumOrSmaller$.next(true)
            }
            else {
                this.swMediumOrSmaller$.next(false)
            }
        })
    }
  
    ngOnDestroy() {
      this.unsubscriber$.next(null);
      this.unsubscriber$.complete();
    }
  
    private _setScreenWidth(width: number): void {
      this.screenWidth$.next(width);
    }
  
    private _setMediaBreakpoint(width: number): void {
      if (width < 576) {
        this.mediaBreakpoint$.next('xs');
      } else if (width >= 576 && width < 768) {
        this.mediaBreakpoint$.next('sm');
      } else if (width >= 768 && width < 992) {
        this.mediaBreakpoint$.next('md');
      } else if (width >= 992 && width < 1200) {
        this.mediaBreakpoint$.next('lg');
      } else if (width >= 1200 && width < 1600) {
        this.mediaBreakpoint$.next('xl');
      } else {
        this.mediaBreakpoint$.next('xxl');
      }
    }
}