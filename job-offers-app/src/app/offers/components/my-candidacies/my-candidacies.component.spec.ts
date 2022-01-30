import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCandidaciesComponent } from './my-candidacies.component';

describe('MyCandidaciesComponent', () => {
  let component: MyCandidaciesComponent;
  let fixture: ComponentFixture<MyCandidaciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyCandidaciesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCandidaciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
