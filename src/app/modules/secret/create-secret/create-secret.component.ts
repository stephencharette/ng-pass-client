import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { DEFAULT_SECRET_EXPIRATION, SECRET_EXPIRATION_OPTIONS } from '../shared/constants/secret-expiration-options';
import { CopyToClipboardService } from '../../../core/services/copy-to-clipboard/copy-to-clipboard.service';
import { SnackBarService } from '../../../core/services/snack-bar/snack-bar.service';
import { SecretService } from '../shared/services/secret-service/secret.service';
import { CreateSecretRequest } from '../create-secret/models/create-secret-request';
import { FormGroupType } from '../../../core/models/form-group-type';
import { Subject, takeUntil, tap } from 'rxjs';
import { CreateSecretResponse } from './models/create-secret-response';

@Component({
    selector: 'app-create-secret',
    imports: [
        MatFormField,
        MatLabel,
        MatSelectModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
        FormsModule,
        CommonModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    templateUrl: './create-secret.component.html',
    styleUrl: './create-secret.component.scss'
})
export class CreateSecretComponent implements OnDestroy {
  expiration = DEFAULT_SECRET_EXPIRATION;
  failure: boolean = false;
  generateButtonDisabled: boolean = true;
  
  private destroy$ = new Subject<void>();

  shareSecretUri: undefined | string;

  form: FormGroup<FormGroupType<CreateSecretRequest>> = new FormGroup<FormGroupType<CreateSecretRequest>>({
    secret: new FormControl<string | null>(null),
    ttl: new FormControl<string>(DEFAULT_SECRET_EXPIRATION),
    passphrase: new FormControl<string | null>(null, Validators.minLength(3)),
  });

  constructor(
    private secretService: SecretService,
    private copyToClipboardService: CopyToClipboardService,
    private snackBarService: SnackBarService
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

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
    return SECRET_EXPIRATION_OPTIONS;
  }

  /**
   * Set the secret uri and key to service response, disable the button, and log the response
   * @returns nothing
   */
  createSecret() {
    if (!this.form.controls.secret) {
      return;
    }

    this.secretService
      .createSecret(this.generateRequestObject())
      .pipe(
        takeUntil(this.destroy$),
        tap((response: CreateSecretResponse) => {
          console.info(response);
          this.shareSecretUri = `localhost:4200/reveal?key=${response.guid}`;
        })
      ).subscribe();
  }

  generateRequestObject(): CreateSecretRequest {
    const formValue = this.form
            .value as Required<CreateSecretRequest>;

    return formValue;
  }
}
