import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private tokenService: TokenService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.tokenService.token;

    const hasToken = !!token;
    const isApiUrl = request.url.startsWith(environment.apiHost);

    if (isApiUrl && hasToken) {
        request = request.clone({
            setHeaders: { Authorization: `Bearer ${token}` }
        });
    }

    return next.handle(request);
  }
}
