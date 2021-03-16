import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTrainningComponent } from './delete-trainning.component';

describe('DeleteTrainningComponent', () => {
  let component: DeleteTrainningComponent;
  let fixture: ComponentFixture<DeleteTrainningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteTrainningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTrainningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
