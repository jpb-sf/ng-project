import { Injectable,OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap, of,catchError } from 'rxjs';
import { UserService } from './user.service';
import { AppUser } from 'shared/models/app-user';
import firebase from 'firebase/compat/app';

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
      private userService: UserService) {
        this.user$ = this.afAuth.authState;
        this.afAuth.authState.subscribe(user => {
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
      let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
      console.log(`id is ${id} and returnUrl is ${returnUrl}`);
      localStorage.setItem('returnUrl', returnUrl!);
      if(id === 'login')
      {      
        console.log('another test');
          this.afAuth.signInWithEmailAndPassword(email, password)
          .then((userCredential) => {
            if(userCredential.user)
            {
            //   this.userService.saveUser(userCredential.user)
            }
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

    async registerUser(user: any)
    {
      let userCred = (await this.afAuth.createUserWithEmailAndPassword(user.email, user.password))
      if (userCred.user)
      {
        let status = (await this.db.object('/users/' + userCred.user.uid)
          .update({
            email: userCred.user.email,
            isAdmin: false,
            displayName: user.displayName
          }))
        
        this.user$.subscribe(user => {
          if (user?.uid === userCred?.user?.uid)
          {
            this.router.navigate([''])
          }
          else {
            // TODO
          }
        })
      }
    }
}
     

