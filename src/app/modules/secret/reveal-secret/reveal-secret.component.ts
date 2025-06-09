import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CopyToClipboardService } from '../../../core/services/copy-to-clipboard/copy-to-clipboard.service';
import { RoutingService } from '../../../core/services/routing/routing.service';
import { SnackBarService } from '../../../core/services/snack-bar/snack-bar.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { FormGroupType } from '../../../core/models/form-group-type';
import { SecretService } from '../shared/services/secret-service/secret.service';
import { Subject, takeUntil, tap } from 'rxjs';
import { RevealSecretRequest } from './models/reveal-secret-request';
import { RevealSecretResponse } from './models/reveal-secret-response';

@Component({
    selector: 'app-reveal-secret',
    imports: [
        FormsModule,
        MatFormField,
        MatLabel,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
        CommonModule,
        MatRippleModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    templateUrl: './reveal-secret.component.html',
    styleUrl: './reveal-secret.component.scss'
})
export class RevealSecretComponent implements OnDestroy {
  key: string = '';
  revealButtonDisabled: boolean = false;
  secret: string = '';
  status: undefined | number;

  private destroy$ = new Subject<void>();

  form: FormGroup<FormGroupType<RevealSecretRequest>> = new FormGroup<FormGroupType<RevealSecretRequest>>({
    guid: new FormControl<string | null>(null, Validators.required),
    passphrase: new FormControl<string | null>(null, Validators.minLength(3)),
  });

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  constructor(
    private routingService: RoutingService,
    private secretService: SecretService,
    private copyToClipboardService: CopyToClipboardService,
    private snackBarService: SnackBarService
  ) {
    this.setKey();
  }

  /**
   * Set the key from the query parameter
   */
  setKey(): void {
    this.routingService.getQueryParam('key').subscribe((key) => {
      this.form.controls.guid.setValue(key); 
    });
  }

  /**
   * Copy the secret to the clipboard
   */
  copySecretToClipboard() {
    if (this.secret) {
      this.copyToClipboardService.copyToClipboard(this.secret);
      this.snackBarService.openSnackBar('Secret copied to clipboard', 'Close', {
        duration: 3000,
      });
    }
  }

  /**
   * Retrieve the secret from the server
   */
  retrieveSecret() {
    const request = this.generateRequestObject();

    this.secretService.revealSecret(request).pipe(
      takeUntil(this.destroy$),
      tap((response: RevealSecretResponse) => {
        this.secret = response.password;
      })
    ).subscribe();
  }

  generateRequestObject(): RevealSecretRequest {
    return this.form.value as RevealSecretRequest;
  }
}
