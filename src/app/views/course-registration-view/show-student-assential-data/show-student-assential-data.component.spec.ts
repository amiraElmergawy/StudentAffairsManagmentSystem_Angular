import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowStudentAssentialDataComponent } from './show-student-assential-data.component';

describe('ShowStudentAssentialDataComponent', () => {
  let component: ShowStudentAssentialDataComponent;
  let fixture: ComponentFixture<ShowStudentAssentialDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowStudentAssentialDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowStudentAssentialDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
