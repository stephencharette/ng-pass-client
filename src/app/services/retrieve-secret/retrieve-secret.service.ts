import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RetrieveSecretService {
  constructor(private http: HttpClient) {}

  retrieveSecret(key: string): Observable<any> {
    return this.http.get(`/api/password/${key}`);
  }
}
