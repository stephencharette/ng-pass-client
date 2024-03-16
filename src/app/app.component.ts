import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AuthService } from '@auth0/auth0-angular';

import { LoginButtonComponent } from './shared/components/login-button/login-button.component';
import { LogoutButtonComponent } from './shared/components/logout-button/logout-button.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule,
    RouterLink,
    RouterLinkActive,
    LoginButtonComponent,
    LogoutButtonComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ng-pass';
  isAuthenticated$ = this.authService.isAuthenticated$;
  isAuth0Loading$ = this.authService.isLoading$;
  constructor(private authService: AuthService) {}
}
