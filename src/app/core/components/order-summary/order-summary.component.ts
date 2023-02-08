import { Component} from '@angular/core';
import { OrderService } from 'shared/services/order.service';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/shared/models/order';

@Component({
  selector: 'order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent {
  id: string = '';
  order?: Order;
  orderIsSelected:boolean = false;

  constructor (
    private orderService: OrderService,
    private route: ActivatedRoute
    ) {
    
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
        console.log(`g`)
        console.log(this.order)
        if (this.order?.orderId)
        {
          console.log('o')
          this.orderIsSelected = true;
        }
        console.log(this.order)
      })
    })
  }


}
