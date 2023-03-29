import { Component, ViewChild, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { OrderService } from 'shared/services/order.service';
import { Order } from 'src/app/shared/models/order';
import { Observable, Subject, Subscription } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { ActivatedRoute } from '@angular/router';
import { ScreenBrightnessService } from 'shared/services/screen-brightness.service';
import { OrderViewService } from 'shared/services/order-view.service';

@Component({
    selector: 'order-select',
    templateUrl: './order-select.component.html',
    styleUrls: ['./order-select.component.scss']
  })

export class OrderSelectComponent  implements OnDestroy, OnInit {
  @ViewChild(DataTableDirective, {static: false} )
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  dtElement!: DataTableDirective;
  isDtInitialized:boolean = false;
  
  orders: Order[] = []; 
  orderDisplay: 'admin' | 'my' | undefined;
  subscription: Subscription = new Subscription;
  key: string | undefined = '';
  baseroute?: string;
  orderServiceMethod!: Observable<Order[]>;
  @Input('swMediumOrSmaller') swMediumOrSmaller: boolean = false;
  
  constructor(
    private orderService: OrderService, 
    private route: ActivatedRoute,
    private screenBrightness: ScreenBrightnessService,
    private orderViewService: OrderViewService) {
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
    .subscribe((orders: Order[]) => {
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
  
  viewOrder(key: string | undefined)
  {
    console.log(`viewOrder() is being called from order-select.comp`);
    // set key for highlighting class in template
    this.key = key;
    this.orderViewService.changeOrderView(true);
    if (this.swMediumOrSmaller) {
        this.screenBrightness.changeBrightness();
    }
  }
}
