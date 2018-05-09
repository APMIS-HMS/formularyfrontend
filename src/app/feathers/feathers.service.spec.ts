import { TestBed, inject } from '@angular/core/testing';

import { SocketService, RestService } from './feathers.service';

describe('FeathersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SocketService]
    });
  });

  it('should be created', inject([SocketService], (service: SocketService) => {
    expect(service).toBeTruthy();
  }));
});
