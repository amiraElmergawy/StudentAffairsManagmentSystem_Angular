import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramIndexComponent } from './program-index.component';

describe('ProgramIndexComponent', () => {
  let component: ProgramIndexComponent;
  let fixture: ComponentFixture<ProgramIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
