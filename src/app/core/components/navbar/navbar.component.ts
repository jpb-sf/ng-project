import { Component,OnInit } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { AppUser } from 'shared/models/app-user';
import { Observable } from 'rxjs';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart';


 @Component({
  selector: 'bs-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  appUser$!: Observable<AppUser | null>;
  cart$?: Observable<ShoppingCart | null>;

  constructor(
    public auth: AuthService, 
    private shoppingCartService: ShoppingCartService) {}
    
  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this.appUser$ = this.auth.appUser$;
  }

  logout() 
  {
    console.log('logout')
    this.auth.logout();
  }

}