import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { getDatabase, get, ref, child } from "firebase/database";
import firebase from 'firebase/compat/app';
import { AppUser } from 'src/models/User';
import { BehaviorSubject, catchError, observable, Observable, of, Subscriber, throwError } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
    
  constructor(private auth: AuthService, private db: AngularFireDatabase) { 
  }

  appUser(user: firebase.User | null) {
    // console.log(this.uid)
    console.log('db.object return in UserService.appUser is:');
    // console.log(obs)
    if(user)
    {
        let obs: AngularFireObject<AppUser> = this.db.object('/users/' + user.uid) 
        let result: Observable<AppUser | null> = obs.valueChanges();
        return result;
    }
    else{
       return of(null)
    }
   
  }
}
//   save(user: firebase.User)
//   {
    // this.db.object('/users/' + user.uid).update({
    //     name: user.displayName,
    //     email: user.email
    // })

//   }
