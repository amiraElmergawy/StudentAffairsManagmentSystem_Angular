import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DivisionIndexComponent } from './division-index.component';

describe('DivisionIndexComponent', () => {
  let component: DivisionIndexComponent;
  let fixture: ComponentFixture<DivisionIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DivisionIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DivisionIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
