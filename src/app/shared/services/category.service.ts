import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, map } from 'rxjs';
import { Categories } from 'shared/models/category';

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