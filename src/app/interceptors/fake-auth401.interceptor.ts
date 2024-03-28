import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient
} from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class FakeAuth401Interceptor implements HttpInterceptor {

  constructor(
    private httpClient: HttpClient
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request).pipe(catchError(err => {
          console.log({err})
          const isApiUrl = request.url.startsWith(environment.apiHost);
          if (isApiUrl && [401].includes(err.status)) {
            console.log('Signing in...')
            this.httpClient.post<{token: string}>(`${environment.apiHost}oauth/oauth2callback`, [1, 'testuser', 'Test', 'User']).subscribe();
          }

          return next.handle(request);
      }))
  }
}
