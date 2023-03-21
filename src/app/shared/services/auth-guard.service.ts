import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private authService: AuthService, private router: Router) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
  boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
     return this.authService.user$
     .pipe(
        map((user) => {
            console.log(`auth guard`);
            if ((user && state.url === '/check-out/login') ||
            (user && state.url === '/check-out/sign-up') )
            {
              this.router.navigate(['/check-out']);
              return true;
            }
            if (user) { return true };
            console.log(`canActivated activated, state.url is ${state.url}`)
            // if (state.url === '/check-out')
            // {
              this.router.navigate(['/check-out/login'],  { queryParams: { returnUrl: state.url } })
            // }
            // else {
            //   this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } })
            // }
            return false;
        })
      )
    }
}
    