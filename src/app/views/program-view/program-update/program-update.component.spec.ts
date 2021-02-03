import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramUpdateComponent } from './program-update.component';

describe('ProgramUpdateComponent', () => {
  let component: ProgramUpdateComponent;
  let fixture: ComponentFixture<ProgramUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
