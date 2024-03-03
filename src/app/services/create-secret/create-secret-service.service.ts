import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreateSecretServiceService {
  constructor(private http: HttpClient) {}

  /**
   * Create a secret on the server
   * @param secret the secret text to be encrypted
   * @param expiration the expiration time for the secret
   * @returns nothing
   */
  createSecret(secret: string, expiration: number): Observable<any> {
    const formdata = new FormData();
    formdata.append('password', secret);
    formdata.append('ttl', 'week');

    return this.http.post('/api', formdata, { responseType: 'text' })
  }
}
