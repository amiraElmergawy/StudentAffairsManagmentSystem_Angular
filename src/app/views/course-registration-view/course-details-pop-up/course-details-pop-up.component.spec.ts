import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDetailsPopUpComponent } from './course-details-pop-up.component';

describe('CourseDetailsPopUpComponent', () => {
  let component: CourseDetailsPopUpComponent;
  let fixture: ComponentFixture<CourseDetailsPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseDetailsPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseDetailsPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
