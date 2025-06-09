import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateSecretRequest } from '../../../create-secret/models/create-secret-request';
import { CreateSecretResponse } from '../../../create-secret/models/create-secret-response';
import { RevealSecretRequest } from '../../../reveal-secret/models/reveal-secret-request';
import { RevealSecretResponse } from '../../../reveal-secret/models/reveal-secret-response';
import { SecretGridResponse } from '../../../secret-management/models/secret-grid-response';

@Injectable({
  providedIn: 'root',
})
export class SecretService {
  constructor(private http: HttpClient) {}

  createSecret(request: CreateSecretRequest): Observable<CreateSecretResponse> {
    return this.http.post<CreateSecretResponse>('api/secrets', request);
  }

  revealSecret(request: RevealSecretRequest): Observable<RevealSecretResponse> {
    return this.http.post<RevealSecretResponse>('api/secrets/reveal', request);
  }

  getSecretsCreatedByUser(): Observable<SecretGridResponse[]> {
    return this.http.get<SecretGridResponse[]>('api/secrets');
  }
}
