import { Component } from '@angular/core';
import { CreateSecretComponent } from '../../secret/create-secret/create-secret.component';
import { SecretManagementComponent } from '../../secret/secret-management/secret-management.component';

@Component({
    selector: 'app-home',
    imports: [
        CreateSecretComponent,
        SecretManagementComponent
    ],
    templateUrl: './home.component.html'
})
export class HomeComponent {

}
