import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkProgramsComponent } from './link-programs.component';

describe('LinkProgramsComponent', () => {
  let component: LinkProgramsComponent;
  let fixture: ComponentFixture<LinkProgramsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkProgramsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
