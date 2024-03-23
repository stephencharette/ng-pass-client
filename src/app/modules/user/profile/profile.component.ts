import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from '@auth0/auth0-angular';

import { SecretsComponent } from '../secrets/secrets.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    SecretsComponent,
    CommonModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  user: any;

  constructor(private authService: AuthService) {}

  public ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }
}
