import { TestBed, inject } from '@angular/core/testing';

import { ScdService } from './scd.service';

describe('ScdService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScdService]
    });
  });

  it('should be created', inject([ScdService], (service: ScdService) => {
    expect(service).toBeTruthy();
  }));
});
