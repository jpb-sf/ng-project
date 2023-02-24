import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenBrightnessComponent } from './screen-brightness.component';

describe('ScreenBrightnessComponent', () => {
  let component: ScreenBrightnessComponent;
  let fixture: ComponentFixture<ScreenBrightnessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScreenBrightnessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScreenBrightnessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
