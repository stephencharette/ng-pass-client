import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthModule } from '@auth0/auth0-angular';
import { environment } from '../environments/environment';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BaseUrlInterceptor } from './core/interceptors/base-url-interceptor';
import { AG_GRID_PROVIDER } from './core/configurations/providers/ag-grid.provider';

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
      AuthModule.forRoot({
          ...environment.auth0,
      }),
    ),
    AG_GRID_PROVIDER
  ],
};
