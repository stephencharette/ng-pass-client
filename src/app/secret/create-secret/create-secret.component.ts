import { Component } from '@angular/core';

import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-create-secret',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './create-secret.component.html',
  styleUrl: './create-secret.component.css'
})
export class CreateSecretComponent {

}
