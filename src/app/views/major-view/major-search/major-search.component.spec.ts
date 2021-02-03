import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MajorSearchComponent } from './major-search.component';

describe('MajorSearchComponent', () => {
  let component: MajorSearchComponent;
  let fixture: ComponentFixture<MajorSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MajorSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MajorSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
