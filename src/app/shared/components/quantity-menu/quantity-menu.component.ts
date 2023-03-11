import { Component, Output, Input, EventEmitter, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'quantity-menu',
  templateUrl: './quantity-menu.component.html',
  styleUrls: ['./quantity-menu.component.scss']
})
export class QuantityMenuComponent implements AfterViewInit, OnChanges {
  @Output('onDeselect') onDeselect = new EventEmitter;
  @Output('onAddtoCart')onAddToCart = new EventEmitter;
  @Input('displayQuantityMenu') displayQuantityMenu: boolean = false;
  quantityInput: any;
  quantityForm: any;
  quantityFormBtn: any;
  
  ngAfterViewInit(){
    this.quantityInput = document.querySelector('#quantity-form-input');
    this.quantityForm = document.querySelector('#quantity-form-input');
    this.quantityFormBtn = document.querySelector('#quantity-form-button');
    this.quantityForm.focus();
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if(this.displayQuantityMenu && (document.activeElement !== this.quantityInput))
    {
      this.quantityForm.focus();
    }
  }

  addToCart(quantity?: number | HTMLElement) {
    console.log(`add to cart`);
    console.log(quantity);
    if (quantity)
    {
      this.onAddToCart.emit(quantity);
    }
  }

  deselect() 
  {
    window.setTimeout(() => {
      console.log(document.activeElement)
      if ((document.activeElement !== this.quantityInput) ||
      (document.activeElement !== this.quantityForm))
      {
        this.onDeselect.emit();
      }
    },10)
  }

  onFocus()
  {
    console.log(document.activeElement)
    this.quantityForm.focus();
  }
}
