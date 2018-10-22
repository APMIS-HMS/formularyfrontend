import { TestBed, inject } from '@angular/core/testing';

import { DoseFormsService } from './dose-forms.service';

describe('DoseFormsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DoseFormsService]
    });
  });

  it('should be created', inject([DoseFormsService], (service: DoseFormsService) => {
    expect(service).toBeTruthy();
  }));
});
