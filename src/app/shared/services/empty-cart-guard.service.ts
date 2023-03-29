import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { ErrorMessagesService } from './error-messages.service';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class EmptyCartGuard implements CanActivate {
  constructor(
    private cartService: ShoppingCartService, 
    private router: Router,
    private errorMessageService: ErrorMessagesService) { 
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
  boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return new Promise( async (resolve, reject) => {
    (await this.cartService.getCart())
    .subscribe((cart: ShoppingCart) => {
      if(!cart.totalItemsCount)
      {
        console.log('emptyCartGuard defenses are up')
        this.errorMessageService._setEmptyCartError(true);
        resolve(false);
      }
      else {
      this.errorMessageService._setEmptyCartError(false);
       resolve(true);
      }
    })})
  }

}