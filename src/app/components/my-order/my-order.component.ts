import { Component, OnInit, ViewChild} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/models/order';

@Component({
  selector: 'my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.scss']
})
export class MyOrderComponent implements OnInit {
    orders: Order[] = []; 
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject<any>();
    subscription: Subscription = new Subscription;
    @ViewChild(DataTableDirective, { static: false })
    dtElement!: DataTableDirective;
    isDtInitialized:boolean = false;
    key: string | undefined = '';
    
    constructor(private orderService: OrderService) {}
    ngOnInit(): void {
        
        this.subscription = this.orderService.getAllByUser()
        .subscribe((orders:any) => {
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