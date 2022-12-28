import { Component, ViewChild, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/models/order';
import { Subject, Subscription } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnDestroy, OnInit {
  orders: Order[] = []; 
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  subscription: Subscription = new Subscription;
  @ViewChild(DataTableDirective, {static: false} )
  dtElement!: DataTableDirective;
  isDtInitialized:boolean = false;
  key: string | undefined = '';
  
  constructor(private orderService: OrderService) {}
  ngOnInit(): void {
   
      this.subscription = this.orderService.getAll()
      .subscribe(orders => {
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