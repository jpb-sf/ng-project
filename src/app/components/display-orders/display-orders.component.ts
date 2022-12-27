import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/models/order';
import { Subject, Subscription } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { Route, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'display-orders',
    templateUrl: './display-orders.component.html',
    styleUrls: ['./display-orders.component.scss']
  })

export class DisplayOrdersComponent  implements OnDestroy, OnInit {
  orders: Order[] = []; 
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  subscription: Subscription = new Subscription;
  @ViewChild(DataTableDirective, {static: false} )
  dtElement!: DataTableDirective;
  isDtInitialized:boolean = false;
  key: string | undefined = '';
  baseroute?: string;
  orderServiceMethod: any;
  orderDisplay: 'admin' | 'my' | undefined;
  
  constructor(private orderService: OrderService, private route: ActivatedRoute) {
    this.baseroute = this.route.snapshot.url.join('/').slice(0,5);
  }
  ngOnInit(): void {

      if(this.baseroute === 'admin')
      {
        this.orderServiceMethod = this.orderService.getAll()
        this.orderDisplay = 'admin';
      }
      else {
        this.orderServiceMethod = this.orderService.getAllMyOrders();
        this.orderDisplay = 'my';
      }
      
      this.subscription = this.orderServiceMethod
      .subscribe((orders: any) => {
        this.orders = orders;
        if (this.isDtInitialized)
        {
          this.dtElement.dtInstance
          .then((dtInstance: DataTables.Api) => {
              dtInstance.destroy();
              this.dtTrigger.next(orders);
          })
        } else {
          this.isDtInitialized = true;
          this.dtTrigger.next(orders);      
        }
        for (let order of this.orders)
        {
           console.log(order.key)
        }
      })
    }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.dtTrigger.unsubscribe();
  }
  
  getOrderKey(key: string | undefined)
  {
    this.key = key;
  }
}
