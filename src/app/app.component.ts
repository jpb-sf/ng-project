import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from './shared/services/auth.service';
import { ResponsiveService } from 'shared/services/responsive.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    path: string = '';
    displayProductNav?: boolean;
    displayCart: boolean = false;
    swMediumOrSmaller: boolean = false;

  // navigating the user when they login to the intended url. Doing this here because OAuth, redrirect
  constructor( private authService: AuthService, 
    private responsiveService: ResponsiveService, 
    private router: Router,
    private location: Location) {
    // app component is a single instance so don't worry about unsubscribing
    console.log(window.innerWidth)
    this.authService.user$.subscribe(user => {
        if(user){
            let returnUrl = localStorage.getItem('returnUrl');
            console.log('appComponent refresh')
            if (returnUrl && returnUrl != "null")
            {       
              console.log(`returnUrl is ${returnUrl}`);
              localStorage.removeItem('returnUrl');
              return router.navigateByUrl(returnUrl);
            }
            return; 
        }
        return;
    })
}
    ngOnInit(): void {
        this.responsiveService.screenWidth$
        .subscribe((sw: number) => {
          if (sw <= 1200 ) {
              this.swMediumOrSmaller = true;
            }
            else {
              this.swMediumOrSmaller = false;
            }
        })
        this.path = this.location.path();
        this._setDisplayProductNav()
        this._setPath()
      }

    _setPath() {
      this.router.events
      .subscribe(evt => {
        if(this.path != this.location.path())
        {
          this.path = this.location.path();
          this.path = this.path? this.path : '/';
          console.log(this.path)
          this._setDisplayProductNav()
        }
      })
    }

    _setDisplayProductNav() {
      if (this.path === "/shopping-cart")
      {
        this.displayProductNav = false;
        return;
      }
      this.displayProductNav = true;
    }

    _setDisplayCart() {
      this.displayCart = !this.displayCart;
    }
}
