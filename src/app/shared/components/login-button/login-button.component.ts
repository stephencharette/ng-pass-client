import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-login-button',
    imports: [
        MatButton
    ],
    standalone: true,
    templateUrl: './login-button.component.html',
})
export class LoginButtonComponent {
  constructor(private auth: AuthService) {}

  handleLogin(): void {
    this.auth.loginWithRedirect({
      appState: {
        target: '/',
      },
      authorizationParams: {
        prompt: 'login',
      },
    });
  }
}
