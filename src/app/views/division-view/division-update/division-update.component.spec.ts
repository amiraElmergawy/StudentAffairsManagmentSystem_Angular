import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DivisionUpdateComponent } from './division-update.component';

describe('DivisionUpdateComponent', () => {
  let component: DivisionUpdateComponent;
  let fixture: ComponentFixture<DivisionUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DivisionUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DivisionUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
