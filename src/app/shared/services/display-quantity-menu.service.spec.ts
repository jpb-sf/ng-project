import { TestBed } from '@angular/core/testing';

import { DisplayQuantityMenuService } from './display-quantity-menu.service';

describe('DisplayQuantityMenuService', () => {
  let service: DisplayQuantityMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisplayQuantityMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
