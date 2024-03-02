import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { CreateSecretComponent } from './secret/create-secret/create-secret.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CreateSecretComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ng-pass';
}
