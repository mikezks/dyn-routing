import { provideHttpClient } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withRouterConfig } from '@angular/router';
import { provideCustomizingInitConfig, provideDiscoveryInitConfig, provideMatcherComponentReuse } from '@flight42/dyn-routes';
import { AppComponent } from './app/app.component';
import { APP_ROUTES } from './app/app.routes';


bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(APP_ROUTES,
      withRouterConfig({
        onSameUrlNavigation: 'reload'
      })
    ),
    provideDiscoveryInitConfig(),
    provideCustomizingInitConfig(),
    provideMatcherComponentReuse()
  ]
});
