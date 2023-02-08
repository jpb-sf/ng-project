import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopPromoComponent } from './top-promo.component';

describe('TopPromoComponent', () => {
  let component: TopPromoComponent;
  let fixture: ComponentFixture<TopPromoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopPromoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopPromoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
