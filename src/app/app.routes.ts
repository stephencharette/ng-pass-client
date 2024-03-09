import { Routes } from '@angular/router';

import { CreateSecretComponent } from './secret/create-secret/create-secret.component';
import { ViewSecretComponent } from './secret/view-secret/view-secret.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';

export const routes: Routes = [
  { path: '', redirectTo: '/create', pathMatch: 'full' },
  {
    path: 'create',
    title: 'NgPass - New Secret',
    component: CreateSecretComponent,
  },
  {
    path: 'view',
    title: 'NgPass - View Secret',
    component: ViewSecretComponent,
  },
  {
    path: 'sign_up',
    title: 'NgPass - Create User',
    component: SignUpComponent,
  },
];
