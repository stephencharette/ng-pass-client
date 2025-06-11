import { TestBed } from '@angular/core/testing';
import { SecretsSignalRService } from './secrets-signal-r.service';

describe('SecretsSignalRService', () => {
  let service: SecretsSignalRService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecretsSignalRService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
