import { TestBed } from '@angular/core/testing';

import { DisplayCartService } from './display-cart.service';

describe('DisplayCartService', () => {
  let service: DisplayCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisplayCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
