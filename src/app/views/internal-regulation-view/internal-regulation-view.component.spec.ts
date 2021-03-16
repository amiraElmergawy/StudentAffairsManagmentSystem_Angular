import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalRegulationViewComponent } from './internal-regulation-view.component';

describe('InternalRegulationViewComponent', () => {
  let component: InternalRegulationViewComponent;
  let fixture: ComponentFixture<InternalRegulationViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternalRegulationViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalRegulationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
