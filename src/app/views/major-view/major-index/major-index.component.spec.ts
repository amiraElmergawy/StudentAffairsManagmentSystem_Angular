import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MajorIndexComponent } from './major-index.component';

describe('MajorIndexComponent', () => {
  let component: MajorIndexComponent;
  let fixture: ComponentFixture<MajorIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MajorIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MajorIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
