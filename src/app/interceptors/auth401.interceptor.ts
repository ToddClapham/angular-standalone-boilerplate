import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';

@Injectable({providedIn: 'root'})
export class Auth401Interceptor implements HttpInterceptor {

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request).pipe(catchError(err => {
          console.log({err})
          const isApiUrl = request.url.startsWith(environment.apiHost);
          if (isApiUrl && [401].includes(err.status)) {
              this.tokenService.redirectToLogin(this.router.url);
          }

          const error = err.error?.message || err.statusText;
          return throwError(() => error);
      }))
  }
}
