import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentIndexComponent } from './department-index.component';

describe('DepartmentIndexComponent', () => {
  let component: DepartmentIndexComponent;
  let fixture: ComponentFixture<DepartmentIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
