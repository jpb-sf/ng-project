import { TestBed } from '@angular/core/testing';

import { EmptyCartGuard } from './empty-cart-guard.service';

describe('EmptyCartGuard', () => {
  let service: EmptyCartGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmptyCartGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
