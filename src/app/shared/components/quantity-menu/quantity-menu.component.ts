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
  @Input('boxShadow') boxShadow: boolean = false;
  quantityInput: any;
  quantityForm: any;
  quantityFormBtn: any;
  
  ngAfterViewInit() {
    this.quantityForm = document.querySelector('#quantity-form');
    this.quantityInput = document.querySelector('#quantity-form-input');
    this.quantityFormBtn = document.querySelector('#quantity-form-button');
    if(this.quantityForm)
    { 
      this.quantityInput.focus();
    }
  }
  
  ngOnChanges(changes: SimpleChanges): void 
  {
    if(this.displayQuantityMenu && this.quantityInput && this.quantityForm
      && (document.activeElement !== this.quantityInput))
    {
      this.quantityForm.focus();
    }
  }

  addToCart(quantity?: number | HTMLElement) {
    if (quantity)
    {
      this.onAddToCart.emit(quantity);
    }
  }

  deselect() 
  {
    window.setTimeout(() => {
      if (document.activeElement != this.quantityInput &&
      document.activeElement != this.quantityForm)
      {
        this.onDeselect.emit();
      }
    }, 10)
  }

  onFocus()
  {
    this.quantityForm.focus();
  }
}
