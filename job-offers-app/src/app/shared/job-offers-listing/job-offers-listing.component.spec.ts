import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobOffersListingComponent } from './job-offers-listing.component';

describe('JobOffersListingComponent', () => {
  let component: JobOffersListingComponent;
  let fixture: ComponentFixture<JobOffersListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobOffersListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobOffersListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
