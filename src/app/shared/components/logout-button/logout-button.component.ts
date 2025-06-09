import { Component, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';

import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-logout-button',
    imports: [MatButton],
    standalone: true,
    templateUrl: './logout-button.component.html',
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
