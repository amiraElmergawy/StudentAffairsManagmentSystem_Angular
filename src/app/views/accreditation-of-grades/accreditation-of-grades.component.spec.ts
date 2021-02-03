import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccreditationOfGradesComponent } from './accreditation-of-grades.component';

describe('AccreditationOfGradesComponent', () => {
  let component: AccreditationOfGradesComponent;
  let fixture: ComponentFixture<AccreditationOfGradesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccreditationOfGradesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccreditationOfGradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
