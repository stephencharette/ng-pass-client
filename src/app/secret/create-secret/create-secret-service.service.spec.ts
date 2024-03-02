import { TestBed } from '@angular/core/testing';

import { CreateSecretServiceService } from './create-secret-service.service';

describe('CreateSecretServiceService', () => {
  let service: CreateSecretServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateSecretServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
