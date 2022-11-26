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
export class ProductsComponent implements OnInit {  
  filteredProducts: ProductAndKey[] = [];
  products: ProductAndKey[] = [];
  category: any;
  cart$!: Observable<ShoppingCart>;
  itemAdded!: boolean;

  constructor(
    private route: ActivatedRoute, 
    private productService: ProductService,
    private cartService: ShoppingCartService) {}

  async ngOnInit()  {
    this.cart$ = await this.cartService.getCart();
    this.populateProducts();
  }

  private populateProducts()
  {
    this.productService.getAll()
    .pipe(
      switchMap((p) => {
      this.products = p as ProductAndKey[];
      let result : Observable<ParamMap> = this.route.queryParamMap;
      return result;
    }))
    .subscribe(params => {
      this.category = params.get('category')
      this.filteredProducts = this.applyFilter();
    })
  }


  private applyFilter()
  {
    return this.category ? this.products.filter((item) => { 
        return item.category.toLowerCase() == this.category.toLowerCase();
      }) : this.products;
  }
  
}