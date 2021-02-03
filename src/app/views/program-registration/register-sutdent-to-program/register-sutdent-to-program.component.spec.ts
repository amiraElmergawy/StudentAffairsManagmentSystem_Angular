import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterSutdentToProgramComponent } from './register-sutdent-to-program.component';

describe('RegisterSutdentToProgramComponent', () => {
  let component: RegisterSutdentToProgramComponent;
  let fixture: ComponentFixture<RegisterSutdentToProgramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterSutdentToProgramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterSutdentToProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
