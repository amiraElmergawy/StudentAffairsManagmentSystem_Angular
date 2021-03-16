import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageHoursBalancComponent } from './manage-hours-balanc.component';

describe('ManageHoursBalancComponent', () => {
  let component: ManageHoursBalancComponent;
  let fixture: ComponentFixture<ManageHoursBalancComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageHoursBalancComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageHoursBalancComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
