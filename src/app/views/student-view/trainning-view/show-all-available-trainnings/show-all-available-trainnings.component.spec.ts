import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllAvailableTrainningsComponent } from './show-all-available-trainnings.component';

describe('ShowAllAvailableTrainningsComponent', () => {
  let component: ShowAllAvailableTrainningsComponent;
  let fixture: ComponentFixture<ShowAllAvailableTrainningsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowAllAvailableTrainningsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAllAvailableTrainningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
