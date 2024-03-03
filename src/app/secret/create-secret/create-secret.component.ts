import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// MaterialUI
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

// Constants
import { EXPIRATION_OPTIONS } from '../contants';

// Services
import { CreateSecretServiceService } from '../../services/create-secret-service/create-secret-service.service';
import { CopyToClipboardService } from '../../services/copy-to-clipboard-service/copy-to-clipboard.service';

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
  expiration = EXPIRATION_OPTIONS[2].expiration;
  generateButtonDisabled: boolean = true;
  secret: undefined | string;
  shareSecretUri: undefined | string;
  shareSecretKey: undefined | string;
  uriCopiedToClipboard: boolean = false;

  constructor(
    private createSecretService: CreateSecretServiceService,
    private copyToClipboardService: CopyToClipboardService
  ) {}

  copyUriToClipboard() {
    if(this.shareSecretUri) {
      this.copyToClipboardService.copyToClipboard(this.shareSecretUri);
      this.uriCopiedToClipboard = true;
    }
  }

  getExpirationOptions() {
    return EXPIRATION_OPTIONS;
  }

  onSecretChange() {
    this.toggleButtonDisabled(false);
  }

  toggleButtonDisabled(disabled: boolean) {
    this.generateButtonDisabled = disabled;
  }

  createSecret() {
    if(!this.secret) {
      return;
    }

    this.toggleButtonDisabled(true);
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
          // TODO: add pretty alert here instead of console.log...
        }
      });
  }
}
