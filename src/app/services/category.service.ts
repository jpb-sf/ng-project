import { Injectable } from '@angular/core';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/compat/database';
import { query, orderByChild } from "firebase/database";
import { Observable, map } from 'rxjs';
import { Categories, Category } from 'src/models/Category';
import { ProductAndKey } from 'src/models/productAndKey';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  
  constructor(private db: AngularFireDatabase) {}
  
  getAll(): Observable<Categories[]> {
    return this.db.list<Categories>('/categories', (ref) => {
        return ref.orderByChild('name')
    }).snapshotChanges()
    .pipe(
        map((action:any ) => {
           return action.map((a:any) => {
            const data = a.payload.val();
            const id = a.payload.key;
            return {key: id, ...data}
          })  
        })
    );
  }

}