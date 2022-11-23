import { Injectable } from '@angular/core';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap, map,catchError } from 'rxjs';
import { UserService } from './user.service';
import { AppUser } from 'src/models/User';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    user$: Observable<firebase.User | null>;
    constructor(private afAuth: AngularFireAuth, private router: Router, 
			private route: ActivatedRoute, private userService: UserService) {
      this.user$ = afAuth.authState;
    }

    get appUser$(): Observable<AppUser | null>  {  
        return this.user$
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
   
    login(id: string, email: string, password: string)
    {  
      let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
      console.log(`id is ${id} and returnUrl is ${returnUrl}`);
      localStorage.setItem('returnUrl', returnUrl!)
    
      if(id === 'login')
      {      
        console.log('another test');
          this.afAuth.signInWithEmailAndPassword(email, password)
          .then((userCredential) => {
                if (!returnUrl || returnUrl == "null")
                {   
                    // if (userCredential.user) {this.userService.save(userCredential.user)}
                    console.log('login home passed')
                    this.router.navigate([''])
                }
            })
          .catch(function(error){ 
              console.log(error)
              return error
          })
          return
      }
    }

    

    logout() 
    {
      console.log('logout')
      this.afAuth.signOut()
      this.router.navigate(['/login'])
    }
}
     

