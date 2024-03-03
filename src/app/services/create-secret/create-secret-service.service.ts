import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreateSecretServiceService {
  constructor(private http: HttpClient) {}

  createSecret(secret: string, expiration: number): Observable<any> {
    const formdata = new FormData();
    formdata.append('password', secret);
    formdata.append('ttl', 'week');

    return this.http.post('/api', formdata, { responseType: 'text' })
  }
}
