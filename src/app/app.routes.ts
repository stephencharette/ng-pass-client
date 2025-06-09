import { Routes } from '@angular/router';
import { CreateSecretComponent } from './modules/secret/create-secret/create-secret.component';
import { RevealSecretComponent } from './modules/secret/reveal-secret/reveal-secret.component';
import { SimpleLayoutComponent } from './shared/layouts/simple-layout/simple-layout.component';
import { HomeComponent } from './modules/home/home/home.component';

export const routes: Routes = [
  { 
    path: '', 
    component: SimpleLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        pathMatch: 'full',
      }
    ]
  },
  {
    path: 'reveal',
    title: 'NgPass - View Secret',
    component: RevealSecretComponent,
  },
  {
    path: '**',
    redirectTo: 'create',
  },
];
