import { Component,  OnInit, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { ResponsiveService } from 'shared/services/responsive.service';


@Component({
  selector: 'products-nav',
  templateUrl: './products-nav.component.html',
  styleUrls: ['./products-nav.component.scss']
})
export class ProductsNavComponent implements OnInit {
    @Input('show') show?: boolean;
    faBars = faBars; 
    category: any = '';
    currentBreakingPoint!: string;
    scrollY: number = NaN;
    
    constructor(
      private route: ActivatedRoute, 
      private responsiveService: ResponsiveService) {
        this.responsiveService.mediaBreakpoint$
        .subscribe((bp: string) => {
          this.currentBreakingPoint = bp;
        })
    }
  
    async ngOnInit()  {
        this.route.queryParamMap
        .subscribe(params => {
            this.category = params.get('category')
      })
    }

    _setScrollY(scroll: any) {
        console.log(scroll);
        this.scrollY = window.scrollY;
    }
    
    get window(): any {
        return window;
    }

}