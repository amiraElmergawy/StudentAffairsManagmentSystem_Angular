import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccreditationCancelComponent } from './accreditation-cancel.component';

describe('AccreditationCancelComponent', () => {
  let component: AccreditationCancelComponent;
  let fixture: ComponentFixture<AccreditationCancelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccreditationCancelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccreditationCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
