import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Services
import { CopyToClipboardService } from '../../../core/services/copy-to-clipboard/copy-to-clipboard.service';
import { RoutingService } from '../../../core/services/routing/routing.service';
import { RetrieveSecretService } from '../../../core/services/retrieve-secret/retrieve-secret.service';
import { SnackBarService } from '../../../core/services/snack-bar/snack-bar.service';

// MaterialUI
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-view-secret',
  standalone: true,
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
  ],
  templateUrl: './view-secret.component.html',
  styleUrl: './view-secret.component.css',
  providers: [RetrieveSecretService],
})
export class ViewSecretComponent {
  key: string = '';
  revealButtonDisabled: boolean = false;
  secret: string = '';
  status: undefined | number;

  constructor(
    private routingService: RoutingService,
    private retrieveSecretService: RetrieveSecretService,
    private copyToClipboardService: CopyToClipboardService,
    private snackBarService: SnackBarService
  ) {
    this.setKey();
  }

  /**
   * Set the key from the query parameter
   */
  setKey() {
    this.routingService.getQueryParam('key').subscribe((key) => {
      this.key = key;
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
   * Toggle the reveal button's disabled state
   * @param toggle - whether to disable the reveal button
   */
  toggleRevealButtonDisabled(toggle: boolean) {
    this.revealButtonDisabled = toggle;
  }

  /**
   * Retrieve the secret from the server and set the secret and status
   */
  retrieveSecret() {
    this.retrieveSecretService.retrieveSecret(this.key).subscribe({
      next: (secretObj) => {
        this.status = 200;
        this.secret = secretObj.key;
        this.toggleRevealButtonDisabled(true);
      },
      error: (e) => {
        if (e.status === 404) {
          this.toggleRevealButtonDisabled(true);
        }
        this.status = e.status;
      },
    });
  }
}
