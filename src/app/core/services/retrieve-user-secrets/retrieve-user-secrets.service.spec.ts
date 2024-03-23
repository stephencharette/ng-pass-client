import { TestBed } from '@angular/core/testing';

import { RetrieveUserSecretsService } from './retrieve-user-secrets.service';

describe('RetrieveUserSecretsService', () => {
  let service: RetrieveUserSecretsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RetrieveUserSecretsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
