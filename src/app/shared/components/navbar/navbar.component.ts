import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginButtonComponent } from '../login-button/login-button.component';
import { LogoutButtonComponent } from '../logout-button/logout-button.component';
import { AuthService } from '@auth0/auth0-angular';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [LoginButtonComponent, LogoutButtonComponent, CommonModule],
    templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  isAuthenticated$ = this.authService.isAuthenticated$;
  isAuth0Loading$ = this.authService.isLoading$;
  user: any;
  
  constructor(private readonly authService: AuthService) {}

  public ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }
}
