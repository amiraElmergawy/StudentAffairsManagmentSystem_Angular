import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MajorShowComponent } from './major-show.component';

describe('MajorShowComponent', () => {
  let component: MajorShowComponent;
  let fixture: ComponentFixture<MajorShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MajorShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MajorShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
