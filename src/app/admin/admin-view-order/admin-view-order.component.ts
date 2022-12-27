import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Order } from 'src/models/order';

@Component({
  selector: 'admin-view-order',
  templateUrl: './admin-view-order.component.html',
  styleUrls: ['./admin-view-order.component.scss']
})
export class AdminViewOrderComponent implements OnInit {
  id: string = '';
  order?: Order;
  orderIsSelected:boolean = false;

  constructor (
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router) {
    
    this.route.paramMap
    .subscribe((param) => {
      let id = param.get('id');
      if(id)
      {
        this.id = id;
      }
      this.orderService.getOrder(this.id)
      .subscribe(order => {
        this.order = order;
        // Check if order exists
        if (this.order?.key)
        {
          this.orderIsSelected = true;
        }
        console.log(this.order)
      })
    })
  }
  


  ngOnInit() {
 
  }

}
