import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramLinkCoursesComponent } from './program-link-courses.component';

describe('ProgramLinkCoursesComponent', () => {
  let component: ProgramLinkCoursesComponent;
  let fixture: ComponentFixture<ProgramLinkCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramLinkCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramLinkCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
