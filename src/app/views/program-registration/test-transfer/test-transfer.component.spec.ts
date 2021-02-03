import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestTransferComponent } from './test-transfer.component';

describe('TestTransferComponent', () => {
  let component: TestTransferComponent;
  let fixture: ComponentFixture<TestTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestTransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
