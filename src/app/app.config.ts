import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthModule } from '@auth0/auth0-angular';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BaseUrlInterceptor } from './core/interceptors/base-url-interceptor';

// if (environment.production) {
//   enableProdMode();
// }

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
    {
        provide: HTTP_INTERCEPTORS,
        useClass: BaseUrlInterceptor,
        multi: true,
    },
    importProvidersFrom(
      RouterModule.forRoot(routes),
      HttpClientModule,
      AuthModule.forRoot({
        ...environment.auth0,
      })
    ),
  ],
};
