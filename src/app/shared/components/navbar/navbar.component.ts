import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { LoginButtonComponent } from '../login-button/login-button.component';
import { LogoutButtonComponent } from '../logout-button/logout-button.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [LoginButtonComponent, LogoutButtonComponent, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  isAuthenticated$ = this.authService.isAuthenticated$;
  isAuth0Loading$ = this.authService.isLoading$;
  user: any;
  
  constructor(private authService: AuthService) {}

  public ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }
}
