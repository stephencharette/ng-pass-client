import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Services
import { RoutingService } from '../../services/routing/routing.service';
import { RetrieveSecretService } from '../../services/retrieve-secret/retrieve-secret.service';

// MaterialUI
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

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
    private retrieveSecretService: RetrieveSecretService
  ) {}

  ngOnInit() {
    this.routingService.getQueryParam('key').subscribe((key) => {
      this.key = key;
    });
  }

  toggleRevealDisabled(toggle: boolean) {
    this.revealButtonDisabled = toggle;
  }

  retrieveSecret() {
    this.retrieveSecretService.retrieveSecret(this.key).subscribe({
      next: (secretObj) => {
        this.status = 200;
        this.secret = secretObj.key;
        this.toggleRevealDisabled(true);
      },
      error: (e) => {
        if(e.status === 404) {
          this.toggleRevealDisabled(true);
        }
        this.status = e.status;
      },
      complete: () => {},
    });
  }
}
