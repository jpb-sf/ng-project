import { Component, NgZone, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AppUser } from 'src/models/User';
import { catchError, map, of, from, Observable, switchMap, last, first, takeWhile, materialize, dematerialize, finalize } from 'rxjs';
import firebase from 'firebase/compat/app';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { KeyValuePipe } from '@angular/common';
import { ShoppingCart } from 'src/models/shopping-cart';

 
@Component({
  selector: 'bs-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  appUser$!: Observable<AppUser | null>;
  cart$?: Observable<ShoppingCart | null>
  cartList: any;
  constructor(
    public auth: AuthService, 
    private userService: UserService,
    private shoppingCartService: ShoppingCartService) {}
    
    async ngOnInit() {
      this.cart$ = await this.shoppingCartService.getCart();

      this.appUser$ = this.auth.user$
      .pipe(
        switchMap((user:firebase.User | null) => this.userService.appUser(user)
            .pipe(
              catchError(() => {
                console.log('error, unsubscribe?')
                return this.appUser$;
              })
            )
        )
      )
  }

  logout() 
  {
    console.log('logout')
    this.auth.logout();
  }

}