import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// MaterialUI
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

// Constants
import { EXPIRATION_OPTIONS } from '../contants';

// Services
import { CreateSecretServiceService } from '../../services/create-secret/create-secret-service.service';
import { CopyToClipboardService } from '../../services/copy-to-clipboard/copy-to-clipboard.service';
import { SnackBarService } from '../../services/snack-bar/snack-bar.service';

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
    MatIconModule
  ],
  providers: [CreateSecretServiceService],
  templateUrl: './create-secret.component.html',
  styleUrl: './create-secret.component.css',
})
export class CreateSecretComponent {
  expiration = EXPIRATION_OPTIONS[2].expiration;
  failure: boolean = false;
  generateButtonDisabled: boolean = true;
  secret: undefined | string;
  shareSecretUri: undefined | string;
  shareSecretKey: undefined | string;

  constructor(
    private createSecretService: CreateSecretServiceService,
    private copyToClipboardService: CopyToClipboardService,
    private snackBarService: SnackBarService
  ) {}

  /**
   * Copy the secret URI to the clipboard
   */
  copyUriToClipboard() {
    if (this.shareSecretUri) {
      this.copyToClipboardService.copyToClipboard(this.shareSecretUri);
      this.snackBarService.openSnackBar('URL copied to clipboard', 'Close', { duration: 3000 });
    }
  }

  /**
   * Get the expiration options
   * @returns expiration options
   */
  getExpirationOptions() {
    return EXPIRATION_OPTIONS;
  }

  /**
   * Handle the secret change event
   */
  onSecretChange() {
    this.toggleGenerateButtonDisabled(false);
  }

  /**
   * Toggle the generate button's disabled state
   * @param disabled whether the button should be disabled or not
   */
  toggleGenerateButtonDisabled(disabled: boolean) {
    this.generateButtonDisabled = disabled;
  }

  /**
   * Toggle the failure state
   * @param toggle whether the failure state should be toggled or not
   */
  toggleFailureState(toggle: boolean) {
    this.failure = toggle;
    this.toggleGenerateButtonDisabled(!toggle);
  }

  /**
   * Set the secret uri and key to service response, disable the button, and log the response
   * @returns nothing
   */
  createSecret() {
    if (!this.secret) {
      return;
    }

    this.toggleGenerateButtonDisabled(true);
    this.createSecretService
      .createSecret(this.secret, this.expiration)
      .subscribe({
        next: (v) => {
          let object = JSON.parse(v);
          this.shareSecretUri = object.uri;
          this.shareSecretKey = object.key;
        },
        error: (e) => {
          this.toggleFailureState(true);
        },
        complete: () => {
          this.toggleFailureState(false);
          console.info('Share secret URI: ', this.shareSecretUri);
          console.info('Share secret key: ', this.shareSecretKey);
          // TODO: add pretty alert here instead of console.log...
        },
      });
  }
}
