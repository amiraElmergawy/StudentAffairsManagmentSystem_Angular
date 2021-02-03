import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBillComponent } from './update-bill.component';

describe('UpdateBillComponent', () => {
  let component: UpdateBillComponent;
  let fixture: ComponentFixture<UpdateBillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateBillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
