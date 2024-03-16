import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from '@auth0/auth0-angular';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// if (environment.production) {
//   enableProdMode();
// }

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    importProvidersFrom(
      RouterModule.forRoot(routes),
      HttpClientModule,
      AuthModule.forRoot({
        ...environment.auth0,
      })
    ),
  ],
};
