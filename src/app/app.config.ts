import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps';
//import { withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';

import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    /*
    provideHttpClient(
      withInterceptors([authInterceptor]) // ← Solo authInterceptor por ahora
    ),
    */
    provideAnimations(),
    importProvidersFrom(GoogleMapsModule)
  ]
};
