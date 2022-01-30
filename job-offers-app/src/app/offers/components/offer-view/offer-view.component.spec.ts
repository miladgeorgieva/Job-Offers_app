import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferViewComponent } from './offer-view.component';

describe('JobOfferViewComponent', () => {
  let component: OfferViewComponent;
  let fixture: ComponentFixture<OfferViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
