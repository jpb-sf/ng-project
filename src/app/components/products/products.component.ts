import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Observable, switchMap, of, Subscription } from 'rxjs';
import { Route, ActivatedRoute, ParamMap } from '@angular/router';
import { ProductAndKey } from 'src/models/productAndKey';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { ShoppingCart } from 'src/models/shopping-cart';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {  
  filteredProducts: ProductAndKey[] = [];
  products: ProductAndKey[] = [];
  category: any;
  cart!: ShoppingCart;
  subscription?: Subscription;
  itemAdded!: boolean;

  constructor(
    private route: ActivatedRoute, 
    private productService: ProductService,
    private cartService: ShoppingCartService) {
   this.productService.getAll()
    .pipe(
      switchMap((p) => {
      this.products = p as ProductAndKey[];
      let result : Observable<ParamMap> = this.route.queryParamMap;
      return result;
    }))
    .subscribe(params => {
      this.category = params.get('category')
      
      let result = this.category ? this.products.filter((item) => { 
        console.log('filter')
        return item.category.toLowerCase() == this.category.toLowerCase();
      }) : this.products;
      this.filteredProducts = result;
    })
  }

  async ngOnInit()  {
   this.subscription = (await this.cartService.getCart())
    .subscribe(cart => {
      console.log('hello')
      this.cart = cart;
    });
  }

  ngOnDestroy(): void {
      this.subscription?.unsubscribe();
  }
  
}