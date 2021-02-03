import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentShowComponent } from './department-show.component';

describe('DepartmentShowComponent', () => {
  let component: DepartmentShowComponent;
  let fixture: ComponentFixture<DepartmentShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
