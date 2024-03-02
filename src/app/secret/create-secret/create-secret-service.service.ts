import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreateSecretServiceService {

  constructor() { }

  createSecret(secret: string, expiration: number) {
    console.log('Creating secret', secret, 'with expiration', expiration);
  }
}
