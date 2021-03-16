import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoLongerAvailablePageComponent } from './no-longer-available-page.component';

describe('NoLongerAvailablePageComponent', () => {
  let component: NoLongerAvailablePageComponent;
  let fixture: ComponentFixture<NoLongerAvailablePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoLongerAvailablePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoLongerAvailablePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
