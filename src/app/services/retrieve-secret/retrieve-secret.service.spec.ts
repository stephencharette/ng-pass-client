import { TestBed } from '@angular/core/testing';

import { RetrieveSecretService } from './retrieve-secret.service';

describe('RetrieveSecretService', () => {
  let service: RetrieveSecretService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RetrieveSecretService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
