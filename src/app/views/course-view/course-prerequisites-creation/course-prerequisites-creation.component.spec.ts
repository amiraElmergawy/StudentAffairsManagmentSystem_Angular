import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursePrerequisitesCreationComponent } from './course-prerequisites-creation.component';

describe('CoursePrerequisitesCreationComponent', () => {
  let component: CoursePrerequisitesCreationComponent;
  let fixture: ComponentFixture<CoursePrerequisitesCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursePrerequisitesCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursePrerequisitesCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
