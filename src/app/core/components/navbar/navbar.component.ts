import { Component,OnInit, Output, EventEmitter } from '@angular/core';
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
  // show: boolean = true;
  
  constructor(
    public auth: AuthService, 
    private shoppingCartService: ShoppingCartService,
    private responsiveService: ResponsiveService) {}
    
  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this.appUser$ = this.auth.appUser$;
    this.responsiveService.mediaBreakpoint$
    .subscribe((bp: string) => {
      console.log(bp);
      this.currentBreakingPoint = bp;
    })
  }

  logout() 
  {
    console.log('logout')
    this.auth.logout();
  }

  onShow() {
    // this.show = !this.show;
    this.showCart.emit()
  }

}