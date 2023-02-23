import { TestBed } from '@angular/core/testing';

import { OrderViewService} from './order-view.service';

describe('OrderViewService', () => {
  let service: OrderViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
