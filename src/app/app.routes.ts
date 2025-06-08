import { Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';

import { CreateSecretComponent } from './modules/secret/create-secret/create-secret.component';
import { RevealSecretComponent } from './modules/secret/reveal-secret/reveal-secret.component';
import { ProfileComponent } from './modules/user/profile/profile.component';

export const routes: Routes = [
  { path: '', redirectTo: '/create', pathMatch: 'full' },
  {
    path: 'create',
    title: 'NgPass - New Secret',
    component: CreateSecretComponent,
  },
  {
    path: 'reveal',
    title: 'NgPass - View Secret',
    component: RevealSecretComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'create',
  },
];
