import { Component } from '@angular/core';
import { CreateSecretComponent } from '../../secret/create-secret/create-secret.component';
import { SecretManagementComponent } from '../../secret/secret-management/secret-management.component';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-home',
    imports: [
        CreateSecretComponent,
        SecretManagementComponent,
        CommonModule
    ],
    templateUrl: './home.component.html'
})
export class HomeComponent {
    isAuthenticated$ = this.authService.isAuthenticated$;

    constructor(private readonly authService: AuthService) {}
}
