import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DivisionShowComponent } from './division-show.component';

describe('DivisionShowComponent', () => {
  let component: DivisionShowComponent;
  let fixture: ComponentFixture<DivisionShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DivisionShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DivisionShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
