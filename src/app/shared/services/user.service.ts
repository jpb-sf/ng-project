import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import firebase from 'firebase/compat/app';
import { AppUser } from 'shared/models/app-user';
import { Observable, of} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
    
  constructor(private db: AngularFireDatabase) { 
  }

  getAppUser(user: firebase.User | null) 
  {
    if(user)
    {
      return this.db.object('/users/' + user.uid).valueChanges() as Observable<AppUser | null> 
    }
    else{
       return of(null)
    }
  }


} 

