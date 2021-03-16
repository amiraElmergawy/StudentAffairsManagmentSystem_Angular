import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsLowGpaComponent } from './students-low-gpa.component';

describe('StudentsLowGpaComponent', () => {
  let component: StudentsLowGpaComponent;
  let fixture: ComponentFixture<StudentsLowGpaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentsLowGpaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsLowGpaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
