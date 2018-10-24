import { TestBed, inject } from '@angular/core/testing';

import { StrengthUnitsService } from './strength-units.service';

describe('StrengthUnitsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StrengthUnitsService]
    });
  });

  it('should be created', inject([StrengthUnitsService], (service: StrengthUnitsService) => {
    expect(service).toBeTruthy();
  }));
});
