import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { AppUser } from 'src/models/User'
import { map, of, catchError, Observable, switchMap} from 'rxjs';
import firebase from 'firebase/compat/app';
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService, private router: Router) { }
  
  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree>  {
    return this.auth.user$
    .pipe(
        switchMap((user:firebase.User | null) => { 
            console.log('adminGuard switchMap')
            return this.userService.appUser(user)
        }),
        map((appUser:AppUser | null) => 
        {
            console.log(`welcome to AdminGuard map()`);
            if(appUser)
            {
                console.log('isAdmin? Yes')
                return appUser.isAdmin;
            }
            else {
                console.log('isAdmin? No')
                return false;
            }
        })
        )
  }
}