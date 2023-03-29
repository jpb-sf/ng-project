import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, map } from 'rxjs';
import { ProductAndKey } from 'shared/models/product';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product:any)
  {
    return this.db.list('/products').push(product);
  }
  
  getAll(): Observable<ProductAndKey[]>
  {
    return this.db.list('/products').snapshotChanges()
    .pipe(
        map((actions:any) => {
          console.log(actions)
          return actions.map((a:any)=> {
            const data = a.payload.val();
            const id = a.key;
            return {key: id, ...data };
          })
        })
    )
  }
  
  get(productId: string)
  {
    return this.db.object('/products/' + productId).valueChanges() as Observable<ProductAndKey>;
  }

  update(productId: string, product:string)
  {
    return this.db.object('/products/' + productId).update(product)
  }

  delete(productId: string)
  {
    return this.db.object('/products/' + productId).remove();
  }
}
