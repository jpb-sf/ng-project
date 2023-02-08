
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryService } from 'shared/services/category.service';
import { Categories } from 'shared/models/category';
import { ProductService } from 'shared/services/product.service';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { ProductAndKey } from 'shared/models/product';

@Component({
    selector: 'admin-product-form',
    templateUrl: './admin-product-form.component.html',
    styleUrls: ['./admin-product-form.component.scss']
  })
export class AdminProductFormComponent implements OnInit {
  
  categories$!: Observable<Categories[]>;
  form!: FormGroup;
  urlRegEx: string ='(http(s)?://.)?(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)';
  product: ProductAndKey =  {
      key: '',
      title: '',
      price: NaN,
      category: '',
      imageUrl: ''
  }
  test:string = "test";
  id:string | null = '';
  
  constructor(
    private fb: FormBuilder, 
    private categoryService: CategoryService, 
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.categories$ = this.categoryService.getAll();
    
    this.form = this.fb.group({
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
    // If new entry (instead of editing an entry)
    if (this.id == "new")
    {
      this.id = "";
    }
    if (this.id) 
    {
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

	save(form: FormGroup) {
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
		if (!confirm('Are you sure you want to delete this product?')) return;

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
  
  
