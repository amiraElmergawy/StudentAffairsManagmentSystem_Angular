import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationIndexComponent } from './registration-index.component';

describe('RegistrationIndexComponent', () => {
  let component: RegistrationIndexComponent;
  let fixture: ComponentFixture<RegistrationIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
