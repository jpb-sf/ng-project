import { Injectable,OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router, RouterStateSnapshot, RouterState } from '@angular/router';
import { Observable, switchMap, of,catchError } from 'rxjs';
import { UserService } from './user.service';
import { AppUser } from 'shared/models/app-user';
import firebase from 'firebase/compat/app';
import { ScreenBrightnessService } from './screen-brightness.service';
import { DisplayLoginService } from './display-login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$!: Observable<firebase.User | null>;
  user?: firebase.User;
  
  constructor(
    private afAuth: AngularFireAuth, 
    private router: Router, 
    private route: ActivatedRoute, 
    private db: AngularFireDatabase,
    private userService: UserService,
    private screenBrightnessService: ScreenBrightnessService,
    private displayLoginService: DisplayLoginService) {
      this.user$ = this.afAuth.authState;
      this.user$.subscribe(user => {
        if (user)
        this.user = user;
      })
  }
    
  get appUser$(): Observable<AppUser | null>  {  
    return this.user$
    .pipe(
      switchMap((user:firebase.User | null) => this.userService.getAppUser(user) 
        .pipe(
          catchError(() => {
            console.log('error, unsubscribe?')
            return of()
          })
        )
      )
    )
  }
  
  login(id: string, email: string, password: string)
  {  
    const stateObj  = this.router.routerState.snapshot.url;
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    localStorage.setItem('returnUrl', returnUrl!);
   
    this.afAuth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
    if(userCredential.user)
    {
        // If user is logging in fromthe pop-up login menu on the nav bar
      if(id === 'loginNav')
      { 
        this.screenBrightnessService.changeBrightness();
        this.displayLoginService._setDisplayLogin(false);
      }
      if (stateObj=== '/check-out/login' ||
      stateObj === '/check-out/sign-up') 
      {
        // localStorage.setItem('returnUrl','check-out');
        this.router.navigate(['/check-out']);
      }
        
      if (!returnUrl || returnUrl == "null")
      {   
        this.router.navigate([''])
      }
      return true;
    }
    else {
      return false;
    }
  
    })
    .catch(function(error){ 
    // console.log(error)
    return error
    })
  }

  logout() 
  {
    console.log('logout')
    this.afAuth.signOut()
    this.router.navigate(['/'])
  }

  async registerUser(user: any)
  {
    let newUser = (await this.afAuth.createUserWithEmailAndPassword(user.email, user.password))
    // If user has bee created
    if (newUser.user)
    {  
      // update user with properties from registration form 
      (await this.db.object('/users/' + newUser.user.uid)
        .update({
          email: newUser.user.email,
          isAdmin: false,
          displayName: user.displayName
        }))
        this.login('register', user.email, user.password)
        // if (this.user && this.user.uid  === newUser?.user?.uid)
        // {
        //   this.router.navigate([''])
        // }
      
      // this.user$.subscribe(user => {
      //   if (user?.uid === newUser?.user?.uid)
      //   {
      //     this.router.navigate([''])
      //   }
      //   else {
      //     // TODO
      //   }
    }
  }
}

     

