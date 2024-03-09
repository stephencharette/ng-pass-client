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
   * @param expiration the expiration time for the secret (e.g. 'week' or 'day' or 'hour')
   * @returns nothing
   */
  createSecret(secret: string, expiration: string): Observable<any> {
    const formdata = new FormData();
    formdata.append('password', secret);
    formdata.append('ttl', expiration);

    return this.http.post('/api', formdata, { responseType: 'text' })
  }
}
