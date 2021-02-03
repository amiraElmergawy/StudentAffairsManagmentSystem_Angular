import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramShowComponent } from './program-show.component';

describe('ProgramShowComponent', () => {
  let component: ProgramShowComponent;
  let fixture: ComponentFixture<ProgramShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
