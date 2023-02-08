import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { Subject, Subscription } from 'rxjs';
import { ProductAndKey } from 'shared/models/product';

@Component({
  selector: 'admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
    products!: ProductAndKey[];
    subscription!: Subscription;
    productKey: string ='';
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject<any>();

    constructor(private productService: ProductService) {
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 2
      };
      this.subscription = this.productService.getAll()
        .subscribe((p)=> {
          console.log(p)
          this.products = p;
          this.dtTrigger.next(p);
        })
    }

    ngOnInit(): void {}
    
    ngOnDestroy(): void {
      this.subscription.unsubscribe();
      this.dtTrigger.unsubscribe();
    }

  
  }