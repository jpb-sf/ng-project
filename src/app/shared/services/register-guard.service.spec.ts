import { TestBed } from '@angular/core/testing';

import { RegisterGuard } from './register-guard.service';

describe('RegisterGuard', () => {
  let service: RegisterGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
