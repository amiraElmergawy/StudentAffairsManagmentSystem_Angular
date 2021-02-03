import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentTrainningCreationComponent } from './student-trainning-creation.component';

describe('StudentTrainningCreationComponent', () => {
  let component: StudentTrainningCreationComponent;
  let fixture: ComponentFixture<StudentTrainningCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentTrainningCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentTrainningCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
