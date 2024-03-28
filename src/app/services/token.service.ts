import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import jwtDecode from 'jwt-decode';
import { ITokenPayload } from '../interfaces/ITokenPayload';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  get token(): string | null {
    return localStorage.getItem('token');
  }

  private setToken(token: string) {
    localStorage.setItem("token", token);
  }

  private clearToken() {
    localStorage.removeItem("token");
  }

  logout() {
    this.httpClient.post<any>(`${environment.apiHost}logout`, {}, { withCredentials: true }).subscribe();
    this.clearToken();
    this.redirectToLogin();
  }

  signInWithOAuthCode(code: string) {
    return this.httpClient.post<{token: string}>(`${environment.apiHost}oauth/oauth2callback`, {code})
      .pipe(map(data => {
        this.setToken(data.token);
        return data;
      }));
  }

  redirectToLogin(returnUrl: string = "") {
    this.httpClient.get<{redirect_url: string}>(`${environment.apiHost}oauth/redirect_url`, {params: {returnUrl}}).subscribe((data => {
      window.location.href = data.redirect_url;
    }))
  }

  getUser(): ITokenPayload {
    const token = localStorage.getItem('token') || "";
    const decodedToken: ITokenPayload = jwtDecode(token);
    return decodedToken;
  }
}
