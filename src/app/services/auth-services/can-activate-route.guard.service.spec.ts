import { TestBed } from '@angular/core/testing';

import { CanActivateRoute.GuardService } from './can-activate-route.guard.service';

describe('CanActivateRoute.GuardService', () => {
  let service: CanActivateRoute.GuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanActivateRoute.GuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
