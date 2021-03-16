import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCreateBillComponent } from './student-create-bill.component';

describe('StudentCreateBillComponent', () => {
  let component: StudentCreateBillComponent;
  let fixture: ComponentFixture<StudentCreateBillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentCreateBillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentCreateBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
