import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Categories, Category } from 'shared/models/category';
import { CategoryService } from 'shared/services/category.service';

@Component({
  selector: 'products-filter',
  templateUrl: './products-filter.component.html',
  styleUrls: ['./products-filter.component.scss']
})
export class ProductsFilterComponent {
  categories$: Observable<Categories[]>;
  @Input('category') category: any;
  @Input('currentBreakingPoint') currentBreakingPoint!: string;

  constructor(private categoryServce: CategoryService) { 
    this.categories$ = this.categoryServce.getAll();
  }

}
