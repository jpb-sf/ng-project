import { Component, Input, Output, EventEmitter} from '@angular/core';
import { OrderService } from 'shared/services/order.service';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/shared/models/order';
import { formatDate } from '@angular/common';
import { ScreenBrightnessService } from 'shared/services/screen-brightness.service';
import { OrderViewService } from 'shared/services/order-view.service';
import { ResponsiveService } from 'shared/services/responsive.service';

@Component({
  selector: 'order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent {
  id: string = '';
  order?: Order;
  formattedDate: string = '';
  formattedTime: string = '';
  showAddress: boolean = false;
  @Output('deselectEvent') deselectEvent = new EventEmitter();
  @Input('orderIsSelected') orderIsSelected:boolean = false;
  @Input('swMediumOrSmaller') swMediumOrSmaller: boolean = false;

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
    
        if(this.order)
        {
          this.formattedDate = formatDate(this.order.datePlaced, 'MM/dd/yyyy', 'en-US');
          this.formattedTime = formatDate(this.order.datePlaced, 'hh:mm aa', 'en-US');
        }
      })
    })
  }

  onDropDown() {
    this.showAddress = !this.showAddress;
  }

  onDeselect()
  {
    this.orderViewService.changeOrderView(false);
    if (this.screenBrightness.darkenedScreen)
    {
        this.screenBrightness.changeBrightness();
    }
  }


}
