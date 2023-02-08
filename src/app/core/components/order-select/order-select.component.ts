import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from 'shared/services/order.service';
import { Order } from 'src/app/shared/models/order';
import { Observable, Subject, Subscription } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { Route, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'order-select',
    templateUrl: './order-select.component.html',
    styleUrls: ['./order-select.component.scss']
  })

export class OrderSelectComponent  implements OnDestroy, OnInit {
  orders: Order[] = []; 
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  orderDisplay: 'admin' | 'my' | undefined;
  subscription: Subscription = new Subscription;
  @ViewChild(DataTableDirective, {static: false} )
  dtElement!: DataTableDirective;
  isDtInitialized:boolean = false;
  key: string | undefined = '';
  baseroute?: string;
  orderServiceMethod!: Observable<Order[]>;
  
  constructor(private orderService: OrderService, private route: ActivatedRoute) {
    this.baseroute = this.route.snapshot.url.join('/').slice(0,5);
  }
  ngOnInit(): void {

      if(this.baseroute == 'admin')
      {
        this.orderServiceMethod = this.orderService.getAll();
        this.orderDisplay = 'admin';
      }
      if (this.baseroute == 'my-or')
      {
        this.orderServiceMethod = this.orderService.getAllByUser();
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
