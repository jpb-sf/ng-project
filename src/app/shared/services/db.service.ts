import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor() {
    firebase.initializeApp(environment.firebaseConfig)
   }
}