import { TestBed } from '@angular/core/testing';

import { ScreenBrightnessService } from './screen-brightness.service';

describe('ScreenBrightnessService', () => {
  let service: ScreenBrightnessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScreenBrightnessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
