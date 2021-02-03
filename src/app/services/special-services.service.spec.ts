import { TestBed } from '@angular/core/testing';

import { SpecialServicesService } from './special-services.service';

describe('SpecialServicesService', () => {
  let service: SpecialServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecialServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
