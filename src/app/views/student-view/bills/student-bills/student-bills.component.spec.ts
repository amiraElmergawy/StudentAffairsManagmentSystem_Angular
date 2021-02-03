import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentBillsComponent } from './student-bills.component';

describe('StudentBillsComponent', () => {
  let component: StudentBillsComponent;
  let fixture: ComponentFixture<StudentBillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentBillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
