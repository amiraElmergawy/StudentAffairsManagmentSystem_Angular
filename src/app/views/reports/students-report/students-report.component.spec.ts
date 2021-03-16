import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsReportComponent } from './students-report.component';

describe('StudentsReportComponent', () => {
  let component: StudentsReportComponent;
  let fixture: ComponentFixture<StudentsReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentsReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
