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
   
    return new Promise((resolve, reject) => {
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
          resolve(true);
        }
        else {
          resolve(false);
        }
    
      })
      .catch(function(err: firebase.FirebaseError){ 
        console.log(`login() error spot 2`); 
        console.log(`message`, err.message);
        console.log(`code`, err.code);
        // code auth/too-many-requests
        // code auth/wrong-password
        resolve(err.code);
      })
    })
  }

  logout() 
  {
    console.log('logout')
    this.afAuth.signOut();
    this.router.navigate(['/'])
  }

  async registerUser(user: any)
  {
    return new Promise(async (resolve, reject) => {
      
      let newUser = await this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
      .catch(function(err: firebase.FirebaseError)
      {
        // console.log(`message`, err.message);
        // console.log(`code`, err.code);
        resolve(err.code);
      })
      // If user has bee created
      if (newUser && newUser.user)
      {  
        // update user with properties from registration form 
        await this.db.object('/users/' + newUser.user.uid)
        .update({
            email: newUser.user.email,
            isAdmin: false,
            displayName: user.displayName
        })
        await this.login('register', user.email, user.password)
        if (this.user && this.user.uid === newUser?.user?.uid)
        {
          this.router.navigate(['']);
        }
        else {
          resolve("Error while registering")
          this.afAuth.signOut();
        }
      }
      resolve(true)

    })
  }
}

     

