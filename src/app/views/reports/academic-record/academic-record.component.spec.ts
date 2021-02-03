import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicRecordComponent } from './academic-record.component';

describe('AcademicRecordComponent', () => {
  let component: AcademicRecordComponent;
  let fixture: ComponentFixture<AcademicRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcademicRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademicRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
