import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RetrieveUserSecretsService {
  constructor(private http: HttpClient) {}

  /**
   * Retrieve user secrets from the server
   * @param userId The user id
   */
  retrieveUserSecrets(userId: string): Observable<any> {
    return this.http.get(`/api/user/${userId}`);
  }
}
