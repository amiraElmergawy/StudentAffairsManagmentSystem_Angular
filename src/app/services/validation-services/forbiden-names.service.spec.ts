import { TestBed } from '@angular/core/testing';

import { ForbidenNamesService } from './forbiden-names.service';

describe('ForbidenNamesService', () => {
  let service: ForbidenNamesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForbidenNamesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
