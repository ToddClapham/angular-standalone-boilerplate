import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppRoutingModule } from './app/app-routing.module';
import { AppComponent } from './app/app.component';
import { Auth401Interceptor } from './app/interceptors/auth401.interceptor';
import { TokenInterceptor } from './app/interceptors/token.interceptor';

import { environment } from './environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(AppRoutingModule, BrowserAnimationsModule),
    importProvidersFrom(HttpClientModule),
    // { provide: HTTP_INTERCEPTORS, useClass: FakeAuth401Interceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: Auth401Interceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    // fakeBackendProvider
  ]
});
