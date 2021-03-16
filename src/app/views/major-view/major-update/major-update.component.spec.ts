import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MajorUpdateComponent } from './major-update.component';

describe('MajorUpdateComponent', () => {
  let component: MajorUpdateComponent;
  let fixture: ComponentFixture<MajorUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MajorUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MajorUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
