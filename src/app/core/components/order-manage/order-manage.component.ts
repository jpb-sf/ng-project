import { Component, OnInit } from '@angular/core';
import { OrderService } from 'shared/services/order.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Order } from 'src/app/shared/models/order';

@Component({
  selector: 'order-manage',
  templateUrl: './order-manage.component.html',
  styleUrls: ['./order-manage.component.scss']
})
export class OrderManageComponent implements OnInit {
  baseroute: string = '';
  orderDisplay: 'admin' | 'my' | undefined;

  constructor(private orderService: OrderService, private route: ActivatedRoute) {
    this.baseroute = this.route.snapshot.url.join('/').slice(0,5);
  }

  ngOnInit(): void {
    if(this.baseroute == 'admin')
    {
      console.log(this.baseroute)
      this.orderDisplay = 'admin';
    }
 
    if (this.baseroute == 'my-or')
    {
      console.log(this.baseroute)
      this.orderDisplay = 'my';
    }
  }

}
