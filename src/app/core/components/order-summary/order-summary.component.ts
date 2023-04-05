import { Component, Input, Output, EventEmitter, OnDestroy} from '@angular/core';
import { OrderService } from 'shared/services/order.service';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/shared/models/order';
import { formatDate } from '@angular/common';
import { ScreenBrightnessService } from 'shared/services/screen-brightness.service';
import { OrderViewService } from 'shared/services/order-view.service';

@Component({
  selector: 'order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnDestroy{
  id: string = '';
  order?: Order;
  formattedDate: string = '';
  formattedTime: string = '';
  showAddress: boolean = false;
  @Output('deselectEvent') deselectEvent = new EventEmitter();
  @Input('orderIsSelected') orderIsSelected:boolean = false;
  @Input('swMediumOrSmaller') swMediumOrSmaller: boolean = false;
  @Input('displayCart') displayCart: boolean = false;

  constructor (
    private orderService: OrderService,
    private route: ActivatedRoute,
    private screenBrightness: ScreenBrightnessService,
    private orderViewService: OrderViewService
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
        console.log(`order summary component calling getOrder() sets this.order to ${this.order}`);
        if(this.order?.order)
        {
          this.formattedDate = formatDate(this.order.datePlaced, 'MM/dd/yyyy', 'en-US');
          this.formattedTime = formatDate(this.order.datePlaced, 'hh:mm aa', 'en-US');
        }
      })
    })
  }

  ngOnDestroy(): void {
    console.log(`ngOnDestroy`);
    this.orderViewService.changeOrderView(false);
  }

  onDropDown() {
    this.showAddress = !this.showAddress;
  }

  onDeselect()
  {
    console.log(`onDeselect() is being called from order-summary.comp`);
    this.orderViewService.changeOrderView(false);
    if (this.screenBrightness.darkenedScreen)
    {
        this.screenBrightness.changeBrightness();
    }
  }


}
