import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-login-button',
  standalone: true,
  imports: [
    MatButton
  ],
  templateUrl: './login-button.component.html',
  styleUrl: './login-button.component.css',
})
export class LoginButtonComponent {
  constructor(private auth: AuthService) {}

  handleLogin(): void {
    this.auth.loginWithRedirect({
      appState: {
        target: '/profile',
      },
      authorizationParams: {
        prompt: 'login',
      },
    });
  }
}
