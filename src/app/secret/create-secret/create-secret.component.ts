import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

import { CreateSecretServiceService } from './create-secret-service.service';

@Component({
  selector: 'app-create-secret',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    CommonModule,
  ],
  providers: [CreateSecretServiceService],
  templateUrl: './create-secret.component.html',
  styleUrl: './create-secret.component.css',
})
export class CreateSecretComponent {
  public expirationOptions = [
    { expiration: 3600, name: 'Hour' },
    { expiration: 86400, name: 'Day' },
    { expiration: 604800, name: 'Week' },
    { expiration: 1209600, name: 'Two weeks' },
  ];

  secret: string;
  expiration = this.expirationOptions[2].expiration;
  shareSecretUri = '';
  shareSecretKey: undefined | string;

  constructor(private createSecretService: CreateSecretServiceService) {
    this.secret = '';
  }

  createSecret() {
    this.createSecretService
      .createSecret(this.secret, this.expiration)
      .subscribe({
        next: (v) => {
          let object = JSON.parse(v);
          this.shareSecretUri = object.uri;
          this.shareSecretKey = object.key;
        },
        error: (e) => console.error(e),
        complete: () => {
          console.info('Share secret URI: ', this.shareSecretUri);
          console.info('Share secret key: ', this.shareSecretKey);
        }
      });
  }
}
