import { Routes } from '@angular/router';

import { CreateSecretComponent } from './modules/secret/create-secret/create-secret.component';
import { ViewSecretComponent } from './modules/secret/view-secret/view-secret.component';
import { SignUpComponent } from './modules/user/sign-up/sign-up.component';
import { SignInComponent } from './modules/user/sign-in/sign-in.component';

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
    title: 'NgPass - Sign up',
    component: SignUpComponent,
  },
  {
    path: 'sign_in',
    title: 'NgPass - Sign in',
    component: SignInComponent,
  },
];
