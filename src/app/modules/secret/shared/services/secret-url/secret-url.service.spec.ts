import { TestBed } from '@angular/core/testing';

import { SecretUrlService } from './secret-url.service';

describe('SecretUrlService', () => {
  let service: SecretUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecretUrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
