import { Routes } from '@angular/router';
import { RevealSecretComponent } from './modules/secret/reveal-secret/reveal-secret.component';
import { SimpleLayoutComponent } from './shared/layouts/simple-layout/simple-layout.component';
import { HomeComponent } from './modules/home/home/home.component';
import { RouteConstants } from './core/constants/routes';

export const routes: Routes = [
  { 
    // path: 'secrets', 
    path: RouteConstants.Secret.rootUrl, 
    component: SimpleLayoutComponent,
    children: [
      {
        // path: 'new',
        path: RouteConstants.Secret.new,
        component: HomeComponent,
        pathMatch: 'full',
      },
      {
        // path: ':id/reveal',
        path: RouteConstants.Secret.reveal,
        component: RevealSecretComponent,
        pathMatch: 'full',
      }
    ]
  },
  {
    path: '**',
    redirectTo: RouteConstants.Secret.getFullRoute('new'),
  },
];
