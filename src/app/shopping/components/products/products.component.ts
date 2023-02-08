import { Component,  OnInit } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { Observable, switchMap } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProductAndKey } from 'shared/models/product';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart';


@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit { 
  filteredProducts: ProductAndKey[] = [];
  products: ProductAndKey[] = [];
  category: any = '';
  cart$!: Observable<ShoppingCart>;
  
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
      // Assign the products array (of products)
      this.products = p as ProductAndKey[];
      //  Return (switch mapping the route query paramMap observable)
      let result : Observable<ParamMap> = this.route.queryParamMap;
      return result;
    }))
    // subscribe to the QueryParam Map observable
    .subscribe(params => {
      // get/ assign the query paramter 'category' to category.
      this.category = params.get('category')
      //  assign FileredProducts the return value of applFilter()
      this.filteredProducts = this.applyFilter();
    })
  }

  private applyFilter()
  {
    // if this.category isn't null return the filtered array of products
    //  ...with items that have matching category, or return the whole products array
    return this.category ? this.products.filter((item) => { 
        return item.category.toLowerCase() == this.category.toLowerCase();
      }) : this.products;
  }

}