import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Categories, Category } from 'src/models/Category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'products-filter',
  templateUrl: './products-filter.component.html',
  styleUrls: ['./products-filter.component.scss']
})
export class ProductsFilterComponent implements OnDestroy {
  categories$: Observable<Categories[]>;
  @Input('category') category: any;

  constructor(private categoryServce: CategoryService) { 
  this.categories$ = this.categoryServce.getAll();
  }

  ngOnDestroy(): void {
    
  }

}
