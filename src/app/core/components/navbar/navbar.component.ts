import { Component,OnInit, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from 'shared/services/auth.service';
import { AppUser } from 'shared/models/app-user';
import { Observable } from 'rxjs';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart';
import { ResponsiveService } from 'shared/services/responsive.service';


 @Component({
  selector: 'bs-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Output('showCart') showCart = new EventEmitter;
  appUser$!: Observable<AppUser | null>;
  cart$?: Observable<ShoppingCart | null>;
  currentBreakingPoint: string = '';
  @Output('onShowLogin')onShowLogin = new EventEmitter;
  
  constructor(
    public auth: AuthService, 
    private shoppingCartService: ShoppingCartService,
    private responsiveService: ResponsiveService,
    private location: Location) {}
    
  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this.appUser$ = this.auth.appUser$;
    this.responsiveService.mediaBreakpoint$
    .subscribe((bp: string) => {
      this.currentBreakingPoint = bp;
    })
  }

  onLogin() 
  {
    this.onShowLogin.emit();
  }

  logout() 
  {
    this.auth.logout();
  }

  onShow() {
    // If user is not already on '/shopping-cart' path; this avoids the desktop fly-out cart redudantly showing over a mobile cart page
    if(this.location.path() !== '/shopping-cart')
    {
        this.showCart.emit()
    }
  }
}