import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DivisionSearchComponent } from './division-search.component';

describe('DivisionSearchComponent', () => {
  let component: DivisionSearchComponent;
  let fixture: ComponentFixture<DivisionSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DivisionSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DivisionSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
