
import { Component, OnInit } from '@angular/core';
import { Observable, subscribeOn } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { Categories } from 'src/models/Category';
import { ProductService } from 'src/app/services/product.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormControl } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router';
import { SnapshotAction } from '@angular/fire/compat/database';
import { take,map } from 'rxjs';
import { Product } from 'src/models/product';
import { Category } from 'src/models/Category';

@Component({
    selector: 'admin-product-form',
    templateUrl: './admin-product-form.component.html',
    styleUrls: ['./admin-product-form.component.scss']
  })
export class AdminProductFormComponent {
  
  categories$: Observable<Categories[]>;
  form;
  urlRegEx: string ='(http(s)?://.)?(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)';
  product: any = {
    title: '',     
    price: NaN,
    category: '',
    imageUrl: ''
  };
  test:string = "test";
  id;
  
  constructor(
    fb: UntypedFormBuilder, 
    private categoryService: CategoryService, 
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) 
  { 
    this.categories$ = categoryService.getAll();
    
    this.form = fb.group({
        title: ['', Validators.required],
        price: ['', [
            Validators.required,
            Validators.min(0)
        ]],
        category: ['', Validators.required],
        imageUrl: ['', [
            Validators.required,
            Validators.pattern(this.urlRegEx)
        ]]
    })

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id == "new")
    {
      this.id = "";
    }
    if (this.id) 
    {
      console.log(this.id)
      let item;
      try {
        item = this.productService.get(this.id)
      }
      catch{
        console.log('Error returning ProductService.get() | Handled on AdminProductForm ')
      }

      if (item)
      {
        item.pipe( 
          take(1)
        ).subscribe((p) => {
						console.log(`productService.get() observable returns:`);
						console.log(p)
						this.product = p;
						return this.product;
        	})
      }
    }
  }

	get title() { return this.form.get('title'); }
	get price() { return this.form.get('price'); }
	get category() { return this.form.get('category'); }
	get imageUrl() { return this.form.get('imageUrl'); }

	getCat() {
		let result = this.categories$.subscribe(
				category => {
					console.log(category);
					return category;  
				}
		);
		return result;
	}

	save(form: UntypedFormGroup) {
		console.log(form.value)
		if(form.valid)
		{
			if (this.id) this.productService.update(this.id, form.value);
			else this.productService.create(form.value);
		}
		else {
			Object.keys(form.controls).forEach(field => {
				const control = this.form.get(field);
				control?.markAsTouched({ onlySelf: true })
			})
			console.log('Error(s) in the AdminProductForm form values; form not valid. | Handled on AdminProductForm')
			return false;
		} 
		return this.router.navigate(['/admin/products']);
	}

	deleteItem()
	{	
		if (confirm('Are you sure you want to delete this product?')) return;

		if(this.id)
		{
			this.productService.delete(this.id)
			return this.router.navigate(['/admin/products']);
		}
		else {
			return false;
		}
	}
}
  
  
