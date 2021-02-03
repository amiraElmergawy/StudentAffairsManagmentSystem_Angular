import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursePrerequisitesShowComponent } from './course-prerequisites-show.component';

describe('CoursePrerequisitesShowComponent', () => {
  let component: CoursePrerequisitesShowComponent;
  let fixture: ComponentFixture<CoursePrerequisitesShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursePrerequisitesShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursePrerequisitesShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
