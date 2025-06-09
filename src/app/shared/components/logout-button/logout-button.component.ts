import { Component, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';

import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-logout-button',
    imports: [MatButton],
    templateUrl: './logout-button.component.html',
    styleUrl: './logout-button.component.css'
})
export class LogoutButtonComponent {
  constructor(
    private auth: AuthService,
    @Inject(DOCUMENT) private doc: Document
  ) {}

  handleLogout(): void {
    this.auth.logout({
      logoutParams: {
        returnTo: this.doc.location.origin,
      },
    });
  }
}
