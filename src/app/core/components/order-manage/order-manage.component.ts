import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResponsiveService } from 'shared/services/responsive.service';
import { OrderViewService } from 'shared/services/order-view.service';

@Component({
  selector: 'order-manage',
  templateUrl: './order-manage.component.html',
  styleUrls: ['./order-manage.component.scss']
})
export class OrderManageComponent implements OnInit {
  baseroute: string = '';
  orderDisplay: 'admin' | 'my' | undefined;
  swMediumOrSmaller: boolean = false;
  orderIsSelected : boolean = false;
//   orderView: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private responsiveService: ResponsiveService,
    private orderViewService: OrderViewService) {
    this.baseroute = this.route.snapshot.url.join('/').slice(0,5);
  }

  ngOnInit(): void {

    this.orderViewService.orderView$
    .subscribe((orderView: any) => {
        this.orderIsSelected = orderView;
    })
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

    this.responsiveService.swMediumOrSmaller$
    .subscribe((sw: true | false) => {
        this.swMediumOrSmaller = sw;
    })

   
  }

}
