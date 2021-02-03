import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramLinkParentComponent } from './program-link-parent.component';

describe('ProgramLinkParentComponent', () => {
  let component: ProgramLinkParentComponent;
  let fixture: ComponentFixture<ProgramLinkParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramLinkParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramLinkParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
